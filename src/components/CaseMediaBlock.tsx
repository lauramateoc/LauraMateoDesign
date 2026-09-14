"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useCursor } from "./fx/CursorProvider";
import type { CaseMedia } from "@/content/cases";

type Props = {
  item: CaseMedia;
  theme?: "dark" | "light" | "recrem";
  index?: number;
};

export function CaseMediaBlock({ item, theme = "light", index = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { set, reset } = useCursor();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = index % 2 === 0 ? 40 : -40;
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);
  const captionClass = theme === "light" ? "text-ink/45" : "text-white/45";

  const clip = reduce
    ? {}
    : {
        initial: { clipPath: "inset(14% 8% 14% 8% round 4px)" },
        whileInView: { clipPath: "inset(0% 0% 0% 0% round 4px)" },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <figure ref={ref} className="w-full">
      <motion.div
        {...clip}
        style={reduce ? undefined : { y }}
        className="overflow-hidden rounded-sm bg-black/5"
      >
        {item.type === "video" ? (
          <video
            className="h-auto w-full"
            autoPlay={!item.controls}
            loop={!item.controls}
            muted={!item.controls}
            controls={item.controls}
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={item.alt}
            onMouseEnter={
              item.controls
                ? () => set({ variant: "hover", label: "Play" })
                : undefined
            }
            onMouseLeave={item.controls ? reset : undefined}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : item.type === "vimeo" ? (
          <div
            className="relative aspect-video w-full bg-black"
            onMouseEnter={() => set({ variant: "hover", label: "Play" })}
            onMouseLeave={reset}
          >
            <iframe
              src={`https://player.vimeo.com/video/${item.id}?title=0&byline=0&portrait=0`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={item.alt}
            />
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={2400}
            height={1600}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 1400px"
          />
        )}
      </motion.div>

      {item.caption && (
        <figcaption className={`mono mt-4 ${captionClass}`}>
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
