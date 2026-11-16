"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { LocalTime } from "./fx/LocalTime";
import { ShaderField } from "./fx/ShaderField";
import { SplitText } from "./fx/SplitText";
import { caseStudies } from "@/content/cases";
import { site } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative flex h-[100svh] flex-col justify-between overflow-hidden bg-ink px-6 pb-8 pt-28 text-paper md:px-10 md:pb-10 md:pt-32"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <ShaderField colors={["#050508", "#131a36", "#5b4bff"]} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/90" />

      <motion.div style={{ y, opacity }} className="relative flex flex-1 flex-col justify-between">
        <div className="mono flex items-start justify-between opacity-60">
          <span className="max-w-[16ch]">
            Interactive experiences
            <br />& digital products
          </span>
          <span className="hidden text-right md:block">
            Madrid, ES
            <br />
            <LocalTime />
          </span>
        </div>

        <div key={pathname} className="my-auto">
          <SplitText
            as="h1"
            text="Laura Mateo"
            className="display-xl block text-[clamp(3.2rem,15vw,15rem)]"
            stagger={0.035}
            delay={0.1}
            trigger="mount"
          />

          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
            <motion.p
              key={`${pathname}-line`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl font-serif text-xl leading-[1.35] text-paper/80 md:text-2xl"
            >
              {site.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mono flex items-center gap-3 opacity-60"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Available for 2026
            </motion.div>
          </div>
        </div>

        <div className="mono flex items-end justify-between opacity-60">
          <span className="flex items-center gap-2">
            Scroll
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </span>
          <span>
            Portfolio — {String(caseStudies.length).padStart(2, "0")} Projects
          </span>
        </div>
      </motion.div>
    </section>
  );
}
