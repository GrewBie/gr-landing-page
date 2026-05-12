import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://grewbie.com";
const SITE_NAME = "Grewbie Technologies";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DemoAgent by Grewbie — Automate Sales Demos on Meet, Zoom & Teams | AI Demo Automation",
    template: "%s | Grewbie Technologies",
  },
  description:
    "DemoAgent by Grewbie Technologies automates your entire sales demo pipeline. Record your best demo once — our AI agent joins every Google Meet, Zoom, and Microsoft Teams call to run personalised demos 24/7, handle objections, and close more deals without adding headcount.",
  keywords: [
    // Primary
    "AI sales demo automation",
    "automate sales demos",
    "sales demo automation software",
    "AI demo agent",
    "DemoAgent",
    // Platform-specific
    "Google Meet AI agent",
    "Zoom AI bot",
    "Microsoft Teams AI agent",
    "AI agent for video calls",
    // Intent / long-tail
    "automated sales demo tool",
    "record demo once deploy everywhere",
    "AI agent for sales calls",
    "sales demo on autopilot",
    "B2B demo automation",
    "demo automation for SaaS",
    "virtual sales demo agent",
    "autonomous demo software",
    "scale sales demos without hiring",
    // Brand
    "Grewbie Technologies",
    "Grewbie DemoAgent",
    // India market
    "AI sales tool India",
    "sales automation India",
    "SaaS demo automation India",
    "AI startup Tamil Nadu",
    // Services
    "Brand Cure",
    "AI marketing automation India",
    "AI ad creatives India",
    "landing page automation",
    "sales workflow automation",
  ],
  authors: [{ name: "Grewbie Technologies Pvt Ltd", url: SITE_URL }],
  creator: "Grewbie Technologies Pvt Ltd",
  publisher: "Grewbie Technologies Pvt Ltd",
  category: "Technology",
  classification: "Business/Software",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "DemoAgent — Automate Your Sales Demos on Meet, Zoom & Teams | Grewbie",
    description:
      "Automate your entire sales demo pipeline. Record once — DemoAgent joins every prospect call on Google Meet, Zoom, and Microsoft Teams, runs personalised demos, handles objections, and scales to unlimited concurrent calls, 24/7.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Grewbie DemoAgent — AI Sales Demo Automation Platform",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@grewbietech",
    creator: "@grewbietech",
    title: "DemoAgent by Grewbie — Automate Sales Demos with AI",
    description:
      "AI demo automation for B2B SaaS. Record your best sales demo once — DemoAgent joins Meet, Zoom & Teams calls autonomously, scales to unlimited demos, and never has a bad demo day.",
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "f5a6db9c70ad30e2",
    other: {
      "msvalidate.01": "DC9C9F293D8A3BE42B1D3AE60EFF96A9",
    },
  },

  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Tamil Nadu, India",
    "geo.position": "13.0827;80.2707",
    ICBM: "13.0827, 80.2707",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
