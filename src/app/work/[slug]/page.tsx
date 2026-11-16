import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { caseStudies, getCaseBySlug, getNextCase } from "@/content/cases";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.title} / Laura Mateo`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  return <CaseStudyView study={study} next={getNextCase(slug)} />;
}
