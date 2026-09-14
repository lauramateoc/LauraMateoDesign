"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type CaseNumberProps = {
  number: string;
  theme?: "dark" | "light" | "recrem";
};

const themeClasses = {
  dark: "text-white/[0.06]",
  light: "text-ink/[0.05]",
  recrem: "text-white/[0.12]",
};

export function CaseNumber({ number, theme = "light" }: CaseNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className={`case-number absolute -right-2 bottom-0 select-none text-[clamp(8rem,28vw,22rem)] leading-none md:-right-6 ${themeClasses[theme]}`}
        aria-hidden
      >
        {number}
      </motion.div>
    </div>
  );
}
