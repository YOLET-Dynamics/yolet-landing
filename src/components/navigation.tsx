"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
  ];

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
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="YOLET Logo"
            width={120}
            height={26}
            className="h-6 w-auto md:h-8"
          />
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-center md:flex-1">
          <div className="flex items-center justify-center space-x-16">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/schedule">
            <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-gray-900/50 text-white border-gray-800"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black text-white border-gray-900"
            >
              <div className="flex flex-col h-full">
                <nav className="flex flex-col space-y-6 pt-16">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="text-2xl font-medium text-white"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-4 pt-8">
                  <SheetClose asChild>
                    <Link href="/schedule" className="block">
                      <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                        Get Started
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
