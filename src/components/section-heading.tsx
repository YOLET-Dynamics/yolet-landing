import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps): ReactElement {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div className={cn("section-kicker", align === "center" && "mx-auto")}>
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse-soft" />
        {eyebrow}
      </div>
      <h2 className={cn("section-title text-balance", titleClassName)}>{title}</h2>
      <p className={cn("section-copy", descriptionClassName)}>{description}</p>
    </div>
  );
}
