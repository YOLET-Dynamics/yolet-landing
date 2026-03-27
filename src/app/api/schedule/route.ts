import { NextResponse } from "next/server";
import {
  buildSchedulePayload,
  scheduleSubmissionSchema,
} from "@/lib/schedule-schema";

type RateLimitEntry = {
  count: number;
  lastAttempt: number;
  windowStartedAt: number;
};

type RateLimitResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      retryAfter: number;
    };

const FORM_MIN_TIME_MS = 4_000;
const FORM_MAX_TIME_MS = 2 * 60 * 60 * 1_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const RATE_LIMIT_COOLDOWN_MS = 45 * 1_000;

const globalRateLimitStore = globalThis as typeof globalThis & {
  yoletScheduleRateLimit?: Map<string, RateLimitEntry>;
};

const scheduleRateLimitStore =
  globalRateLimitStore.yoletScheduleRateLimit ??
  (globalRateLimitStore.yoletScheduleRateLimit = new Map<
    string,
    RateLimitEntry
  >());

function getRequestIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function cleanupRateLimitStore(now: number): void {
  for (const [key, entry] of scheduleRateLimitStore.entries()) {
    if (now - entry.lastAttempt > RATE_LIMIT_WINDOW_MS) {
      scheduleRateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(ipAddress: string, now: number): RateLimitResult {
  cleanupRateLimitStore(now);

  const currentEntry = scheduleRateLimitStore.get(ipAddress);

  if (!currentEntry) {
    scheduleRateLimitStore.set(ipAddress, {
      count: 1,
      lastAttempt: now,
      windowStartedAt: now,
    });

    return {
      allowed: true,
    };
  }

  if (now - currentEntry.lastAttempt < RATE_LIMIT_COOLDOWN_MS) {
    return {
      allowed: false,
      retryAfter: Math.ceil(
        (RATE_LIMIT_COOLDOWN_MS - (now - currentEntry.lastAttempt)) / 1_000,
      ),
    };
  }

  if (now - currentEntry.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
    scheduleRateLimitStore.set(ipAddress, {
      count: 1,
      lastAttempt: now,
      windowStartedAt: now,
    });

    return {
      allowed: true,
    };
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil(
        (RATE_LIMIT_WINDOW_MS - (now - currentEntry.windowStartedAt)) / 1_000,
      ),
    };
  }

  scheduleRateLimitStore.set(ipAddress, {
    ...currentEntry,
    count: currentEntry.count + 1,
    lastAttempt: now,
  });

  return {
    allowed: true,
  };
}

function resolveFormEndpoint(): string {
  const configuredValue =
    process.env.FORMSPARK_FORM_ID ??
    process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID ??
    "P2vM5bH8i";

  return configuredValue.startsWith("http")
    ? configuredValue
    : `https://submit-form.com/${configuredValue}`;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  const now = Date.now();

  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      {
        error: "This request origin is not allowed.",
      },
      {
        status: 403,
      },
    );
  }

  const ipAddress = getRequestIp(request);
  const rateLimit = checkRateLimit(ipAddress, now);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Please wait a moment before sending another request.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
        },
      },
    );
  }

  const requestBody: unknown = await request.json().catch((): null => null);
  const validation = scheduleSubmissionSchema.safeParse(requestBody);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Please review the highlighted fields and try again.",
        fieldErrors: validation.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  const submission = validation.data;
  const elapsedTime = now - submission.startedAt;

  if (submission.honeypot) {
    return NextResponse.json(
      {
        error: "Unable to process this request.",
      },
      {
        status: 400,
      },
    );
  }

  if (elapsedTime < FORM_MIN_TIME_MS || elapsedTime > FORM_MAX_TIME_MS) {
    return NextResponse.json(
      {
        error: "Please refresh the page and try again.",
      },
      {
        status: 400,
      },
    );
  }

  const upstreamResponse = await fetch(resolveFormEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams(buildSchedulePayload(submission)),
    cache: "no-store",
  });

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        error:
          "Your request could not be submitted right now. Please try again in a moment.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    },
  );
}
