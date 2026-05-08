"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation(): ReactElement {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = siteConfig.nav;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 md:pt-5">
      <div className="container pointer-events-auto">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-white/10 bg-background/70 py-3.5 pl-6 pr-3 backdrop-blur-xl transition-shadow duration-200",
            isScrolled && "shadow-[0_8px_28px_rgba(0,0,0,0.35)]",
          )}
        >
        <Link
          href="/"
          className="flex items-center pr-3"
          aria-label={siteConfig.shortName}
        >
          <Image
            src="/logo.svg"
            alt="YOLET"
            width={120}
            height={26}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/#services" ? pathname === "/" : pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <Button asChild size="sm">
            <Link href="/schedule">Schedule a call</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-white"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-white/10 bg-background p-8 text-white"
            >
              <div className="flex h-full flex-col">
                <div className="space-y-1 pt-12">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className="block py-3 text-lg text-white/80 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button asChild className="w-full" size="lg">
                      <Link href="/schedule">Schedule a call</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  );
}
