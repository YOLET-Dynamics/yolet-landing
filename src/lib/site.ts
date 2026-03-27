export const siteConfig = {
  name: "YOLET Software Labs",
  shortName: "YOLET Labs",
  tagline: "Create. Design. Innovate.",
  description:
    "Software that simplifies the complex, elevates the everyday, and helps communities and businesses make meaningful progress.",
  url: "https://yoletent.com",
  ogImage: "/og.jpg",
  keywords: [
    "YOLET Labs",
    "software development Ethiopia",
    "premium web development",
    "custom software Africa",
    "enterprise software design",
    "product design and engineering",
    "system modernization",
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
