import { WorkList } from "@/components/WorkList";
import { Marquee } from "@/components/fx/Marquee";
import { ShaderField } from "@/components/fx/ShaderField";
import { SplitText } from "@/components/fx/SplitText";
import { caseStudies } from "@/content/cases";

export const metadata = {
  title: "Work — Laura Mateo",
  description: "Selected case studies by Laura Mateo.",
};

export default function WorkPage() {
  return (
    <>
      <section
        data-theme="dark"
        className="relative flex h-[38svh] min-h-[280px] max-h-[380px] flex-col justify-end overflow-hidden bg-ink px-6 pb-8 text-paper md:h-[42svh] md:max-h-[420px] md:px-10 md:pb-10"
      >
        <ShaderField colors={["#050508", "#171b38", "#5b6cff"]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

        <div className="relative">
          <p className="mono mb-8 opacity-50">
            Index — {String(caseStudies.length).padStart(2, "0")} Projects
          </p>
          <SplitText
            as="h1"
            text="Selected work"
            className="display-xl block text-[clamp(3rem,13vw,12rem)]"
          />
        </div>
      </section>

      <section data-theme="light" className="min-h-screen bg-paper text-ink">
        <div className="px-6 py-16 md:px-10 md:py-24">
          <p className="mx-auto max-w-[1600px] font-serif text-xl leading-[1.45] text-ink/60 md:text-2xl">
            Interactive experiences, digital products and brand systems built
            with studios and in-house teams across Europe.
          </p>
        </div>

        <div className="mx-auto max-w-[1600px]">
          <WorkList studies={caseStudies} />
        </div>

        <Marquee
          items={caseStudies.map((study) => study.shortTitle)}
          className="py-16 opacity-10 md:py-24"
          reverse
        />
      </section>
    </>
  );
}
