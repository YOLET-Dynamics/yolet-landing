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
    <div className="max-w-6xl mx-auto relative overflow-hidden rounded-xl border border-gray-800 p-8 text-center md:p-12 mb-8">
      <div className="absolute inset-0 bg-gray-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_40%)]"></div>
      <div className="relative">
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
    </div>
  );
}
