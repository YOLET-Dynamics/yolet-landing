import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
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
        "space-y-6",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="section-eyebrow">{eyebrow}</p>
      ) : null}
      <h2 className={cn("display-2 text-balance", titleClassName)}>{title}</h2>
      {description ? (
        <p className={cn("body-lead max-w-2xl", align === "center" && "mx-auto", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
