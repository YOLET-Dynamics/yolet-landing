import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScheduleForm } from "@/components/schedule-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Schedule a call",
  description:
    "Share the basics and we’ll get back to you.",
  alternates: {
    canonical: "/schedule",
  },
};

export default function SchedulePage(): ReactElement {
  const commitments = [
    {
      step: "01",
      title: "A clear first call",
      description:
        "We’ll reply with the next step, not a generic pitch.",
    },
    {
      step: "02",
      title: "Private by default",
      description:
        "Your details stay protected and only go to our team.",
    },
    {
      step: "03",
      title: "Fast follow-up",
      description:
        "We’ll align on scope, timing, and next steps.",
    },
  ];

  return (
    <main id="main-content" className="page-shell">
      <section className="section-shell pt-12">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-14">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Schedule a call"
              title="Tell us what you need."
              description="Share the basics and we’ll get back to you."
            />

            <div className="premium-surface subtle-outline overflow-hidden p-6 md:p-8">
              <div className="flex items-center gap-3 text-sm text-white/[0.52]">
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/[0.05] text-yellow-500">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                What happens next
              </div>

              <div className="mt-6 space-y-4">
                {commitments.map((item) => {
                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 min-w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/[0.04] text-[0.72rem] font-medium tracking-[0.08em] text-white/[0.68]">
                          {item.step}
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-base font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-6 text-white/[0.56]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <ScheduleForm />
        </div>
      </section>
    </main>
  );
}
