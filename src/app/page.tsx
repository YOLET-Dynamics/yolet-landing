import type { Metadata } from "next";
import type { ReactElement } from "react";
import {
  Layers3,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { CTASection } from "@/components/cta-section";
import HeroSection from "@/components/hero-section";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { SectionHeading } from "@/components/section-heading";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Premium software design and engineering",
  description:
    "YOLET Labs builds software that simplifies the complex and supports meaningful progress.",
  alternates: {
    canonical: "/",
  },
};

export default function Home(): ReactElement {
  const services = [
    {
      number: "01",
      label: "Enterprise software",
      title: "Operational systems with real clarity.",
      description:
        "We build internal platforms and core software that make day-to-day work easier to run.",
      detail: "Good for complex workflows and reporting.",
      features: [
        "Workflow automation",
        "Business intelligence dashboards",
        "Secure data foundations",
      ],
    },
    {
      number: "02",
      label: "Product builds",
      title: "Full app development",
      description:
        "From idea to launch, we design and build products that feel clean and complete.",
      detail: "Best for launches, web apps, and mobile products.",
      features: [
        "Cross-platform mobile apps",
        "Responsive web applications",
        "Scalable product architecture",
      ],
    },
    {
      number: "03",
      label: "Strategic guidance",
      title: "Strategic consulting",
      description:
        "We help teams make better product and technical decisions before they commit to a build.",
      detail: "Useful when priorities or direction are still taking shape.",
      features: [
        "Digital transformation roadmaps",
        "Technology stack assessment",
        "Product strategy support",
      ],
    },
    {
      number: "04",
      label: "Modernization",
      title: "System redesign",
      description:
        "We update legacy software and dated workflows without slowing the business down.",
      detail: "Best for modernization and cleanup work.",
      features: [
        "Legacy system migration",
        "UX and UI modernization",
        "Performance optimization",
      ],
    },
  ];

  const principles = [
    {
      title: "Designed for trust",
      description:
        "Clear interfaces, solid implementation, and security in the details.",
      icon: ShieldCheck,
    },
    {
      title: "Crafted with restraint",
      description:
        "We keep the work simple, consistent, and well finished.",
      icon: Layers3,
    },
    {
      title: "Guided by real outcomes",
      description:
        "We stay focused on what your team actually needs next.",
      icon: Lightbulb,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/logo.svg"),
      description: siteConfig.description,
      sameAs: siteConfig.social.map((item) => item.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ScrollIndicator />
      <main id="main-content" className="page-shell">
        <HeroSection />

        <section
          id="services"
          className="section-shell scroll-mt-32 pt-10 md:pt-14"
        >
          <div className="container">
            <SectionHeading
              eyebrow="Services"
              title="Software built around the work it needs to support."
              description="From new products to legacy systems, we build software that feels clear and dependable."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              {services.map((service, index) => {
                const isWide = index === 0 || index === services.length - 1;
                const isMirrored = index === services.length - 1;

                return (
                  <article
                    key={service.title}
                    className={cn(
                      "premium-surface subtle-outline group relative overflow-hidden px-6 py-6 transition-transform duration-500 hover:-translate-y-1 md:px-8 md:py-8",
                      isWide ? "lg:col-span-7" : "lg:col-span-5 lg:min-h-[24rem]",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100",
                        index % 2 === 0
                          ? "bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.08),transparent_42%)]"
                          : "bg-[radial-gradient(circle_at_bottom_left,rgba(245,184,0,0.08),transparent_40%)]",
                      )}
                    />

                    <div
                      className={cn(
                        "relative flex h-full flex-col gap-8",
                        isWide &&
                        "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.78fr)] lg:gap-10",
                        isMirrored &&
                        "lg:grid-cols-[minmax(250px,0.78fr)_minmax(0,1fr)]",
                      )}
                    >
                      <div className={cn("space-y-5", isMirrored && "lg:order-2")}>
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 min-w-8 items-center justify-center rounded-[0.8rem] border border-white/10 bg-white/[0.04] px-2 text-[0.72rem] font-medium tracking-[0.08em] text-white/[0.68]">
                            {service.number}
                          </span>
                          <p className="text-[0.8rem] tracking-[0.08em] text-white/[0.36]">
                            {service.label}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="max-w-xl text-[1.7rem] font-medium leading-tight text-white md:text-[2rem]">
                            {service.title}
                          </h3>
                          <p className="max-w-2xl text-[0.98rem] leading-7 text-white/[0.58]">
                            {service.description}
                          </p>
                        </div>

                        <p className="inline-flex items-center gap-2 text-[0.9rem] text-white/[0.46]">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                          {service.detail}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "space-y-3",
                          isMirrored && "lg:order-1",
                          !isWide && "mt-auto",
                        )}
                      >
                        <ul
                          className={cn(
                            "grid gap-2",
                            isWide ? "sm:grid-cols-2 lg:grid-cols-1" : "sm:grid-cols-2",
                          )}
                        >
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="rounded-[0.95rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.9rem] text-white/[0.7] transition-colors duration-300 group-hover:border-white/[0.14]"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell pt-4">
          <div className="container">
            <div className="premium-surface subtle-outline overflow-hidden px-6 py-8 md:px-8 md:py-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="max-w-sm space-y-3">
                  <p className="section-kicker">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    How we work
                  </p>
                  <h2 className="text-3xl font-medium text-white md:text-4xl">
                    Clear strategy, design, and delivery.
                  </h2>
                </div>

                <div className="grid flex-1 gap-5 md:grid-cols-3">
                  {principles.map((principle) => {
                    const Icon = principle.icon;

                    return (
                      <article
                        key={principle.title}
                        className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-5"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/[0.05] text-yellow-500">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-lg font-medium text-white">
                          {principle.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-white/[0.58]">
                          {principle.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          eyebrow="Ready when you are"
          title="Tell us what you need."
          description="We build software around real people, real work, and meaningful progress."
          primaryHref="/schedule"
          primaryButtonText="Schedule a call"
          secondaryHref="/about"
          secondaryButtonText="Learn about YOLET"
        />
      </main>
    </>
  );
}
