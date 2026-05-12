"use client";
import { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { StoryScroll, StoryStep } from "@/components/ui/story-scroll";
import { BackgroundShades } from "@/components/ui/background-shades";
import { LeadModal } from "@/components/ui/lead-modal";
import { LeadForm } from "@/components/ui/lead-form";

/* ── Platform icons ───────────────────────────────────────── */
const IconMeet = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden>
    <rect width="48" height="48" rx="8" fill="#1E8E3E" />
    <path d="M12 17h16v14H12z" fill="#fff" />
    <path d="M28 21l8-4v14l-8-4V21z" fill="#4CAF50" />
  </svg>
);
const IconZoom = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden>
    <rect width="48" height="48" rx="8" fill="#2D8CFF" />
    <path d="M10 17h18v14H10z" fill="#fff" />
    <path d="M28 21l10-4v14l-10-4V21z" fill="#fff" opacity=".85" />
  </svg>
);
const IconTeams = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden>
    <rect width="48" height="48" rx="8" fill="#464EB8" />
    <circle cx="24" cy="18" r="5" fill="#fff" />
    <path d="M14 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#fff" strokeWidth="2.5" fill="none" />
  </svg>
);

/* ── Grewbie logo ─────────────────────────────────────────── */
const GrewbieLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 1.05)} viewBox="0 0 120 126" fill="none" aria-hidden>
    <defs>
      <linearGradient id="grewbie-lg" x1="60" y1="0" x2="60" y2="126" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B5F53A" />
        <stop offset="1" stopColor="#1A6600" />
      </linearGradient>
    </defs>
    <path d="M28 67L60 31L92 67" stroke="url(#grewbie-lg)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
    <line x1="28" y1="67" x2="10" y2="67" stroke="url(#grewbie-lg)" strokeWidth="10" strokeLinecap="square" />
    <line x1="92" y1="67" x2="110" y2="67" stroke="url(#grewbie-lg)" strokeWidth="10" strokeLinecap="square" />
    <path d="M46 91L60 106L74 91" stroke="url(#grewbie-lg)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
  </svg>
);

