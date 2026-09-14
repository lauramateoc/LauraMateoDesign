"use client";

import Link from "next/link";
import { LocalTime } from "./fx/LocalTime";
import { Magnetic } from "./fx/Magnetic";
import { useCursor } from "./fx/CursorProvider";
import { Marquee } from "./fx/Marquee";
import { site } from "@/content/site";

export function SiteFooter() {
  const { set, reset } = useCursor();

  return (
    <footer
      data-theme="dark"
      className="relative overflow-hidden bg-ink px-6 pb-8 pt-20 text-paper md:px-10 md:pb-10 md:pt-28"
    >
      <Marquee
        items={["Available for work", "Let's build something", "Say hello"]}
        className="mb-16 opacity-15 md:mb-24"
      />

      <div className="mx-auto max-w-[1600px]">
        <p className="mono mb-6 opacity-40">Get in touch</p>
        <Magnetic strength={0.15}>
          <a
            href={`mailto:${site.email}`}
            onMouseEnter={() => set({ variant: "hover", label: "Email" })}
            onMouseLeave={reset}
            className="block break-all text-[clamp(1.6rem,6vw,5rem)] font-medium tracking-[-0.05em] transition-opacity hover:opacity-60"
          >
            {site.email}
          </a>
        </Magnetic>

        <div className="mono mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 opacity-50 md:mt-24 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Laura Mateo</span>
          <LocalTime />
          <div className="flex gap-6">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => set({ variant: "hover", label: item.label })}
                onMouseLeave={reset}
                className="link-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
