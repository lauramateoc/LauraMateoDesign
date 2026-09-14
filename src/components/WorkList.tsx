"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCursor } from "./fx/CursorProvider";
import type { CaseStudy } from "@/content/cases";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Characters roll up and are replaced by an accent-coloured copy, staggered. */
function RollingText({
  text,
  hovered,
  accent,
  className = "",
}: {
  text: string;
  hovered: boolean;
  accent: string;
  className?: string;
}) {
  const chars = [...text];

  const layer = (color?: string, out = false) => (
    <span
      className="flex whitespace-pre"
      style={color ? { color } : undefined}
      aria-hidden={out ? undefined : true}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={false}
          animate={{ y: hovered ? (out ? "-105%" : "0%") : out ? "0%" : "105%" }}
          transition={{ duration: 0.55, delay: i * 0.018, ease: EASE }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {layer(undefined, true)}
      <span className="absolute inset-0">{layer(accent)}</span>
    </span>
  );
}

function WorkRow({ study, index }: { study: CaseStudy; index: number }) {
  const { set, reset } = useCursor();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={`/work/${study.slug}`}
        onMouseEnter={() => {
          setHovered(true);
          set({ variant: "hover", label: "View" });
        }}
        onMouseLeave={() => {
          setHovered(false);
          reset();
        }}
        className="group relative block border-t border-current/10"
      >
        {/* accent rule drawing across the top edge */}
        <motion.span
          aria-hidden
          className="absolute top-0 left-0 z-10 h-[2px] origin-left"
          style={{ background: study.accent, width: "100%" }}
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        />

        {/* accent wash sweeping in from the left */}
        <motion.span
          aria-hidden
          className="absolute inset-0"
          style={{ background: study.accent }}
          initial={false}
          animate={{
            clipPath: hovered
              ? "inset(0% 0% 0% 0%)"
              : "inset(0% 100% 0% 0%)",
            opacity: hovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.65, ease: EASE }}
        />

        <div className="relative flex items-center gap-5 px-6 py-7 md:gap-10 md:px-10 md:py-10">
          <motion.span
            className="mono w-10 shrink-0"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0.4,
              color: hovered ? study.accent : "currentColor",
            }}
            transition={{ duration: 0.4 }}
          >
            {study.number}
          </motion.span>

          <motion.div
            className="min-w-0 flex-1"
            initial={false}
            animate={{ x: hovered ? 22 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <RollingText
              text={study.shortTitle}
              hovered={hovered}
              accent={study.accent}
              className="text-[clamp(1.6rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.045em]"
            />
          </motion.div>

          {/* inline thumbnail — always visible on wide screens */}
          <div className="hidden h-20 w-36 shrink-0 overflow-hidden rounded-sm md:block lg:h-24 lg:w-44">
            <motion.div
              className="h-full w-full"
              initial={false}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <motion.span
            className="mono hidden max-w-[22ch] text-right lg:block"
            initial={false}
            animate={{ opacity: hovered ? 0.9 : 0.45, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {study.tagline}
          </motion.span>

          <span className="mono w-12 shrink-0 text-right opacity-40">
            {study.year}
          </span>

          {/* arrow disc */}
          <motion.span
            aria-hidden
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg md:flex"
            style={{ background: study.accent, color: "#fff" }}
            initial={false}
            animate={{
              scale: hovered ? 1 : 0.2,
              opacity: hovered ? 1 : 0,
              rotate: hovered ? 0 : -45,
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            →
          </motion.span>
        </div>

        {/* full-width image on narrow screens */}
        <div className="px-6 pb-8 md:hidden">
          <div className="h-44 w-full overflow-hidden rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function WorkList({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="border-b border-current/10">
      {studies.map((study, index) => (
        <WorkRow key={study.slug} study={study} index={index} />
      ))}
    </div>
  );
}
