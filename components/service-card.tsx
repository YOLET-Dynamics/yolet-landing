"use client"

import { Check, ArrowRight } from "lucide-react"

interface ServiceProps {
  title: string
  description: string
  features: string[]
  onLearnMore: () => void
}

export function ServiceCard({ title, description, features, onLearnMore }: ServiceProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/20 md:p-8">
      <h3 className="text-xl font-medium md:text-2xl">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>

      <div className="mt-6 space-y-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start">
            <Check className="mr-3 h-5 w-5 text-green-500" />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={onLearnMore}
          className="group inline-flex items-center text-sm font-medium text-yellow-500 transition-colors hover:text-yellow-400"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

