import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { siteConfig } from "@/lib/site";

export function Footer(): ReactElement {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center" aria-label={siteConfig.shortName}>
            <Image
              src="/logo.svg"
              alt="YOLET"
              width={120}
              height={26}
              className="h-6 w-auto"
            />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            {siteConfig.social.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {social.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
