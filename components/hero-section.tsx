import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden mt-12 lg:mt-0">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen items-center py-20">
          <div className="flex flex-col max-w-3xl">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm text-gray-300">
                <span className="flex h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                Building Legacies
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
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

              <p className="text-xl text-gray-300 mt-6 max-w-2xl">
                We transform intricate business challenges into intuitive,
                user-centric software solutions that deliver measurable impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/schedule">
                <Button
                  size="lg"
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-white hover:text-gray-300 bg-transparent hover:bg-gray-900/50"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* <div className="mt-16">
              <p className="text-sm text-gray-500 mb-4">
                Trusted by Industry Leaders
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <div className="h-8 w-24 bg-gray-800/50 rounded"></div>
                <div className="h-8 w-20 bg-gray-800/50 rounded"></div>
                <div className="h-8 w-28 bg-gray-800/50 rounded"></div>
                <div className="h-8 w-24 bg-gray-800/50 rounded"></div>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col space-y-8 lg:pl-10">
            <div className="relative p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="absolute -top-3 -left-3 bg-yellow-500/20 w-16 h-16 rounded-full blur-xl"></div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" /> Why we're
                different
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To empower communities and businesses across Ethiopia, Africa,
                and beyond with software that simplifies the complex, elevates
                the everyday, and sparks meaningful progress. We envision
                technology built <span className="text-yellow-500">with</span>{" "}
                people, not just <span className="text-yellow-500">for</span>{" "}
                them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                <Code className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Custom Development</h3>
                <p className="text-gray-400">
                  Tailored solutions designed for your specific business needs
                </p>
              </div>

              <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                <Layers className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Scalable Architecture
                </h3>
                <p className="text-gray-400">
                  Build systems that grow with your business
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
