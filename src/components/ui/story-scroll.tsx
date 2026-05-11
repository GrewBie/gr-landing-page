"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface StoryStep {
  eyebrow: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  accent?: string;
}

export const StoryScroll = ({ steps }: { steps: StoryStep[] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");

      panels.forEach((panel, i) => {
        const content = panel.querySelector(".story-content");
        const visual = panel.querySelector(".story-visual");

        gsap.fromTo(
          content,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          visual,
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (i < panels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {steps.map((step, i) => (
        <section
          key={i}
          className="story-panel min-h-screen bg-black flex items-center relative overflow-hidden"
        >
          {/* Step number watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="text-[20rem] font-black leading-none opacity-[0.03]"
              style={{ color: step.accent ?? "#10b981" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at ${i % 2 === 0 ? "30%" : "70%"} 50%, ${step.accent ?? "#10b981"}0d 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className={`story-content ${i % 2 !== 0 ? "md:order-2" : ""}`}>
              <p
                className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: step.accent ?? "#10b981" }}
              >
                {step.eyebrow}
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {step.description}
              </p>

              <div className="flex gap-2 mt-8">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: j === i ? "2rem" : "0.5rem",
                      background: j === i ? (step.accent ?? "#10b981") : "#27272a",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className={`story-visual ${i % 2 !== 0 ? "md:order-1" : ""}`}>
              {step.visual}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
