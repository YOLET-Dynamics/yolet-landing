import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CTASection } from "@/components/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about YOLET’s mission, vision, and the way it builds software with people in mind.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage(): ReactElement {
  const values = [
    {
      title: "User-Centric Empathy",
      description:
        "We put ourselves in our users' shoes, understanding their needs, challenges, and aspirations to create solutions that truly resonate and make a difference in their lives.",
    },
    {
      title: "Precision",
      description:
        "We believe in attention to detail and technical excellence, ensuring our solutions are reliable, efficient, and deliver exactly what our users need.",
    },
    {
      title: "Ethical Integrity",
      description:
        "We maintain the highest standards of ethical conduct in all our operations, ensuring transparency, privacy, and responsible innovation.",
    },
    {
      title: "Simplicity in Design",
      description:
        "We believe in the power of simplicity, creating clean, intuitive interfaces that make complex tasks feel effortless.",
    },
    {
      title: "Collaborative Innovation",
      description:
        "We foster partnerships and collaboration, believing that the best solutions emerge when we work together with our clients and communities.",
    },
  ];

  return (
    <main id="main-content" className="page-shell">
      <section className="section-shell pt-12">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="About YOLET"
            title="Technology built with people, not just for them."
            description="We build software that simplifies the complex, elevates the everyday, and supports meaningful progress."
          />
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-5 lg:grid-cols-2">
          <article className="premium-surface subtle-outline p-6 md:p-8">
            <p className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              What drives us
            </p>
            <h2 className="mt-5 text-3xl font-medium text-white md:text-4xl">
              Mission
            </h2>
            <p className="mt-5 text-base leading-8 text-white/60">
              We turn complex challenges into simple, intuitive software that works for people. With a focus on precision and empathy, we create tools that make everyday tasks easier, empower businesses to grow, and help communities thrive. Our goal is to deliver solutions that are functional, elegant, and grounded in the real needs of the people who use them.
            </p>
          </article>

          <article className="premium-surface subtle-outline p-6 md:p-8">
            <p className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              Where we're headed
            </p>
            <h2 className="mt-5 text-3xl font-medium text-white md:text-4xl">
              Vision
            </h2>
            <p className="mt-5 text-base leading-8 text-white/60">
              To empower communities and businesses across Ethiopia, Africa, and beyond with software that simplifies the complex, elevates the everyday, and sparks meaningful progress. We envision technology built with people, not just for them, where intuitive design and thoughtful innovation help people focus on what matters most.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="container">
          <SectionHeading
            eyebrow="Principles"
            title="The standards we bring to the work."
            description="Simple principles that guide how we design and build."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {values.map((value) => {
              return (
                <article
                  key={value.title}
                  className="premium-surface subtle-outline h-full p-6 md:p-8"
                >
                  <h3 className="text-[1.85rem] font-medium text-yellow-500">
                    {value.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-white/[0.68]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Need product and engineering help?"
        description="Let’s talk."
        primaryHref="/schedule"
        primaryButtonText="Schedule a call"
      />
    </main>
  );
}
