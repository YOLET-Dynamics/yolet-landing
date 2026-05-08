import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "A software studio in Addis Ababa, designing and building software for teams across Ethiopia, Africa, and beyond.",
  alternates: {
    canonical: "/about",
  },
};

type Principle = {
  title: string;
  description: string;
};

const principles: readonly Principle[] = [
  {
    title: "Attention to detail",
    description: "Quality comes from care, not luck.",
  },
  {
    title: "Empathy",
    description: "We build for the people using the software, not just the ones paying for it.",
  },
  {
    title: "Honesty",
    description: "We tell clients what we actually think — even when it's the harder answer.",
  },
];

export default function AboutPage(): ReactElement {
  return (
    <main id="main-content" className="page-shell">
      <section className="py-20 md:py-28">
        <div className="container">
          <p className="section-eyebrow">About</p>
          <h1 className="mt-6 display-1 max-w-3xl text-balance">
            A software studio in Addis Ababa.
          </h1>
          <p className="body-lead mt-10 max-w-2xl">
            We design, build, and modernize software for organizations across Ethiopia, Africa, and beyond — internal platforms, client-facing products, and the work that holds it all together.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-28">
        <div className="container">
          <p className="section-eyebrow">Principles</p>
          <h2 className="mt-6 display-2 max-w-3xl text-balance">
            How we work.
          </h2>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((principle) => (
              <div key={principle.title}>
                <h3 className="text-lg font-medium text-white">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Work with us."
        primaryHref="/schedule"
        primaryButtonText="Schedule a call"
      />
    </main>
  );
}
