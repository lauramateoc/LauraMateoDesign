import { WorkList } from "@/components/WorkList";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { caseStudies } from "@/content/cases";

export const metadata = {
  title: "Work — Laura Mateo",
  description: "Selected case studies by Laura Mateo.",
};

export default function WorkPage() {
  return (
    <section data-theme="light" className="min-h-screen bg-paper text-ink">
      <div className="px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <p className="mono mb-8 opacity-40">Index — 05 Projects</p>
          <SplitText
            as="h1"
            text="Selected work"
            className="display-xl block text-[clamp(2.8rem,12vw,11rem)]"
          />
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl font-serif text-xl leading-[1.45] text-ink/60 md:text-2xl">
              Interactive experiences, digital products and brand systems built
              with studios and in-house teams across Europe.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px]">
        <WorkList studies={caseStudies} />
      </div>

      <Marquee
        items={["Cupra", "Correos Express", "Orange", "Hyperloop TT", "RECREM"]}
        className="py-16 opacity-10 md:py-24"
        reverse
      />
    </section>
  );
}
