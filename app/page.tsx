"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ServiceCard } from "@/components/service-card";
import { ProjectCard } from "@/components/project-card";
import { Testimonial } from "@/components/testimonial";
import { CTASection } from "@/components/cta-section";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";
import router from "next/router";
import HeroSection from "@/components/hero-section";
import { ScrollIndicator } from "@/components/scroll-indicator";

export default function Home() {
  const [activeDialog, setActiveDialog] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

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

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "A modern e-commerce solution with seamless payment integration and inventory management.",
    },
    {
      title: "Healthcare Management System",
      category: "Enterprise Software",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Comprehensive patient management system with secure data handling and analytics.",
    },
    {
      title: "Financial Analytics Dashboard",
      category: "Data Visualization",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Real-time financial data visualization with predictive analytics capabilities.",
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Application",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Secure and intuitive mobile banking solution with biometric authentication.",
    },
    {
      title: "Supply Chain Management",
      category: "Enterprise Software",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "End-to-end supply chain visibility with real-time tracking and analytics.",
    },
    {
      title: "Smart City Infrastructure",
      category: "IoT Solution",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Connected infrastructure management with environmental monitoring and optimization.",
    },
    {
      title: "Educational Platform",
      category: "Web Application",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Interactive learning environment with progress tracking and personalized content.",
    },
    {
      title: "Retail Analytics System",
      category: "Data Platform",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Customer behavior analysis and inventory optimization for retail businesses.",
    },
    {
      title: "Logistics Management",
      category: "Enterprise Software",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Route optimization and delivery tracking for logistics companies.",
    },
    {
      title: "Telehealth Platform",
      category: "Healthcare Solution",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Secure video consultations and patient record management for healthcare providers.",
    },
    {
      title: "Agricultural Monitoring",
      category: "IoT Solution",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Sensor-based crop monitoring and automated irrigation management system.",
    },
    {
      title: "Corporate Intranet",
      category: "Internal Tool",
      image: "/placeholder.svg?height=600&width=600",
      description:
        "Centralized knowledge management and collaboration platform for enterprises.",
    },
  ];

  useEffect(() => {
    if (showAllProjects) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showAllProjects]);

  if (showAllProjects) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Seo
          title="Our Projects"
          description="Explore our complete portfolio of work across various industries and technologies."
        />
        <Navigation />

        <main className="flex-1 pt-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <button
                onClick={() => setShowAllProjects(false)}
                className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white mb-8"
              >
                <span className="mr-2 h-4 w-4 rotate-180">←</span>
                Back to Home
              </button>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Projects
              </h1>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Explore our complete portfolio of work across various industries
                and technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  description={project.description}
                  showDescription={true}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
        <Navigation />

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

          <section className="w-full py-20 md:py-28 scroll-mt-12">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="animate-fade">
                  <CTASection
                    title="Ready to get started?"
                    description="Let's discuss how we can help you achieve your business goals with custom software solutions."
                    primaryButtonText="Schedule a Call"
                    primaryButtonAction={() => router.push("/schedule")}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {services.map((service, index) => (
          <Dialog
            key={index}
            open={activeDialog === index}
            onOpenChange={() => setActiveDialog(null)}
          >
            <DialogContent className="max-w-[95vw] sm:max-w-[500px] md:max-w-[550px] p-4 sm:p-6 border-white/10 bg-black text-white">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl sm:text-2xl text-yellow-500">
                  {service.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-3 space-y-4">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {service.details}
                </p>

                <div className="pt-2">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm sm:text-base"
                      >
                        <Check className="mr-2 h-4 w-4 text-yellow-500 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    className="bg-yellow-500 text-black hover:bg-yellow-600"
                    onClick={() => {
                      setActiveDialog(null);
                      router.push("/schedule");
                    }}
                  >
                    Request Service
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
