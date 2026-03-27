import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white ring-offset-background transition-colors placeholder:text-white/[0.35] focus-visible:border-yellow-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
