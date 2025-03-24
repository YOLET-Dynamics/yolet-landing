"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full border-b transition-all duration-300",
        isScrolled
          ? "border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between py-12 md:py-16">
        <Link href="/" className="flex items-center space-x-3 z-50">
          <div className="relative h-8 w-auto">
            <Image
              src="/logo.svg"
              alt="YOLET Logo"
              width={120}
              height={26}
              className="h-8 w-auto"
            />
          </div>
        </Link>

        <nav className="hidden md:flex md:items-center">
          {["Services", "About"].map((item, index) => (
            <div key={item} className="flex items-center">
              <Link
                href={item === "About" ? "/about" : `/#${item.toLowerCase()}`}
                className="group px-12 text-base font-medium text-gray-400 transition-colors hover:text-white"
              >
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              {index < 1 && <span className="text-gray-600 mx-2">/</span>}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex md:gap-4">
          <Link href="/schedule">
            <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/50 text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 transition-all duration-300 ease-in-out" />
          ) : (
            <Menu className="h-5 w-5 transition-all duration-300 ease-in-out" />
          )}
        </button>

        <div
          className={cn(
            "fixed inset-0 z-30 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden",
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div
          className={cn(
            "fixed inset-0 z-40 flex flex-col bg-gray-900 p-6 transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="mt-16 flex flex-1 flex-col">
            <nav className="flex flex-col space-y-6 pt-8">
              {["Services", "About"].map((item, i) => (
                <Link
                  key={item}
                  href={item === "About" ? "/about" : `/#${item.toLowerCase()}`}
                  className={cn(
                    "text-2xl font-medium text-white transition-all duration-300 ease-in",
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0",
                    { "transition-delay-100": i === 0 },
                    { "transition-delay-150": i === 1 },
                    { "transition-delay-200": i === 2 }
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4 pt-8">
              <Link href="/schedule">
                <Button
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
