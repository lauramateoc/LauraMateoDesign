import Link from "next/link";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";
import { ScrollText } from "@/components/fx/ScrollText";
import { ShaderField } from "@/components/fx/ShaderField";
import { SplitText } from "@/components/fx/SplitText";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata = {
  title: "About / Laura Mateo",
  description: about.intro,
};

const timeline = [
  { year: "2024 →", role: "Product Designer", place: "Orange Spain" },
  { year: "2023", role: "UX/UI & Visual Design", place: "Correos Express" },
  { year: "2023", role: "Creative Direction", place: "Frog Design / Cupra" },
  { year: "2022", role: "Concept & Interaction", place: "Independent" },
];

export default function AboutPage() {
  return (
    <>
      <section
        data-theme="dark"
        className="relative flex h-[38svh] min-h-[280px] max-h-[380px] flex-col justify-end overflow-hidden bg-ink px-6 pb-8 text-paper md:h-[42svh] md:max-h-[420px] md:px-10 md:pb-10"
      >
        <ShaderField colors={["#050508", "#1a1030", "#db70ff"]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
        <div className="relative">
          <p className="mono mb-8 opacity-50">About</p>
          <SplitText
            as="h1"
            text="Laura Mateo"
            className="display-xl block text-[clamp(3rem,13vw,12rem)]"
          />
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-paper px-6 py-24 text-ink md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1600px]">
          <ScrollText
            text={about.intro}
            className="max-w-5xl text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.15] tracking-[-0.04em]"
          />
        </div>
      </section>

      <Marquee
        items={["Narratives", "Strategy", "Interaction", "Systems"]}
        className="border-y border-ink/10 bg-paper py-5 text-ink"
      />

      <section
        data-theme="light"
        className="bg-paper px-6 py-24 text-ink md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1600px]">
          <p className="mono mb-12 opacity-40">Disciplines</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {about.disciplines.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="mono mb-6 block opacity-40">0{i + 1}</span>
                  <h2 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 font-serif text-lg leading-[1.5] text-ink/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mono mb-10 mt-28 opacity-40">Experience</p>
          <div className="border-t border-ink/15">
            {timeline.map((entry, i) => (
              <Reveal key={`${entry.year}-${entry.place}`} delay={i * 0.05}>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-b border-ink/10 py-6">
                  <span className="mono w-20 shrink-0 opacity-40">
                    {entry.year}
                  </span>
                  <span className="flex-1 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                    {entry.role}
                  </span>
                  <span className="mono opacity-50">{entry.place}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="mono link-underline mt-20 inline-block"
            >
              {site.email} →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
