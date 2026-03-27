import { z } from "zod";

const ETHIOPIAN_PHONE_REGEX = /^(?:\+251[79]\d{8}|0[79]\d{8})$/;
const NAME_REGEX = /^[\p{L}][\p{L}' -]{1,31}$/u;

export const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Other",
] as const;

export const COMPANY_SIZE_OPTIONS = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501+ employees",
] as const;

export const SERVICE_OPTIONS = [
  "Enterprise Software",
  "Full App Development",
  "System Redesign",
  "Strategic Consulting",
] as const;

function cleanText(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
}

function textField(min: number, max: number, label: string) {
  return z
    .string()
    .transform(cleanText)
    .refine(
      (value: string): boolean => value.length >= min && value.length <= max,
      `${label} must be between ${min} and ${max} characters.`,
    )
    .refine(
      (value: string): boolean => !/[<>]/.test(value),
      `${label} cannot include angle brackets.`,
    );
}

const requiredEnumMessage = (label: string): { required_error: string } => ({
  required_error: `Please select ${label}.`,
});

export const scheduleSubmissionSchema = z.object({
  firstName: textField(2, 32, "First name").refine(
    (value: string): boolean => NAME_REGEX.test(value),
    "First name can include letters, spaces, apostrophes, and hyphens only.",
  ),
  lastName: textField(2, 32, "Last name").refine(
    (value: string): boolean => NAME_REGEX.test(value),
    "Last name can include letters, spaces, apostrophes, and hyphens only.",
  ),
  email: z
    .string()
    .transform(cleanText)
    .refine((value: string): boolean => value.length > 0, "Email is required.")
    .refine((value: string): boolean => value.length <= 320, "Email is too long.")
    .refine(
      (value: string): boolean => z.string().email().safeParse(value).success,
      "Please enter a valid email address.",
    ),
  phone: z
    .string()
    .transform(cleanText)
    .refine((value: string): boolean => ETHIOPIAN_PHONE_REGEX.test(value), {
      message:
        "Enter a valid Ethiopian number in the format +2519XXXXXXXX, +2517XXXXXXXX, 09XXXXXXXX, or 07XXXXXXXX.",
    }),
  company: textField(2, 80, "Company name"),
  industry: z.enum(INDUSTRY_OPTIONS, requiredEnumMessage("an industry")),
  companySize: z.enum(
    COMPANY_SIZE_OPTIONS,
    requiredEnumMessage("a company size"),
  ),
  location: textField(2, 120, "Location"),
  services: z.enum(SERVICE_OPTIONS, requiredEnumMessage("a service")),
  projectDescription: textField(20, 500, "Project description"),
  honeypot: z.string().optional().default(""),
  startedAt: z.coerce
    .number()
    .int()
    .positive("Unable to verify when the form was opened."),
});

export type ScheduleSubmission = z.infer<typeof scheduleSubmissionSchema>;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildSchedulePayload(
  submission: ScheduleSubmission,
): Record<string, string> {
  return {
    firstName: escapeHtml(submission.firstName),
    lastName: escapeHtml(submission.lastName),
    email: submission.email,
    phone: escapeHtml(submission.phone),
    company: escapeHtml(submission.company),
    industry: escapeHtml(submission.industry),
    companySize: escapeHtml(submission.companySize),
    location: escapeHtml(submission.location),
    services: escapeHtml(submission.services),
    projectDescription: escapeHtml(submission.projectDescription),
  };
}
