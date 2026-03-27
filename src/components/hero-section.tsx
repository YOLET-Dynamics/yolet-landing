import Link from "next/link";
import type { ReactElement } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  LayoutDashboard,
  Layers3,
  Users2,
} from "lucide-react";

const focusAreas = [
  {
    title: "Enterprise systems",
    description: "Internal software that keeps work clear and moving.",
    icon: LayoutDashboard,
  },
  {
    title: "Product design and build",
    description: "Well-made digital products people can use with ease.",
    icon: Layers3,
  },
  {
    title: "Built with people",
    description: "Software shaped around real people, not just technical requirements.",
    icon: Users2,
  },
];

export default function HeroSection(): ReactElement {
  return (
    <section className="flex min-h-[calc(100svh-7.5rem)] items-center py-8 md:min-h-[calc(100svh-8.5rem)] md:py-10">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-7">
            <div className="section-kicker animate-reveal">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse-soft" />
              {siteConfig.tagline}
            </div>

            <div className="space-y-5">
              <h1 className="animate-reveal max-w-5xl text-[2.9rem] font-medium leading-[0.93] tracking-[-0.06em] text-white md:text-[4rem] lg:text-[4.8rem]">
                Software that stays clear and built to last.
              </h1>
              <p className="animate-reveal-delay-1 max-w-xl text-[1.02rem] leading-7 text-white/[0.58] md:text-[1.08rem]">
                We turn complex challenges into simple, intuitive software built with people, not just for them.
              </p>
            </div>

            <div className="animate-reveal-delay-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/schedule">
                  Schedule a call
                  <ArrowUpRight className="text-yellow-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#services">Explore services</Link>
              </Button>
            </div>

          </div>

          <div className="animate-reveal-delay-1 relative lg:pl-6">
            <div className="absolute inset-10 rounded-full bg-yellow-500/10 blur-[110px]" />
            <div className="premium-surface subtle-outline relative overflow-hidden rounded-[1.6rem] p-5 md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.12),transparent_36%)]" />
              <div className="absolute -right-10 top-10 h-28 w-28 rounded-full border border-white/10 bg-white/[0.04] blur-2xl animate-float-slow" />
              <div className="relative space-y-5">

                <div className="rounded-[1rem] border border-white/10 bg-black/30 p-4 md:p-5">
                  <p className="text-[1.65rem] leading-[1.15] text-white md:text-[1.9rem]">
                    Software that simplifies the complex, elevates the everyday, and supports meaningful progress.
                  </p>
                </div>

                <div className="grid gap-3">
                  {focusAreas.map((area) => {
                    const Icon = area.icon;

                    return (
                      <div
                        key={area.title}
                        className="grid grid-cols-[42px_1fr] items-start gap-3 rounded-[1rem] border border-white/10 bg-white/[0.03] px-3.5 py-3.5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.05] text-yellow-500">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-[0.98rem] font-medium text-white">
                            {area.title}
                          </h3>
                          <p className="text-[0.88rem] leading-6 text-white/[0.5]">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
