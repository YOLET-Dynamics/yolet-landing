import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export function Seo({
  title = "YOLET Software Labs - Create.Design.Innovate",
  description = "Empowering communities and businesses across Ethiopia, Africa, and beyond with innovative software solutions.",
  canonical = "https://yoletent.com",
  ogImage = "/og-image.jpg",
}: SeoProps) {
  const siteTitle = title.includes("YOLET")
    ? title
    : `${title} | YOLET Software Labs`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
