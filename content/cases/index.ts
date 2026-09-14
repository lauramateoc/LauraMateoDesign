export type CaseMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; poster?: string; alt: string; caption?: string }
  | { type: "vimeo"; id: string; alt: string; caption?: string };

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  client: string;
  year: string;
  tagline: string;
  cover: string;
  accent: string;
  theme: "dark" | "light" | "recrem";
  roles: string[];
  details?: string[];
  intro: string[];
  media: CaseMedia[];
  footerNote?: string;
  nextSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cupra",
    number: "01",
    title: "Cupra / SEAT Digital Platforms",
    shortTitle: "Cupra",
    client: "Cupra / Seat Digital Platforms",
    year: "2023",
    tagline: "Sculpting a performance brand across its digital ecosystem",
    cover: "/work/cupra/configurator-1.png",
    accent: "#c9a227",
    theme: "dark",
    roles: [
      "Concept",
      "Creative Direction",
      "UX/UI Design",
      "Visual Design",
    ],
    details: ["Frog Design", "3 people team", "1 year duration"],
    intro: [
      "Initially, our approach involved aligning with digital platforms, conducting field interviews, benchmarking exercises, and conducting a comprehensive brand audit. These efforts were aimed at gaining a deeper understanding of the business landscape and identifying opportunities for innovation.",
      "The overarching goal of the project was to reimagine and ideate strategic touchpoints within the brand's digital journey. This entailed identifying areas for enhancement in the current digital ecosystem, conceptualizing ways to elevate the brand experience, and creating cohesive narratives across touchpoints.",
      "Beyond the pursuit of pixel-perfection, this project represented an opportunity to push boundaries, experiment with new ideas, and digitally sculpt the brand's identity to align with its aspiration of being perceived as innovative, youthful, and forward-thinking.",
    ],
    media: [
      {
        type: "video",
        src: "/work/cupra/hero.mp4",
        poster: "/work/cupra/hero-poster.jpg",
        alt: "Cupra digital platform motion preview",
      },
      {
        type: "image",
        src: "/work/cupra/configurator-1.png",
        alt: "Cupra Tavascan configurator interface",
      },
      {
        type: "image",
        src: "/work/cupra/configurator-2.png",
        alt: "Cupra digital platform UI exploration",
      },
      {
        type: "image",
        src: "/work/cupra/configurator-wide.png",
        alt: "Cupra configurator wide layout",
      },
      {
        type: "vimeo",
        id: "1802628576",
        alt: "Cupra project preview video",
        caption: "Preview",
      },
      {
        type: "image",
        src: "/work/cupra/studies-1.png",
        alt: "Seat Configurator exploration",
        caption: "Seat Configurator exploration",
      },
      {
        type: "image",
        src: "/work/cupra/studies-2.png",
        alt: "Cupra E-configurator",
        caption: "Cupra E-configurator",
      },
      {
        type: "image",
        src: "/work/cupra/studies-3.png",
        alt: "Cupra City Garage",
        caption: "Cupra City Garage",
      },
    ],
    footerNote:
      "Throughout the year-long collaboration, I was deeply involved in shaping various digital products within the web ecosystem, including the Cupra Car Configurator, Seat Car Configurator, the Car World, Cupra City Garage, among others. — If you want to know more info, please contact me :) *These projects are confidential.",
    nextSlug: "correos-express",
  },
  {
    slug: "correos-express",
    number: "02",
    title: "Correos Express",
    shortTitle: "Correos",
    client: "Correos Express",
    year: "2023",
    tagline: "Bridging two brands with one design system",
    cover: "/work/correos/hero.png",
    accent: "#0057b8",
    theme: "light",
    roles: ["Visual Design", "UX/UI Design"],
    intro: [
      "The primary objective of this project was to seamlessly integrate the Correos design system into the Correos Express sub-brand. Our initial endeavor involved conducting a comprehensive assessment of their website, identifying key areas for improvement, and mapping user journeys that would better serve their audience.",
      "In my role, I undertook the task of restructuring the website architecture, delineating various user journeys and flows, and orchestrating a complete redesign of the website in alignment with the new identity. Additionally, I meticulously adapted visual components to ensure consistency across the ecosystem.",
      "It's imperative to underscore the pivotal role of soft skills in this endeavor. Effective communication with the client, coupled with a keen understanding of their requirements and constraints, enabled me to serve as a conduit between two brands with distinct needs.",
    ],
    media: [
      {
        type: "image",
        src: "/work/correos/hero.png",
        alt: "Correos Express web redesign overview",
        caption: "Web Redesign of Correos Express",
      },
      {
        type: "image",
        src: "/work/correos/detail-1.png",
        alt: "Correos Express interface detail",
      },
      {
        type: "image",
        src: "/work/correos/detail-2.png",
        alt: "Correos Express website screens",
      },
    ],
    nextSlug: "orange",
  },
  {
    slug: "orange",
    number: "03",
    title: "Orange Spain",
    shortTitle: "Orange",
    client: "Orange Spain",
    year: "2024",
    tagline: "A Design Language System built to scale",
    cover: "/work/orange/dls-1.png",
    accent: "#ff7900",
    theme: "light",
    roles: ["Visual Design", "UX/UI Design"],
    intro: [
      "My tenure at Orange is distinguished by close and efficient collaboration with the design and development team in Spain. We meticulously formalize business requirements and breathe life into innovative concepts through captivating and functional designs, spanning from landing pages to creativities while contributing to the creation of the DLS.",
      "My role transcends mere design execution; I also assume a strategic position by proposing enhancements to the team's methodologies and workflows. With an agile and excellence-driven approach, I continuously organized documentation repositories and cultivated a stimulating work environment.",
      "My commitment to design excellence extends beyond task execution. By closely collaborating with the Orange Team, I aim not only to meet but exceed expectations, bringing a unique blend of creativity, expertise and strategic vision to every project.",
    ],
    media: [
      {
        type: "image",
        src: "/work/orange/dls-1.png",
        alt: "Orange Design Language System overview",
      },
      {
        type: "image",
        src: "/work/orange/dls-2.png",
        alt: "Orange DLS components",
      },
      {
        type: "image",
        src: "/work/orange/dls-3.png",
        alt: "Orange DLS documentation",
      },
    ],
    footerNote:
      "One of my pivotal responsibilities lies in the ongoing improvement of the Design Language System, a project aimed at consolidating and harmonizing design elements across all our endeavors. The goal is to create a robust and flexible system that serves as a solid foundation for the design and development of various brands.",
    nextSlug: "hyperloop",
  },
  {
    slug: "hyperloop",
    number: "04",
    title: "Hyperloop TT — Human Sequence",
    shortTitle: "Hyperloop TT",
    client: "Hyperloop TT",
    year: "2022",
    tagline: "Reading the machine as a body, the body as a machine",
    cover: "/work/hyperloop/plan.png",
    accent: "#0284c7",
    theme: "light",
    roles: [
      "Concept Design",
      "Creative Direction",
      "User experience",
    ],
    intro: [
      "This project is a proposal for the new Hyperloop TT, called \"Human Sequence\". This concept arises from the premise of generating a new travel experience, without falling into futuristic and minimalist clichés, but rather fostering tangible, human-centered interactions.",
      "After formal research, we established a new set of language and concept pillars for the project, starting from the human body, adapting it and taking care of it, holding it, embracing it. To read the machine as a body and the body as a machine.",
      "Soft forms, subtle transparencies and deformable masses, materialities that mould to the body without being predefined. Continuing to maintain this idea of skin, a shell that holds and envelops. Large seats that embrace the users and envelop them during travel.",
    ],
    media: [
      {
        type: "image",
        src: "/work/hyperloop/plan.png",
        alt: "Hyperloop TT cabin technical plan view",
      },
      {
        type: "image",
        src: "/work/hyperloop/render.jpg",
        alt: "Hyperloop TT Human Sequence interior render",
      },
      {
        type: "image",
        src: "/work/hyperloop/detail-1.jpg",
        alt: "Hyperloop TT concept detail",
      },
      {
        type: "image",
        src: "/work/hyperloop/detail-2.png",
        alt: "Hyperloop TT seating concept",
      },
      {
        type: "image",
        src: "/work/hyperloop/detail-3.png",
        alt: "Hyperloop TT interior visualization",
      },
    ],
    footerNote:
      "The concept of fetus is something that from the beginning has been the emblem of this project. The fetus reminds us of a bubble — it evokes the connection with the mother, a sense of protection and welcome.",
    nextSlug: "recrem",
  },
  {
    slug: "recrem",
    number: "05",
    title: "RECREM — Metadreams",
    shortTitle: "RECREM",
    client: "RECREM (Fictional project)",
    year: "2022",
    tagline: "An access point to the human metaverse of dreams",
    cover: "/work/recrem/hero.png",
    accent: "#db70ff",
    theme: "recrem",
    roles: [
      "Concept",
      "Creative Direction",
      "UX/UI Design",
      "Interaction Design",
    ],
    intro: [
      "This project consists of an access to the human metaverse. From an analog product connected to an app we allow the user to dive into the world of dreams, generating a community with infinite possibilities.",
      "This experimental prototype allows users to discover environmental settings that will help them start their dream experience. No personal settings will be the same as another user's, allowing for a fully personalized experience.",
      "From here, the app (connected to the product) allows the user in their awake state to store the dream in voice recording format. These recordings are transformed into hashtags and a piece of art from an AI, thus being able to share it in the community.",
    ],
    media: [
      {
        type: "image",
        src: "/work/recrem/hero.png",
        alt: "RECREM app screens — metadreams",
        caption: "RECREM — metadreams",
      },
      {
        type: "image",
        src: "/work/recrem/detail-1.jpg",
        alt: "RECREM product and app ecosystem",
      },
      {
        type: "image",
        src: "/work/recrem/detail-2.png",
        alt: "RECREM dream art generation screen",
      },
      {
        type: "image",
        src: "/work/recrem/detail-3.jpg",
        alt: "RECREM community interface",
      },
      {
        type: "image",
        src: "/work/recrem/detail-4.png",
        alt: "RECREM app flow screens",
      },
    ],
    nextSlug: "cupra",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy | undefined {
  const current = getCaseBySlug(slug);
  if (!current?.nextSlug) return undefined;
  return getCaseBySlug(current.nextSlug);
}
