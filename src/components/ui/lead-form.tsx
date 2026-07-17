"use client";
import { useState, FormEvent } from "react";

export interface LeadFormProps {
  defaultInterest?: "demo" | "brand-cure" | "forca" | "general";
  onSuccess?: () => void;
  compact?: boolean;
}

const INTERESTS = [
  { value: "demo", label: "Book a Demo" },
  { value: "brand-cure", label: "Brand Cure Consultation" },
  { value: "forca", label: "Forca Early Access" },
  { value: "general", label: "General Inquiry" },
] as const;

export function LeadForm({ defaultInterest = "demo", onSuccess, compact = false }: LeadFormProps) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: defaultInterest,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source: "website-form" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      onSuccess?.();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold text-lg">We&apos;ll be in touch soon!</p>
          <p className="text-zinc-400 text-sm mt-1">
            Expect a reply at <span className="text-emerald-400">{fields.email}</span> within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full bg-zinc-900 border border-zinc-700 focus:border-emerald-500 outline-none rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 transition-colors";

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {/* Name + Email */}
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-name" className="text-xs font-medium text-zinc-400">
            Name <span className="text-emerald-500">*</span>
          </label>
          <input
            id="lf-name"
            type="text"
            required
            placeholder="Your full name"
            value={fields.name}
            onChange={set("name")}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-email" className="text-xs font-medium text-zinc-400">
            Email <span className="text-emerald-500">*</span>
          </label>
          <input
            id="lf-email"
            type="email"
            required
            placeholder="you@company.com"
            value={fields.email}
            onChange={set("email")}
            className={inputCls}
          />
        </div>
      </div>

      {/* Phone + Company */}
      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lf-phone" className="text-xs font-medium text-zinc-400">
              Phone
            </label>
            <input
              id="lf-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={fields.phone}
              onChange={set("phone")}
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lf-company" className="text-xs font-medium text-zinc-400">
              Company
            </label>
            <input
              id="lf-company"
              type="text"
              placeholder="Acme Inc."
              value={fields.company}
              onChange={set("company")}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {/* Interest */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-interest" className="text-xs font-medium text-zinc-400">
          I&apos;m interested in
        </label>
        <select
          id="lf-interest"
          value={fields.interest}
          onChange={set("interest")}
          className={`${inputCls} cursor-pointer`}
        >
          {INTERESTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      {!compact && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-message" className="text-xs font-medium text-zinc-400">
            Message <span className="text-zinc-600">(optional)</span>
          </label>
          <textarea
            id="lf-message"
            rows={3}
            placeholder="Tell us a bit about your use case…"
            value={fields.message}
            onChange={set("message")}
            className={`${inputCls} resize-none`}
          />
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:cursor-not-allowed text-black font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </span>
        ) : (
          "Send →"
        )}
      </button>

      <p className="text-[11px] text-zinc-600 text-center">
        We reply within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
