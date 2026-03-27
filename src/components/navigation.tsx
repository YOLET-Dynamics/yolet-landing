"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu } from "lucide-react";
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = siteConfig.nav;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container pointer-events-auto pt-4 md:pt-6">
        <div
          className={cn(
            "flex w-full items-center justify-between transition-all duration-300",
            isScrolled
              ? "rounded-[1.15rem] border border-white/[0.14] bg-black/[0.78] px-3 py-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl"
              : "rounded-none border border-transparent bg-transparent px-0 py-1 shadow-none backdrop-blur-0",
          )}
        >
          <Link
            href="/"
            className="flex items-center rounded-[0.85rem] px-2 py-1"
          >
            <Image
              src="/logo.svg"
              alt="YOLET Logo"
              width={120}
              height={26}
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <nav className="hidden lg:flex lg:items-center">
            <div
              className={cn(
                "flex items-center transition-all duration-300",
                isScrolled
                  ? "gap-1 rounded-[0.9rem] border border-white/[0.08] bg-white/[0.03] p-1"
                  : "gap-7 rounded-none border-transparent bg-transparent p-0",
              )}
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/#services" ? pathname === "/" : pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-[0.92rem] transition-all duration-300",
                      isScrolled
                        ? cn(
                            "rounded-[0.72rem] px-4 py-1.5 text-white/[0.62]",
                            isActive
                              ? "bg-white/[0.08] text-white"
                              : "hover:bg-white/[0.05] hover:text-white",
                          )
                        : cn(
                            "px-0 py-0 text-white/[0.58]",
                            isActive ? "text-white" : "hover:text-white",
                          ),
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild size="sm" className="px-5">
              <Link href="/schedule">
                Schedule a call
                <ArrowUpRight className="text-yellow-600" />
              </Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-[0.95rem] text-white transition-all duration-300",
                    isScrolled
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-transparent bg-transparent",
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-[#0c0c0d] p-6 text-white"
              >
                <div className="flex h-full flex-col">
                  <div className="space-y-3 pt-16">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className="block rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-lg font-medium text-white/80 transition-colors hover:border-white/[0.18] hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="mt-auto pt-8">
                    <SheetClose asChild>
                      <Button asChild className="w-full" size="lg">
                        <Link href="/schedule">
                          Schedule a call
                          <ArrowUpRight className="text-yellow-600" />
                        </Link>
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
