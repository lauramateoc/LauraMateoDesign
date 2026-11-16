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
    <>
      <section
        data-theme="dark"
        className="relative flex h-[38svh] min-h-[280px] max-h-[380px] flex-col justify-end overflow-hidden bg-ink px-6 pb-8 text-paper md:h-[42svh] md:max-h-[420px] md:px-10 md:pb-10"
      >
        <ShaderField colors={["#050508", "#082f36", "#22d3ee"]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

        <div className="relative">
          <p className="mono mb-8 opacity-50">Contact</p>
          <SplitText
            as="h1"
            text="Let's talk"
            className="display-xl block text-[clamp(3rem,13vw,12rem)]"
          />
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-paper px-6 py-24 text-ink md:px-10 md:py-36"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-2">
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
              Based in Madrid, working with teams everywhere. Open to product
              design, art direction and interactive experiments.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
