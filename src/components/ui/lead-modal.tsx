"use client";
import { useEffect, useRef } from "react";
import { LeadForm, LeadFormProps } from "./lead-form";

interface LeadModalProps extends LeadFormProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function LeadModal({
  open,
  onClose,
  title = "Book a free demo",
  subtitle = "Tell us about yourself and we'll reach out within 24 hours.",
  defaultInterest,
}: LeadModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-white">{title}</h2>
              <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors ml-4 flex-shrink-0 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <LeadForm defaultInterest={defaultInterest} onSuccess={() => setTimeout(onClose, 2500)} />
        </div>
      </div>
    </div>
  );
}
