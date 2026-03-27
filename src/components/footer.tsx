import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { siteConfig } from "@/lib/site";

export function Footer(): ReactElement {
  return (
    <footer className="pb-10 pt-4">
      <div className="container">
        <div className="premium-surface subtle-outline overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="YOLET Logo"
                  width={120}
                  height={26}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="max-w-sm text-sm leading-6 text-white/[0.52]">
                Software built with people, not just for them.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/[0.56] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/[0.38]">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {siteConfig.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/[0.48] transition-colors hover:text-white"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
