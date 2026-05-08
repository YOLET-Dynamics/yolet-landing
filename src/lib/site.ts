export const siteConfig = {
  name: "YOLET Software Labs",
  shortName: "YOLET Labs",
  tagline: "Custom software, built to last.",
  description:
    "YOLET designs, builds, and modernizes software — from internal platforms to client-facing products.",
  url: "https://yoletent.com",
  ogImage: "/og.jpg",
  keywords: [
    "YOLET Labs",
    "custom software development",
    "enterprise software",
    "product design and engineering",
    "software modernization",
    "internal platforms",
    "Ethiopia software company",
  ],
  nav: [
    {
      label: "Services",
      href: "/#services",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/yolet-software-labs",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/yolet.io",
    },
  ],
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
