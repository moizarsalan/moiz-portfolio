import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import ThemeProvider from "@/components/providers/ThemeProvider";

import SiteShell from "@/components/layout/SiteShell";

import {
  siteConfig,
} from "@/data/site";

import "./globals.css";
import "lenis/dist/lenis.css";

/* =========================================================
   FONTS
========================================================= */

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(
    siteConfig.url
  ),

  title: {
    default:
      "Abdul Moiz Arsalan | Full-Stack Web Developer",

    template:
      "%s | Abdul Moiz Arsalan",
  },

  description:
    siteConfig.description,

  applicationName:
    "Abdul Moiz Arsalan Portfolio",

  authors: [
    {
      name:
        "Abdul Moiz Arsalan",
    },
  ],

  creator:
    "Abdul Moiz Arsalan",

  publisher:
    "Abdul Moiz Arsalan",

  keywords: [
    "Abdul Moiz Arsalan",
    "Full-Stack Web Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Laravel Developer",
    "PHP Developer",
    "MySQL Developer",
    "Web Development Portfolio",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "/",

    siteName:
      "Abdul Moiz Arsalan",

    title:
      "Abdul Moiz Arsalan | Full-Stack Web Developer",

    description:
      siteConfig.description,

    images: [
      {
        url:
          "/opengraph-image",

        width: 1200,

        height: 630,

        alt:
          "Abdul Moiz Arsalan — Full-Stack Web Developer",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Abdul Moiz Arsalan | Full-Stack Web Developer",

    description:
      siteConfig.description,

    images: [
      "/opengraph-image",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },

  category:
    "technology",
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: [
    {
      media:
        "(prefers-color-scheme: light)",

      color:
        "#f7f8fc",
    },

    {
      media:
        "(prefers-color-scheme: dark)",

      color:
        "#07090d",
    },
  ],
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          bg-background
          text-foreground
          antialiased
        `}
      >
        <ThemeProvider>
          <SiteShell>
            {children}
          </SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}