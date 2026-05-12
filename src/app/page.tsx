import LandingClient from "./LandingClient";
import type { WithContext, Organization, SoftwareApplication, FAQPage, WebSite } from "schema-dts";

const SITE_URL = "https://grewbie.com";

/* ── JSON-LD: Organization ─────────────────────────────────── */
const orgSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Grewbie Technologies Pvt Ltd",
  alternateName: ["Grewbie", "Grewbie Tech"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Grewbie Technologies Pvt Ltd is an Indian AI software company that builds AI-powered sales automation tools. Its flagship product, DemoAgent, is an AI agent that autonomously joins Google Meet, Zoom, and Microsoft Teams calls to conduct personalised sales demos. Grewbie also offers Brand Cure, a suite of AI marketing and automation services.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Tamil Nadu, India",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Tamil Nadu",
    },
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8838924425",
      contactType: "customer service",
      email: "support@grewbie.com",
      availableLanguage: ["English", "Tamil"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "support@grewbie.com",
    },
  ],
  knowsAbout: [
    "AI sales automation",
    "sales demo automation",
    "conversational AI",
    "AI marketing",
    "marketing automation",
    "SaaS",
    "AI agents",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Grewbie Products & Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "DemoAgent" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Cure" } },
    ],
  },
};

/* ── JSON-LD: SoftwareApplication ──────────────────────────── */
const productSchema: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#demoagent`,
  name: "DemoAgent",
  alternateName: "Grewbie DemoAgent",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Sales Automation",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "DemoAgent is an AI sales demo automation platform that automatically joins Google Meet, Zoom, and Microsoft Teams video calls to conduct personalised, autonomous sales demonstrations. Users record a demo call once using a browser extension; DemoAgent learns the playbook and can run unlimited concurrent demos 24/7, answer prospect questions, handle objections, and adapt presentations in real time.",
  featureList: [
    "Automated sales demo execution on Google Meet, Zoom, and Microsoft Teams",
    "One-time recording to create an AI demo playbook",
    "Unlimited concurrent demo calls",
    "Real-time live transcript during calls",
    "Autonomous objection handling",
    "Knowledge base integration for prospect Q&A",
    "Calendar integration for automatic demo scheduling",
    "Demo analytics and session recordings",
  ],
  screenshot: `${SITE_URL}/og-image.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free trial available. Contact for pricing.",
  },
  creator: {
    "@type": "Organization",
    name: "Grewbie Technologies Pvt Ltd",
    "@id": `${SITE_URL}/#organization`,
  },
  availableOnDevice: ["Desktop", "Laptop"],
  softwareVersion: "1.0",
  releaseNotes: "Initial release with Google Meet, Zoom, and Microsoft Teams integrations.",
};

/* ── JSON-LD: WebSite ──────────────────────────────────────── */
const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Grewbie Technologies",
  description: "Official website of Grewbie Technologies Pvt Ltd — AI sales demo automation and marketing services.",
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
  },
};

/* ── JSON-LD: FAQPage ──────────────────────────────────────── */
const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What is DemoAgent by Grewbie Technologies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DemoAgent is an AI-powered sales demo automation tool built by Grewbie Technologies Pvt Ltd, an Indian AI startup. It is an intelligent agent that automatically joins video conference calls on Google Meet, Zoom, and Microsoft Teams to conduct personalised sales demonstrations autonomously, without a human sales rep needing to be present.",
      },
    },
    {
      "@type": "Question",
      name: "How does DemoAgent work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DemoAgent works in three steps: (1) Record — A sales rep records their ideal demo call once using Grewbie's browser extension, which captures screen activity, audio, clicks, and conversation flow to create an AI playbook. (2) Deploy — DemoAgent connects to your calendar and automatically joins every booked demo call on Google Meet, Zoom, or Microsoft Teams, then executes the AI playbook personalised to each prospect. (3) Scale — Multiple demos can run simultaneously, 24 hours a day, 7 days a week, without scheduling conflicts.",
      },
    },
    {
      "@type": "Question",
      name: "Which video conferencing platforms does DemoAgent support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DemoAgent currently supports Google Meet, Zoom, and Microsoft Teams — the three most widely used video conferencing platforms for business sales calls.",
      },
    },
    {
      "@type": "Question",
      name: "Is DemoAgent available in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DemoAgent is built by Grewbie Technologies Pvt Ltd, a company based in Tamil Nadu, India. The product is available globally and is particularly suited for Indian SaaS companies and startups looking to scale their sales demo operations without proportionally growing their sales team.",
      },
    },
    {
      "@type": "Question",
      name: "Can DemoAgent answer questions from prospects during a demo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DemoAgent uses a knowledge base built from your product documentation, FAQs, and recorded demos to answer prospect questions in real time during the call. It can also handle common objections based on patterns learned during the recording phase.",
      },
    },
    {
      "@type": "Question",
      name: "What is Brand Cure by Grewbie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brand Cure is Grewbie Technologies' AI marketing and automation services division. It offers AI-generated advertising creatives, conversion-optimised landing pages, marketing automation workflows, sales automation pipelines, and branding services — primarily for Indian startups, SMBs, and SaaS companies.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with DemoAgent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can get started with DemoAgent by booking a free demo via the Grewbie website at grewbie.com or by emailing support@grewbie.com. The setup process takes under 5 minutes: install the browser extension, record your first demo, connect your calendar, and DemoAgent handles the rest.",
      },
    },
    {
      "@type": "Question",
      name: "Does DemoAgent require a long-term contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. DemoAgent is available to try for free. Contact Grewbie Technologies at support@grewbie.com or +91 8838924425 for current pricing and plan details.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Grewbie Technologies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grewbie Technologies Pvt Ltd is an early-stage Indian AI company founded to help businesses automate sales and marketing using artificial intelligence. The company has delivered over 10 websites and landing pages, AI-powered advertising campaigns, and automation workflows for clients. Its headquarters are in Tamil Nadu, India. Contact: support@grewbie.com | +91 8838924425.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Structured data for search engines and AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingClient />
    </>
  );
}
