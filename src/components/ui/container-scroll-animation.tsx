"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      className="h-[54rem] sm:h-[64rem] md:h-[90rem] flex items-start justify-center relative"
      ref={containerRef}
    >
      <div
        className="pt-10 sm:pt-16 md:pt-40 w-full sticky top-0 h-screen flex flex-col items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{ translateY }}
          className="max-w-4xl mx-auto text-center mb-6 md:mb-14 px-4"
        >
          {titleComponent}
        </motion.div>

        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: "center top",
            boxShadow:
              "0 0 0 1px rgba(16,185,129,0.15), 0 24px 60px rgba(0,0,0,0.7), 0 0 80px rgba(16,185,129,0.08)",
          }}
          className="max-w-5xl mx-auto w-full px-3 md:px-4"
        >
          <div className="border border-emerald-500/20 rounded-xl md:rounded-[28px] overflow-hidden bg-black shadow-2xl">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
