import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceProps = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  features: string[];
  icon: LucideIcon;
  className?: string;
}

export function ServiceCard({
  eyebrow,
  title,
  description,
  detail,
  features,
  icon: Icon,
  className,
}: ServiceProps): ReactElement {
  return (
    <article
      className={cn(
        "group premium-surface subtle-outline relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.08),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <p className="text-[0.78rem] font-medium tracking-[0.08em] text-white/[0.42]">
              {eyebrow}
            </p>
            <h3 className="text-2xl font-medium text-white md:text-[2rem]">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-yellow-500">
              <Icon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/[0.26] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/[0.54]" />
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-white/60 md:text-base">
          {description}
        </p>

        <p className="mt-7 inline-flex items-center gap-2 text-sm text-white/[0.48]">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          {detail}
        </p>

        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-[1.15rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/[0.72]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
