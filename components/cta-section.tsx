"use client";

import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonAction: () => void;
  secondaryButtonAction?: () => void;
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
}: CTASectionProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8 text-center md:p-12">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-gray-400">{description}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          className="w-full bg-yellow-500 text-black transition-all duration-300 hover:bg-yellow-600 sm:w-auto"
          onClick={primaryButtonAction}
        >
          {primaryButtonText}
        </Button>
        {secondaryButtonText && secondaryButtonAction && (
          <Button
            variant="outline"
            className="w-full border-gray-400 text-white hover:text-gray-400 bg-black hover:bg-gray-900 sm:w-auto"
            onClick={secondaryButtonAction}
          >
            {secondaryButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
