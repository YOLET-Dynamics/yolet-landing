import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "YOLET Labs - Create.Design.Innovate",
  description:
    "Empowering communities and businesses across Ethiopia, Africa, and beyond with innovative software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable} font-dm-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
