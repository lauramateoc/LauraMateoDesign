"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { CaseMediaBlock } from "./CaseMediaBlock";
import { useCursor } from "./fx/CursorProvider";
import { Magnetic } from "./fx/Magnetic";
import { Reveal } from "./fx/Reveal";
import { ScrollText } from "./fx/ScrollText";
import { ShaderField } from "./fx/ShaderField";
import { SplitText } from "./fx/SplitText";
import type { CaseStudy } from "@/content/cases";

const themes = {
  dark: {
    page: "bg-ink text-paper",
    sub: "text-paper/55",
    body: "text-paper/75",
    chip: "border-paper/20",
    field: ["#050508", "#171226", "#c9a227"] as [string, string, string],
    data: "dark" as const,
  },
  light: {
    page: "bg-paper text-ink",
    sub: "text-ink/50",
    body: "text-ink/70",
    chip: "border-ink/20",
    field: ["#0a0a0c", "#1d1d22", "#4f46ff"] as [string, string, string],
    data: "light" as const,
  },
  recrem: {
    page: "bg-[#150a1c] text-paper",
    sub: "text-paper/60",
    body: "text-paper/80",
    chip: "border-paper/25",
    field: ["#0d0614", "#2c1040", "#db70ff"] as [string, string, string],
    data: "dark" as const,
  },
};

export function CaseStudyView({
  study,
  next,
}: {
  study: CaseStudy;
  next?: CaseStudy;
}) {
  const t = themes[study.theme];
  const heroRef = useRef<HTMLElement>(null);
  const { set, reset } = useCursor();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <article className={t.page}>
      {/* ---------- hero ---------- */}
      <section
        ref={heroRef}
        data-theme="dark"
        className="relative flex h-[38svh] min-h-[280px] max-h-[380px] flex-col justify-end overflow-hidden bg-ink px-6 pb-8 text-paper md:h-[42svh] md:max-h-[420px] md:px-10 md:pb-10"
      >
        <ShaderField colors={t.field} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />

        <motion.div style={{ y: heroY, opacity: heroFade }} className="relative">
          <div className="mono mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 opacity-60">
            <span>Case {study.number}</span>
            <span>{study.year}</span>
            <span>{study.client}</span>
          </div>

          <SplitText
            as="h1"
            text={study.shortTitle}
            className="display-xl block text-[clamp(2.2rem,8vw,6.5rem)]"
            stagger={0.035}
          />

          <p className="mt-3 max-w-xl font-serif text-base leading-[1.35] text-paper/70 md:text-lg">
            {study.tagline}
          </p>
        </motion.div>

        <div className="case-number pointer-events-none absolute -bottom-[0.14em] right-4 select-none text-[clamp(5rem,14vw,10rem)] text-paper/[0.07] md:right-10">
          {study.number}
        </div>
      </section>

      {/* ---------- intro ---------- */}
      <section
        data-theme={t.data}
        className="px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className={`mono mb-4 ${t.sub}`}>Role</p>
              <div className="mb-10 flex flex-wrap gap-2">
                {study.roles.map((role) => (
                  <span
                    key={role}
                    className={`mono rounded-full border px-3 py-1.5 ${t.chip}`}
                  >
                    {role}
                  </span>
                ))}
              </div>

              {study.details && (
                <>
                  <p className={`mono mb-4 ${t.sub}`}>Details</p>
                  <ul className="space-y-1">
                    {study.details.map((d) => (
                      <li key={d} className={`text-lg ${t.body}`}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </div>

          <div className="space-y-10">
            <ScrollText
              text={study.intro[0]}
              className="text-[clamp(1.3rem,3vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.035em]"
            />
            {study.intro.slice(1).map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 30)} delay={i * 0.06}>
                <p className={`font-serif text-xl leading-[1.55] ${t.body}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- media ---------- */}
      <section
        data-theme={t.data}
        className="px-6 pb-24 md:px-10 md:pb-36"
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 md:gap-28">
          {study.media.map((item, i) => (
            <CaseMediaBlock
              key={`${item.type}-${i}`}
              item={item}
              theme={study.theme}
              index={i}
            />
          ))}
        </div>
      </section>

      {study.footerNote && (
        <section data-theme={t.data} className="px-6 pb-24 md:px-10 md:pb-36">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className={`font-serif text-xl leading-[1.55] ${t.body}`}>
                {study.footerNote}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- next ---------- */}
      {next && (
        <section
          data-theme="dark"
          className="relative overflow-hidden bg-ink text-paper"
        >
          <Link
            href={`/work/${next.slug}`}
            onMouseEnter={() =>
              set({ variant: "media", preview: next.cover, label: "Next case" })
            }
            onMouseLeave={reset}
            className="group block px-6 py-24 md:px-10 md:py-36"
          >
            <div className="mx-auto max-w-[1600px]">
              <p className="mono mb-8 opacity-50">Next project — {next.number}</p>
              <Magnetic strength={0.12}>
                <h2 className="display-xl text-[clamp(2.6rem,11vw,10rem)] transition-opacity group-hover:opacity-70">
                  {next.shortTitle}
                </h2>
              </Magnetic>
              <p className="mono mt-8 opacity-50">{next.tagline}</p>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
