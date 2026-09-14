import Link from "next/link";
import { CaseMediaBlock } from "@/components/CaseMediaBlock";
import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";
import { ScrollText } from "@/components/fx/ScrollText";
import { SplitText } from "@/components/fx/SplitText";
import { about } from "@/content/about";
import { caseStudies } from "@/content/cases";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        data-theme="light"
        className="relative bg-paper py-24 text-ink md:py-36"
      >
        <Marquee
          items={["Product Design", "Art Direction", "Strategy", "Interaction"]}
          className="border-y border-ink/10 py-5"
        />

        <div className="px-6 pt-24 md:px-10 md:pt-36">
          <div className="mx-auto max-w-[1600px]">
            <p className="mono mb-10 opacity-40">01 — Approach</p>
            <ScrollText
              text="I design narratives and strategy for interactive experiences and digital products — turning complex ecosystems into something people actually want to touch."
              className="max-w-5xl text-[clamp(1.6rem,4.4vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.04em]"
            />
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="relative bg-paper pb-24 text-ink md:pb-36"
      >
        <div className="px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
            <div>
              <p className="mono mb-6 opacity-40">02 — Selected work</p>
              <SplitText
                as="h2"
                text="Case studies"
                className="display-xl block text-[clamp(2.4rem,8vw,7rem)]"
              />
            </div>
            <Reveal delay={0.2}>
              <Link
                href="/work"
                className="mono link-underline hidden pb-3 md:block"
              >
                All projects →
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto max-w-[1600px] px-0">
          <WorkList studies={caseStudies} />
        </div>
      </section>

      <section
        data-theme="light"
        className="bg-paper px-6 pb-32 text-ink md:px-10 md:pb-44"
      >
        <div className="mx-auto max-w-[1600px]">
          <p className="mono mb-12 opacity-40">03 — Disciplines</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {about.disciplines.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="mono mb-6 block opacity-40">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-serif text-lg leading-[1.5] text-ink/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <CaseMediaBlock
              item={{
                type: "video",
                src: "/work/cupra/preview.mp4",
                poster: "/work/cupra/preview-poster.jpg",
                alt: "Cupra project preview video",
                caption: "Cupra — Preview",
                controls: true,
              }}
              theme="light"
            />
          </div>
        </div>
      </section>
    </>
  );
}
