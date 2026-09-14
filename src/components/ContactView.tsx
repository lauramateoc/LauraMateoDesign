"use client";

import { Magnetic } from "./fx/Magnetic";
import { Reveal } from "./fx/Reveal";
import { ShaderField } from "./fx/ShaderField";
import { SplitText } from "./fx/SplitText";
import { useCursor } from "./fx/CursorProvider";
import { site } from "@/content/site";

export function ContactView() {
  const { set, reset } = useCursor();

  return (
    <section
      data-theme="dark"
      className="relative flex min-h-[72svh] flex-col justify-center overflow-hidden bg-ink px-6 py-32 text-paper md:px-10 md:py-40"
    >
      <ShaderField colors={["#050508", "#0f2030", "#22d3ee"]} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink/90" />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="mono mb-8 opacity-50">Contact</p>

        <SplitText
          as="h1"
          text="Let's talk"
          className="display-xl block text-[clamp(3rem,14vw,13rem)]"
        />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2">
          <Reveal>
            <p className="mono mb-4 opacity-40">Email</p>
            <Magnetic strength={0.12}>
              <a
                href={`mailto:${site.email}`}
                onMouseEnter={() => set({ variant: "hover", label: "Copy" })}
                onMouseLeave={reset}
                className="block break-all text-2xl font-medium tracking-[-0.03em] transition-opacity hover:opacity-60 md:text-4xl"
              >
                {site.email}
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mono mb-4 opacity-40">Phone</p>
            <Magnetic strength={0.12}>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                onMouseEnter={() => set({ variant: "hover", label: "Call" })}
                onMouseLeave={reset}
                className="block text-2xl font-medium tracking-[-0.03em] transition-opacity hover:opacity-60 md:text-4xl"
              >
                {site.phone}
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mono mt-24 max-w-md leading-[1.9] opacity-50">
            Based in Madrid — working with teams everywhere. Open to product
            design, art direction and interactive experiments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
