"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { CTASection } from "@/components/cta-section";
import { Seo } from "@/components/seo";
import HeroSection from "@/components/hero-section";
import { ScrollIndicator } from "@/components/scroll-indicator";

export default function Home() {
  const router = useRouter();
  const [activeDialog, setActiveDialog] = useState<number | null>(null);

  const services = [
    {
      title: "Enterprise Software",
      description: "Simplifying complex business operations.",
      features: [
        "Custom Workflow Automation",
        "Business Intelligence Dashboards",
        "Secure Data Management",
      ],
      details:
        "We create intuitive enterprise solutions that streamline operations and improve efficiency, with a focus on security and scalability.",
    },
    {
      title: "Full App Development",
      description: "End-to-end web and mobile applications.",
      features: [
        "Cross-platform Mobile Apps",
        "Progressive Web Applications",
        "Cloud-native Architecture",
      ],
      details:
        "From concept to deployment, we build seamless applications that work flawlessly across all devices with performance and reliability at their core.",
    },
    {
      title: "System Redesign",
      description: "Modernizing existing digital infrastructure.",
      features: [
        "Legacy System Migration",
        "UX/UI Modernization",
        "Performance Optimization",
      ],
      details:
        "We transform outdated systems into modern solutions that enhance performance and user experience with minimal disruption to your operations.",
    },
    {
      title: "Strategic Consulting",
      description: "Expert guidance for technology decisions.",
      features: [
        "Digital Transformation",
        "Technology Stack Assessment",
        "Product Development Strategy",
      ],
      details:
        "Our consultants provide expert guidance to navigate complex technology landscapes and develop strategic roadmaps for sustainable growth.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white relative">
      <ScrollIndicator />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <Seo />

        <main className="flex-1">
          <HeroSection />

          <section id="services" className="w-full py-20 md:py-28 scroll-mt-12">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <div className="animate-fade">
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Our Services
                  </h2>
                  <p className="mt-4 text-gray-400">
                    We specialize in creating user-centric software solutions
                    that transform complex business challenges.
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-16 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="animate-fade"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      features={service.features}
                      onLearnMore={() => setActiveDialog(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CTASection
            title="Ready to get started?"
            description="Let's discuss how we can help you achieve your business goals with custom software solutions."
            primaryButtonText="Schedule a Call"
            primaryButtonAction={() => router.push("/schedule")}
          />
        </main>

        <Dialog
          open={activeDialog !== null}
          onOpenChange={() => setActiveDialog(null)}
        >
          <DialogContent className="sm:max-w-[625px] bg-gray-950 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {activeDialog !== null && services[activeDialog].title}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-400">
                {activeDialog !== null && services[activeDialog].details}
              </p>
              <ul className="mt-6 space-y-4">
                {activeDialog !== null &&
                  services[activeDialog].features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-yellow-500" />
                      </div>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
