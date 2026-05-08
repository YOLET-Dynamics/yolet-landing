import Link from "next/link";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection(): ReactElement {
  return (
    <section className="relative flex min-h-[calc(100svh-9rem)] items-center overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 aspect-square translate-x-[18%] opacity-60 sm:translate-x-[10%] md:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pcb-trace.svg"
          alt=""
          width={720}
          height={720}
          className="h-full w-full"
        />
      </div>

      <div className="container relative">
        <h1 className="display-1 max-w-3xl text-balance">
          Software, designed for the work it has to do.
        </h1>
        <p className="body-lead mt-8 max-w-xl text-balance">
          We design, build, and modernize software — from internal platforms to client-facing products.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/schedule">Schedule a call</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
