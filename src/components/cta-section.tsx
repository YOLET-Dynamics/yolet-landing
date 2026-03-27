import type { ReactElement } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryButtonText: string;
  secondaryHref?: string;
  secondaryButtonText?: string;
};

export function CTASection({
  eyebrow = "Get in touch",
  title,
  description,
  primaryHref,
  primaryButtonText,
  secondaryHref,
  secondaryButtonText,
}: CTASectionProps): ReactElement {
  return (
    <section className="section-shell pt-6">
      <div className="container">
        <div className="premium-surface subtle-outline relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.1),transparent_38%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="section-kicker">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse-soft" />
                {eyebrow}
              </div>
              <h2 className="section-title text-3xl md:text-5xl">{title}</h2>
              <p className="section-copy">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primaryHref}>
                  {primaryButtonText}
                  <ArrowUpRight className="text-yellow-600" />
                </Link>
              </Button>
              {secondaryButtonText && secondaryHref ? (
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryHref}>{secondaryButtonText}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
