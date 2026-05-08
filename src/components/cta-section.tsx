import type { ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  title: string;
  description?: string;
  primaryHref: string;
  primaryButtonText: string;
};

export function CTASection({
  title,
  description,
  primaryHref,
  primaryButtonText,
}: CTASectionProps): ReactElement {
  return (
    <section className="border-t border-white/10 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-2 text-balance">{title}</h2>
          {description ? (
            <p className="body-lead mx-auto mt-6 max-w-xl">{description}</p>
          ) : null}
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg">
              <Link href={primaryHref}>{primaryButtonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
