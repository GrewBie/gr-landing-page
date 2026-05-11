"use client";
import { useEffect, useRef } from "react";

export const BackgroundShades = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      t += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const orbs = [
        { x: 0.3 + 0.15 * Math.sin(t * 0.7), y: 0.4 + 0.1 * Math.cos(t * 0.5), r: 0.45, alpha: 0.12 },
        { x: 0.7 + 0.12 * Math.cos(t * 0.6), y: 0.6 + 0.12 * Math.sin(t * 0.8), r: 0.4,  alpha: 0.08 },
        { x: 0.5 + 0.08 * Math.sin(t * 1.1), y: 0.25 + 0.08 * Math.cos(t * 0.9), r: 0.3, alpha: 0.06 },
      ];

      orbs.forEach((orb) => {
        const grad = ctx.createRadialGradient(
          orb.x * w, orb.y * h, 0,
          orb.x * w, orb.y * h, orb.r * Math.max(w, h)
        );
        grad.addColorStop(0, `rgba(16, 185, 129, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(5, 150, 105, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden />;
};
