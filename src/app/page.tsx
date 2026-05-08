import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CTASection } from "@/components/cta-section";
import HeroSection from "@/components/hero-section";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software, built to last",
  description:
    "YOLET designs, builds, and modernizes software — from internal platforms to client-facing products.",
  alternates: {
    canonical: "/",
  },
};

type Service = {
  title: string;
  summary: string;
  deliverables: readonly string[];
};

const services: readonly Service[] = [
  {
    title: "Enterprise platforms",
    summary:
      "Internal systems that run operations — workflows, dashboards, reporting, integrations. For teams that have outgrown spreadsheets and off-the-shelf tools.",
    deliverables: [
      "Workflow and process automation",
      "Reporting and business intelligence",
      "Secure data foundations and integrations",
    ],
  },
  {
    title: "Product design and engineering",
    summary:
      "Web and mobile products from idea to launch — design, engineering, and the architecture to grow into.",
    deliverables: [
      "Cross-platform mobile applications",
      "Responsive web applications",
      "Scalable product architecture",
    ],
  },
  {
    title: "Modernization",
    summary:
      "Replace or rebuild legacy systems without taking the business offline. Migration, redesign, and performance work for software that has aged out of its job.",
    deliverables: [
      "Legacy system migration",
      "Interface and experience redesign",
      "Performance and reliability work",
    ],
  },
  {
    title: "Strategic consulting",
    summary:
      "Product and technical guidance before you commit to a build — scoping, stack choices, roadmaps.",
    deliverables: [
      "Product strategy and scoping",
      "Technology and architecture review",
      "Digital transformation roadmaps",
    ],
  },
];

export default function Home(): ReactElement {
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
      <main id="main-content" className="page-shell">
        <HeroSection />

        <section className="border-t border-white/10 py-24 md:py-32">
          <div className="container">
            <p className="section-eyebrow">What we do</p>
            <p className="mt-6 max-w-3xl text-balance text-2xl leading-[1.4] text-white/85 md:text-[1.75rem] md:leading-[1.4]">
              We partner with organizations to design and build the software their teams rely on — operational systems, products, and the work that ties them together.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-24 border-t border-white/10 py-24 md:py-32"
        >
          <div className="container">
            <p className="section-eyebrow">Services</p>
            <h2 className="mt-6 display-2 max-w-3xl text-balance">
              What we build.
            </h2>

            <div className="mt-16">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={
                    index === 0
                      ? "py-10 md:py-14"
                      : "border-t border-white/10 py-10 md:py-14"
                  }
                >
                  <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-16">
                    <div>
                      <h3 className="display-3 text-balance">{service.title}</h3>
                      <p className="body-base mt-5 max-w-xl">{service.summary}</p>
                    </div>
                    <ul className="space-y-3 md:pt-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-6 text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Have a project in mind?"
          description="Tell us about it. We'll reply with the next step."
          primaryHref="/schedule"
          primaryButtonText="Schedule a call"
        />
      </main>
    </>
  );
}