/* ── Dashboard mock ───────────────────────────────────────── */
const DashboardMock = () => (
  <div className="w-full h-full min-h-[240px] md:min-h-[440px] bg-zinc-950 rounded-xl flex flex-col p-3 md:p-4 gap-3" role="img" aria-label="DemoAgent live call dashboard showing AI conducting a sales demo">
    {/* Window chrome — hidden on mobile to save space */}
    <div className="hidden md:flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden />
      <div className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden />
      <div className="w-3 h-3 rounded-full bg-emerald-500/70" aria-hidden />
      <div className="flex-1 mx-4 h-6 rounded-md bg-zinc-800 flex items-center px-2">
        <span className="text-[10px] text-zinc-500">demoagent.grewbie.com/live/acme-corp</span>
      </div>
    </div>

    {/* Mobile simplified layout */}
    <div className="flex md:hidden flex-col gap-3 flex-1">
      <div className="flex items-center gap-3 bg-zinc-900 rounded-lg p-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <span className="text-emerald-400 text-sm font-bold">AI</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white text-sm font-semibold">DemoAgent</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span className="text-emerald-400 text-xs">Live</span>
            </div>
          </div>
          <span className="text-zinc-500 text-xs">Acme Corp · Stage: Discovery · 12:34</span>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-lg p-3 flex-1">
        <div className="text-xs text-emerald-400 mb-2 font-medium">Live transcript</div>
        <p className="text-zinc-400 text-xs leading-relaxed">
          &ldquo;Great question — our automation reduces onboarding time by 60%. Let me show you the workflow…&rdquo;
        </p>
        <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-2 mt-3">
          {[
            { val: "3", label: "Active demos" },
            { val: "94%", label: "Completion" },
            { val: "∞", label: "Capacity" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-zinc-800/60 rounded-lg p-2 text-center">
              <div className="text-emerald-400 font-bold text-base">{s.val}</div>
              <div className="text-zinc-500 text-[9px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Desktop full layout */}
    <div className="hidden md:grid flex-1 grid-cols-3 gap-3 min-h-0">
      <div className="col-span-1 bg-zinc-900 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 text-xs font-bold">AI</span>
          </div>
          <div>
            <div className="text-white text-[11px] font-semibold">DemoBot</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span className="text-emerald-400 text-[9px]">Live</span>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {["Acme Corp Call", "Stage: Discovery", "Duration: 12:34"].map((t) => (
            <div key={t} className="text-zinc-500 text-[9px]">{t}</div>
          ))}
        </div>
        <div className="mt-auto space-y-1">
          {["Feature tour", "Pricing Q&A", "ROI calculator"].map((item, i) => (
            <div key={item} className={`text-[9px] px-2 py-1 rounded-md ${i === 0 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-500"}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 bg-zinc-900 rounded-lg overflow-hidden relative flex flex-col">
        <div className="flex-1 grid grid-cols-2 gap-1 p-1">
          <div className="bg-zinc-800 rounded-md flex items-center justify-center relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-emerald-400 text-sm font-bold">AI</span>
            </div>
            <div className="absolute bottom-1 left-1 text-[8px] text-white bg-black/50 px-1 rounded">DemoAgent</div>
          </div>
          <div className="bg-zinc-800 rounded-md flex items-center justify-center relative">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-blue-400 text-sm font-bold">JD</span>
            </div>
            <div className="absolute bottom-1 left-1 text-[8px] text-white bg-black/50 px-1 rounded">John D.</div>
          </div>
        </div>
        <div className="p-2 border-t border-zinc-800">
          <div className="text-[9px] text-emerald-400 mb-1">Live transcript</div>
          <div className="text-[9px] text-zinc-400 leading-relaxed">
            &ldquo;Great question — our automation reduces onboarding time by 60%. Let me show you the workflow…&rdquo;
          </div>
          <div className="mt-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── Story steps ─────────────────────────────────────────── */
const STEPS: StoryStep[] = [
  {
    eyebrow: "Step 01 — Record",
    title: "Show it once.\nThe agent learns.",
    description:
      "Record your ideal demo call once through the Grewbie browser extension. DemoAgent captures every click, every word, and every decision — turning your best rep's performance into a replayable AI sales demo playbook you can deploy on every call.",
    accent: "#10b981",
    visual: (
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" aria-hidden />
          <span className="text-sm text-zinc-400">Recording in progress</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Screen capture", status: "active" },
            { label: "Audio transcript", status: "active" },
            { label: "Click events", status: "active" },
            { label: "AI playbook", status: "building" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-zinc-800/60 rounded-lg">
              <span className="text-sm text-white">{item.label}</span>
              <div className={`flex items-center gap-1.5 text-xs ${item.status === "active" ? "text-emerald-400" : "text-yellow-400"}`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.status === "active" ? "bg-emerald-400" : "bg-yellow-400"}`} aria-hidden />
                {item.status === "active" ? "Capturing" : "Building…"}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Step 02 — Deploy",
    title: "AI joins the call.\nYou keep selling.",
    description:
      "Connect your calendar and DemoAgent automatically joins every booked demo on Google Meet, Zoom, or Microsoft Teams. The AI runs your demo playbook, answers live prospect questions, and handles objections — completely autonomously, with no human rep required.",
    accent: "#34d399",
    visual: (
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-6 backdrop-blur-sm">
        <div className="text-sm text-zinc-400 mb-4">Connected platforms</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { Icon: IconMeet, name: "Google Meet" },
            { Icon: IconZoom, name: "Zoom" },
            { Icon: IconTeams, name: "Microsoft Teams" },
          ].map(({ Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
              <Icon />
              <span className="text-xs text-zinc-300">{name}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                <span className="text-[10px] text-emerald-400">Ready</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="text-xs text-emerald-400 font-medium">Next demo in 14 min</div>
          <div className="text-xs text-zinc-500 mt-0.5">Acme Corp — John Davidson</div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Step 03 — Scale",
    title: "One agent.\nInfinite demos.",
    description:
      "Automate hundreds of personalised demo calls simultaneously — with zero scheduling conflicts, zero bad demo days, and zero ramp time for new reps. Every prospect gets a consistent, tailored AI sales demo experience at the quality of your best-ever performance.",
    accent: "#6ee7b7",
    visual: (
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-6 backdrop-blur-sm">
        <div className="text-sm text-zinc-400 mb-4">Live activity</div>
        <div className="space-y-2 mb-4">
          {[
            { company: "Acme Corp", progress: 78, time: "12:34" },
            { company: "Beta Inc", progress: 45, time: "8:21" },
            { company: "Gamma SaaS", progress: 15, time: "2:40" },
          ].map((c) => (
            <div key={c.company} className="flex items-center gap-3 p-2.5 bg-zinc-800/60 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-bold flex-shrink-0">AI</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white font-medium truncate">{c.company}</span>
                  <span className="text-zinc-500 ml-2 flex-shrink-0">{c.time}</span>
                </div>
                <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { val: "3", label: "Active" },
            { val: "94%", label: "Completion" },
            { val: "∞", label: "Capacity" },
          ].map((s) => (
            <div key={s.label} className="p-2 bg-zinc-800/60 rounded-lg">
              <div className="text-emerald-400 font-bold text-lg">{s.val}</div>
              <div className="text-zinc-500 text-[9px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ── FAQ data (matches JSON-LD schema in page.tsx) ────────── */
const FAQ_ITEMS = [
  {
    q: "What is DemoAgent by Grewbie Technologies?",
    a: "DemoAgent is an AI sales demo automation platform built by Grewbie Technologies Pvt Ltd. It is an intelligent agent that automatically joins Google Meet, Zoom, and Microsoft Teams calls to conduct personalised, autonomous sales demonstrations — without a human rep needing to be present on every call.",
  },
  {
    q: "How does DemoAgent work?",
    a: "DemoAgent works in three steps: (1) Record — a sales rep records their ideal demo once using the Grewbie browser extension, which captures screen, audio, clicks, and conversation flow. (2) Deploy — DemoAgent connects to your calendar and joins every booked demo call, executing the AI playbook personalised to each prospect. (3) Scale — multiple demos run concurrently, 24/7, with zero scheduling conflicts.",
  },
  {
    q: "Which platforms does DemoAgent support?",
    a: "DemoAgent currently supports Google Meet, Zoom, and Microsoft Teams — the three most widely used video conferencing platforms for B2B sales.",
  },
  {
    q: "Can DemoAgent answer live questions from prospects?",
    a: "Yes. DemoAgent uses a knowledge base built from your product documentation, FAQs, and recorded demos to answer prospect questions in real time. It also handles common objections based on patterns learned during the recording phase.",
  },
  {
    q: "Is DemoAgent available in India?",
    a: "Yes. DemoAgent is built by Grewbie Technologies Pvt Ltd, headquartered in Tamil Nadu, India. The product works globally and is particularly well suited for Indian SaaS startups and sales teams looking to scale without proportionally growing headcount.",
  },
  {
    q: "What is Brand Cure by Grewbie?",
    a: "Brand Cure is Grewbie's AI marketing and automation services arm. It delivers AI-generated ad creatives, conversion-optimised landing pages, marketing automation workflows, sales pipeline automation, and branding — primarily for Indian startups, SMBs, and SaaS companies.",
  },
  {
    q: "How do I get started?",
    a: "Email support@grewbie.com or call +91 8838924425 to book a free demo. Setup takes under 5 minutes: install the browser extension, record your first demo playbook, connect your calendar, and DemoAgent handles the rest.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — you can try DemoAgent for free. Contact support@grewbie.com for current pricing plans and to get started at no cost.",
  },
];

/* ── FAQ accordion item ───────────────────────────────────── */
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-white font-medium text-base md:text-lg group-hover:text-emerald-400 transition-colors">
          {q}
        </span>
        <span
          className="text-emerald-500 text-xl font-light flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="text-zinc-400 text-base leading-relaxed pb-5 pr-8">{a}</p>
      </div>
    </div>
  );
};

/* ── Main page ────────────────────────────────────────────── */
export default function LandingClient() {
  const [modal, setModal] = useState<{ open: boolean; interest: "demo" | "brand-cure" | "general"; title: string; subtitle: string }>({
    open: false,
    interest: "demo",
    title: "Book a free demo",
    subtitle: "Tell us about yourself and we'll reach out within 24 hours.",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openDemo = () =>
    setModal({ open: true, interest: "demo", title: "Book a free demo", subtitle: "See DemoAgent live on a call. We'll set it up for you." });

  const openConsult = () =>
    setModal({ open: true, interest: "brand-cure", title: "Get a free consultation", subtitle: "Let's talk about your marketing and automation goals." });

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <BackgroundShades className="fixed inset-0 w-full h-full z-0" />

      <LeadModal
        open={modal.open}
        onClose={closeModal}
        defaultInterest={modal.interest}
        title={modal.title}
        subtitle={modal.subtitle}
      />

      {/* ── Header / Navbar ── */}
      <header>
        <nav
          className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-12 h-16 border-b border-white/5 bg-black/60 backdrop-blur-md"
          aria-label="Main navigation"
        >
          <a href="/" className="flex items-center gap-2.5" aria-label="Grewbie Technologies home">
            <GrewbieLogo size={28} />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-tight">Grewbie</span>
              <span className="text-emerald-500 text-[9px] font-medium tracking-widest uppercase">DemoAgent</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400" role="list">
            {[
              { href: "#how-it-works", label: "How it works" },
              { href: "#integrations", label: "Integrations" },
              { href: "#brand-cure", label: "Brand Cure" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors cursor-pointer"
                role="listitem"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="mailto:support@grewbie.com" className="text-sm text-zinc-400 hover:text-white transition-colors hidden md:block cursor-pointer">
              Contact
            </a>
            <button
              onClick={openDemo}
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-colors cursor-pointer hidden sm:block"
              aria-label="Book a free DemoAgent demo"
            >
              Book a Demo
            </button>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col pt-16"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col px-6 pt-8 gap-1">
              {[
                { href: "#how-it-works", label: "How it works" },
                { href: "#integrations", label: "Integrations" },
                { href: "#brand-cure", label: "Brand Cure" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-zinc-300 hover:text-white py-4 border-b border-white/5 transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="px-6 pt-8 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); openDemo(); }}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-colors cursor-pointer"
              >
                Book a Demo
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); openConsult(); }}
                className="w-full py-4 rounded-xl border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-colors cursor-pointer"
              >
                Brand Cure Consultation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Main content ── */}
      <main>
        {/* ── Hero ── */}
        <section id="hero" aria-labelledby="hero-heading" className="relative z-10 pt-16">
          <ContainerScroll
            titleComponent={
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                  AI sales demo automation software
                </div>
                <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                  Automate every sales demo
                  <br />
                  <span className="text-emerald-400">with AI.</span>
                </h1>
                <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Record your best demo once. <strong className="text-zinc-300">DemoAgent by Grewbie</strong> automatically joins
                  every booked call on Google Meet, Zoom, and Microsoft Teams — running personalised, autonomous
                  sales demos at scale while you focus on closing.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={openDemo}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    aria-label="Book a free DemoAgent demo call"
                  >
                    Book a free demo
                  </button>
                  <a
                    href="#how-it-works"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 hover:border-emerald-500/50 text-white font-semibold text-base transition-all duration-200 cursor-pointer"
                  >
                    See how it works
                  </a>
                </div>
                <ul className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-zinc-500 list-none">
                  <li>No credit card required</li>
                  <li aria-hidden>·</li>
                  <li>5-minute setup</li>
                  <li aria-hidden>·</li>
                  <li>Google Meet · Zoom · Teams</li>
                </ul>
              </div>
            }
          >
            <DashboardMock />
          </ContainerScroll>
        </section>

        {/* ── Integrations ── */}
        <section
          id="integrations"
          aria-labelledby="integrations-heading"
          className="relative z-10 py-16 border-y border-white/5"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="integrations-heading" className="sr-only">
              DemoAgent platform integrations
            </h2>
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-8">
              AI demo automation for Google Meet, Zoom &amp; Microsoft Teams
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap" role="list" aria-label="Supported video conferencing platforms">
              {[
                { Icon: IconMeet, name: "Google Meet" },
                { Icon: IconZoom, name: "Zoom" },
                { Icon: IconTeams, name: "Microsoft Teams" },
              ].map(({ Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity" role="listitem">
                  <Icon />
                  <span className="text-xs text-zinc-500">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works (Story Scroll) ── */}
        <section id="how-it-works" aria-labelledby="how-heading" className="relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-24 pb-8 px-6">
            <p className="text-sm font-semibold tracking-widest uppercase text-emerald-500 mb-4">How it works</p>
            <h2 id="how-heading" className="text-3xl md:text-5xl font-bold text-white">
              Three steps to automate your sales demos
            </h2>
          </div>
          <StoryScroll steps={STEPS} />
        </section>

        {/* ── Stats ── */}
        <section aria-label="DemoAgent key metrics" className="relative z-10 py-24 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-sm text-zinc-500 uppercase tracking-widest mb-12">
              Why sales teams choose DemoAgent to automate demos
            </p>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { val: "10×", label: "Demo capacity" },
                { val: "< 5 min", label: "Setup time" },
                { val: "24 / 7", label: "Always available" },
                { val: "0 ramp", label: "Time for new reps" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-6 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-emerald-500/20 transition-colors"
                >
                  <dt className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-2">{s.val}</dt>
                  <dd className="text-sm text-zinc-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Brand Cure ── */}
        <section id="brand-cure" aria-labelledby="brandcure-heading" className="relative z-10 py-24 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase text-emerald-500 mb-4">Also from Grewbie</p>
              <h2 id="brandcure-heading" className="text-3xl md:text-5xl font-bold text-white mb-4">
                Brand Cure
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Grewbie&rsquo;s AI marketing and automation services division — AI ad creatives, conversion-optimised
                landing pages, sales automation workflows, and branding for Indian startups and SMBs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
              {[
                {
                  title: "AI Ads",
                  desc: "Generate high-converting ad creatives, copy, and targeting strategies using AI — in minutes, not weeks.",
                  span: "md:col-span-2",
                  icon: (
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  title: "Landing Pages",
                  desc: "Beautiful, fast, conversion-optimised landing pages delivered in days.",
                  span: "md:col-span-1",
                  icon: (
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                    </svg>
                  ),
                },
                {
                  title: "Automation Workflows",
                  desc: "Connect your tools and eliminate manual work with AI-powered automation pipelines.",
                  span: "md:col-span-1",
                  icon: (
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                    </svg>
                  ),
                },
                {
                  title: "Sales & Marketing Automation",
                  desc: "CRM enrichment, lead scoring, drip sequences, and outbound — all on autopilot.",
                  span: "md:col-span-2",
                  icon: (
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className={`${card.span} p-6 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 group`}
                  role="listitem"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors" aria-hidden>
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={openConsult}
                className="inline-block px-8 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-semibold text-sm transition-all duration-200 cursor-pointer"
                aria-label="Contact Grewbie for a free Brand Cure consultation"
              >
                Get a free Brand Cure consultation →
              </button>
            </div>
          </div>
        </section>

        {/* ── About (entity block for GEO) ── */}
        <section id="about" aria-labelledby="about-heading" className="relative z-10 py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl bg-zinc-900/40 border border-white/5 p-8 md:p-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-4">About</p>
              <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-white mb-6">
                Grewbie Technologies Pvt Ltd
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-zinc-400 text-base leading-relaxed">
                <div>
                  <p className="mb-4">
                    <strong className="text-white">Grewbie Technologies Pvt Ltd</strong> is an Indian AI software company
                    headquartered in Tamil Nadu, India. We build AI-powered tools that help businesses automate
                    sales and marketing operations.
                  </p>
                  <p>
                    Our flagship product, <strong className="text-white">DemoAgent</strong>, is the first AI agent
                    purpose-built to autonomously conduct sales demo calls on Google Meet, Zoom, and Microsoft
                    Teams — making it possible for any sales team to run unlimited personalised demos without
                    proportionally increasing headcount.
                  </p>
                </div>
                <div>
                  <p className="mb-4">
                    Our services brand, <strong className="text-white">Brand Cure</strong>, delivers AI marketing
                    automation, ad creatives, landing pages, and sales workflows for startups and SMBs across India
                    and globally.
                  </p>
                  <address className="not-italic mt-4 space-y-1 text-sm text-zinc-500">
                    <div><span className="text-zinc-400">Location:</span> Tamil Nadu, India</div>
                    <div>
                      <span className="text-zinc-400">Email: </span>
                      <a href="mailto:support@grewbie.com" className="text-emerald-400 hover:underline">support@grewbie.com</a>
                    </div>
                    <div>
                      <span className="text-zinc-400">Phone: </span>
                      <a href="tel:+918838924425" className="hover:text-emerald-400">+91 88389 24425</a>
                    </div>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-labelledby="faq-heading" className="relative z-10 py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-widest uppercase text-emerald-500 mb-4">FAQ</p>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white">
                Frequently asked questions
              </h2>
            </div>
            <div role="list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} role="listitem">
                  <FaqItem q={item.q} a={item.a} index={i} />
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-zinc-500 text-sm">
              Have another question?{" "}
              <a href="mailto:support@grewbie.com" className="text-emerald-400 hover:underline">
                Email us at support@grewbie.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Inline contact / lead capture ── */}
        <section id="contact" aria-labelledby="contact-heading" className="relative z-10 py-24 border-t border-white/5 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left — copy */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-emerald-500 mb-4">Get in touch</p>
              <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Start automating
                <br />
                <span className="text-emerald-400">your sales demos today.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Book a live demo of DemoAgent or explore Brand Cure&rsquo;s AI marketing services — fill in the form and we&rsquo;ll reach out within 24 hours.
              </p>
              <div className="space-y-4 text-sm text-zinc-500">
                {[
                  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "support@grewbie.com" },
                  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+91 88389 24425" },
                  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "Tamil Nadu, India" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-zinc-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-zinc-950/80 border border-white/5 rounded-2xl p-7 backdrop-blur-sm">
              <LeadForm defaultInterest="demo" />
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section aria-label="Final call to action" className="relative z-10 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="relative rounded-3xl p-10 md:p-14 overflow-hidden border border-emerald-500/20 text-center"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.12) 0%, rgba(0,0,0,0) 70%), #09090b" }}
            >
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                See AI demo automation live —
              </h2>
              <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                Book a call and watch DemoAgent autonomously conduct a fully personalised sales demo on Meet, Zoom, or Teams — in real time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openDemo}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all duration-200 shadow-xl shadow-emerald-500/20 cursor-pointer"
                >
                  Book a Demo
                </button>
                <button
                  onClick={openConsult}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-all duration-200 cursor-pointer"
                >
                  Brand Cure Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6" aria-label="Site footer">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <GrewbieLogo size={22} />
            <span className="text-sm text-zinc-500">
              © 2026{" "}
              <span className="text-white font-medium">Grewbie Technologies Pvt Ltd</span>
            </span>
          </div>
          <nav aria-label="Footer links" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-600">
            <a href="mailto:support@grewbie.com" className="hover:text-emerald-400 transition-colors cursor-pointer">
              support@grewbie.com
            </a>
            <a href="tel:+918838924425" className="hover:text-emerald-400 transition-colors">
              +91 88389 24425
            </a>
            <a href="#faq" className="hover:text-zinc-400 transition-colors">FAQ</a>
            <a href="#about" className="hover:text-zinc-400 transition-colors">About</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
