import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ScheduleForm } from "@/components/schedule-form";

export const metadata: Metadata = {
  title: "Schedule a call",
  description:
    "Share the basics and we'll get back to you with the next step.",
  alternates: {
    canonical: "/schedule",
  },
};

export default function SchedulePage(): ReactElement {
  return (
    <main id="main-content" className="page-shell">
      <section className="py-16 md:py-24">
        <div className="container">
          <p className="section-eyebrow">Schedule a call</p>
          <h1 className="mt-6 display-2 max-w-2xl text-balance">
            Tell us what you need.
          </h1>
          <p className="body-lead mt-6 max-w-2xl">
            Share the basics. We'll reply with the next step, not a generic pitch.
          </p>

          <div className="mt-12 max-w-2xl">
            <ScheduleForm />
          </div>
        </div>
      </section>
    </main>
  );
}
