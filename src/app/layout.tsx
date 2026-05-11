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
    default: "Grewbie DemoAgent — AI Sales Demo Automation for Meet, Zoom & Teams",
    template: "%s | Grewbie Technologies",
  },
  description:
    "DemoAgent by Grewbie Technologies is an AI agent that automatically joins Google Meet, Zoom, and Microsoft Teams calls to run personalised sales demos. Record once, scale infinitely. India-based SaaS startup.",
  keywords: [
    "AI sales demo automation",
    "DemoAgent",
    "Grewbie Technologies",
    "AI demo agent",
    "automated sales demo",
    "Google Meet AI agent",
    "Zoom AI agent",
    "Microsoft Teams AI bot",
    "sales automation India",
    "AI sales tool India",
    "SaaS demo automation",
    "Brand Cure AI",
    "AI marketing automation India",
    "sales demo software",
    "virtual sales agent",
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
    title: "Grewbie DemoAgent — AI That Runs Your Sales Demos on Meet, Zoom & Teams",
    description:
      "Record your best sales demo once. DemoAgent joins every prospect call autonomously, runs personalised demos, and handles objections — 24/7, on Google Meet, Zoom, and Microsoft Teams.",
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
    title: "Grewbie DemoAgent — AI Sales Demo Automation",
    description:
      "Your AI that joins Meet, Zoom & Teams and runs personalised sales demos autonomously. Record once, scale to infinity.",
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
