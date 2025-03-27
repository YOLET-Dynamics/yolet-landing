"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";
import { Seo } from "@/components/seo";
import router from "next/router";

export default function AboutPage() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <Seo
          title="About Us"
          description="Learn about YOLET Labs, our mission, vision, and values. We're transforming how businesses and communities interact with technology."
        />
        <Navigation />

        <main className="flex-1 pt-16">
          <section className="relative w-full overflow-hidden py-24 md:py-32">
            <div className="container relative z-10 px-4 md:px-6">
              <div className="mx-auto max-w-3xl px-2 text-center">
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 -translate-y-8">
                  <h1 className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl md:text-6xl">
                    About <span className="text-yellow-500">Us</span>
                  </h1>
                </div>
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in delay-300 [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 -translate-y-8">
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
                    We're on a mission to transform how businesses and
                    communities interact with technology.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                  <div className="rounded-xl border border-white/10 bg-gray-900/30 p-8 md:p-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-6">
                      Our Mission
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      We turn complex challenges into simple, intuitive software
                      that works for people. With a focus on precision and
                      empathy, we create tools that make everyday tasks easier,
                      empower businesses to grow, and help communities thrive.
                      Our goal is to deliver solutions that are not only
                      functional and elegant but also deeply rooted in
                      understanding the real needs of the people who use them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                  <div className="rounded-xl border border-white/10 bg-gray-900/30 p-8 md:p-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-6">
                      Our Vision
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      To empower communities and businesses across Ethiopia,
                      Africa, and beyond with software that simplifies the
                      complex, elevates the everyday, and sparks meaningful
                      progress. We envision technology built with people, not
                      just for them—where intuitive design and thoughtful
                      innovation enable individuals to focus on what truly
                      matters: growing their dreams, solving local challenges,
                      and connecting in a digital world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-10 text-center">
                    Our Values
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8 h-full">
                      <h3 className="text-xl font-medium mb-4 text-yellow-500">
                        User-Centric Empathy
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        We put ourselves in our users' shoes, understanding
                        their needs, challenges, and aspirations to create
                        solutions that truly resonate and make a difference in
                        their lives.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8 h-full">
                      <h3 className="text-xl font-medium mb-4 text-yellow-500">
                        Precision
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        We believe in attention to detail and technical
                        excellence, ensuring our solutions are reliable,
                        efficient, and deliver exactly what our users need.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8 h-full">
                      <h3 className="text-xl font-medium mb-4 text-yellow-500">
                        Ethical Integrity
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        We maintain the highest standards of ethical conduct in
                        all our operations, ensuring transparency, privacy, and
                        responsible innovation.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8 h-full">
                      <h3 className="text-xl font-medium mb-4 text-yellow-500">
                        Simplicity in Design
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        We believe in the power of simplicity, creating clean,
                        intuitive interfaces that make complex tasks feel
                        effortless.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8 h-full">
                      <h3 className="text-xl font-medium mb-4 text-yellow-500">
                        Collaborative Innovation
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        We foster partnerships and collaboration, believing that
                        the best solutions emerge when we work together with our
                        clients and communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <div className="animate-on-scroll opacity-0 transition-all duration-700 ease-in [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 translate-y-8">
                  <CTASection
                    title="Join Us on Our Journey"
                    description="Ready to transform your business with technology that truly understands your needs?"
                    primaryButtonText="Schedule a Call"
                    primaryButtonAction={() => router.push("/schedule")}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
