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
import Link from "next/link";
import router from "next/router";
import { motion } from "framer-motion";

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

  const words = [
    { text: "Create.", className: "text-yellow-500" },
    { text: "Design.", className: "" },
    { text: "Innovate.", className: "text-yellow-500" },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Seo />
      <Navigation />

      <main className="flex-1 pt-16">
        <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl px-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl lg:text-7xl">
                <span className="inline-block animate-fade text-yellow-500">
                  Create.{" "}
                </span>
                <span className="inline-block animate-fade-delay-1">
                  Design.{" "}
                </span>
                <span className="inline-block animate-fade-delay-2 text-yellow-500">
                  Innovate.{" "}
                </span>
              </h1>
            </div>
            <div className="animate-fade">
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
                We transform intricate business challenges into intuitive,
                user-centric software solutions that deliver measurable impact.
              </p>
            </div>
            <div className="animate-fade">
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/schedule">
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="w-full border-gray-400 text-white hover:text-gray-400 bg-black hover:bg-gray-900 sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-black py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-fade">
                <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                  To empower communities and businesses across Ethiopia, Africa,
                  and beyond with software that simplifies the complex, elevates
                  the everyday, and sparks meaningful progress. We envision
                  technology built <span className="text-yellow-500">with</span>{" "}
                  people, not just <span className="text-yellow-500">for</span>{" "}
                  them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="w-full bg-black py-20 md:py-28 scroll-mt-12"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-fade">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Our Services
                </h2>
                <p className="mt-4 text-gray-400">
                  We specialize in creating user-centric software solutions that
                  transform complex business challenges.
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

        {/* Work Section */}
        {/* <section id="work" className="w-full bg-black py-20 md:py-28 scroll-mt-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Our Work
                </h2>
                <p className="mt-4 text-gray-400">
                  Explore our latest projects and see how we've helped
                  businesses transform their digital presence.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((project, index) => (
                <div
                  key={index}
                  className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    image={project.image}
                  />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                <button
                  className="border border-white/20 text-white hover:bg-white/10 px-6 py-2 rounded-md font-medium"
                  onClick={() => setShowAllProjects(true)}
                >
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testimonials */}
        {/* <section className="w-full bg-black py-20 md:py-28 scroll-mt-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Trusted By
                </h2>
                <p className="mt-4 text-gray-400">
                  Leading organizations rely on our expertise to solve their
                  most complex challenges.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={item}
                  className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex aspect-[3/2] items-center justify-center rounded-lg border border-white/10 bg-gray-900/30 p-6">
                    <div className="h-12 w-24 rounded bg-gray-800"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                <Testimonial
                  quote="YOLET Labs delivered a solution that transformed our business operations, exceeding our expectations in every way."
                  author="Sarah Johnson"
                  position="CEO, TechCorp"
                />
              </div>
            </div>
          </div>
        </section> */}

        <section className="w-full bg-black py-20 md:py-28 scroll-mt-12">
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
  );
}
