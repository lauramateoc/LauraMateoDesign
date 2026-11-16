export type CaseMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: string;
      caption?: string;
      controls?: boolean;
    }
  | { type: "vimeo"; id: string; alt: string; caption?: string }
  | { type: "text"; eyebrow?: string; heading: string; body: string[] };

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
    slug: "seat-code",
    number: "01",
    title: "SEAT CODE — Talent Platform",
    shortTitle: "SEAT CODE",
    client: "SEAT CODE",
    year: "2026",
    tagline: "Reimagining a platform for talent and growth",
    cover: "/work/seat-code/devices.jpg",
    accent: "#b8ff3c",
    theme: "dark",
    roles: [
      "Information Architecture",
      "UX/UI Design",
      "Content & Tone of Voice",
      "Branding & Identity",
    ],
    details: ["Frog Design", "10 weeks", "Webflow delivery"],
    intro: [
      "SEAT CODE, the digital hub of SEAT S.A., needed its website to catch up with who it had become — a place where talent, creativity and engineering shape the future of mobility. The existing site felt static and disconnected from the culture it was meant to showcase.",
      "Over a 10-week collaboration at frog, we redefined the role of the website itself: from an information container into a living, CMS-driven ecosystem for talent attraction, culture and growth. Research, benchmarking and stakeholder alignment fed a new information architecture, visual direction and Webflow build.",
      "A key challenge was balancing creative ambition with Webflow’s constraints. Embracing those limits led to a modular system that protects design quality while letting the client manage and scale the platform independently — including a custom hero video and a handover playbook.",
    ],
    media: [
      {
        type: "text",
        eyebrow: "Challenge",
        heading: "A site that no longer matched the company",
        body: [
          "SEAT CODE faced a gap between who they are and how they were perceived digitally. The organization was moving fast — innovation, talent, new products — while the website stayed static, outdated and disconnected from the industry around it.",
          "The work was not only a visual redesign. The website had to stop being a container for information and become a living ecosystem: one that attracts talent, shows the culture, and can scale as the team grows.",
        ],
      },
      {
        type: "image",
        src: "/work/seat-code/collage.jpg",
        alt: "SEAT CODE website composition with product, culture and impact sections",
      },
      {
        type: "text",
        eyebrow: "Approach",
        heading: "Ten weeks, from research to a CMS the team can run",
        body: [
          "We started with immersion: benchmark, research and stakeholder alignment, so the site could work as a tool for talent attraction and for the people already inside SEAT CODE.",
          "Those insights became an information architecture — as-is to to-be — that reorganized content into a structure people can actually navigate. In parallel we set the visual direction in Figma and built it directly in Webflow as a modular, CMS-driven system.",
          "The turning point was Webflow’s own constraints. Instead of fighting them, we designed a modular system that keeps the quality of the design while letting the client update and grow the site without a developer in the loop.",
        ],
      },
      {
        type: "image",
        src: "/work/seat-code/identity.jpg",
        alt: "SEAT CODE visual identity: logo, type, color and image use",
        caption: "Identity system",
      },
      {
        type: "image",
        src: "/work/seat-code/moodboard.jpg",
        alt: "SEAT CODE moodboard for the digital experience",
        caption: "Direction",
      },
      {
        type: "text",
        eyebrow: "Hero",
        heading: "A bold first impression",
        body: [
          "We designed a custom hero film as the first thing you meet. It is there to catch attention and carry the feeling of SEAT CODE — storytelling through motion, not a static banner.",
          "The same system then holds up on a laptop, a tablet and a phone, so the story stays intact wherever someone lands.",
        ],
      },
      {
        type: "image",
        src: "/work/seat-code/laptop.jpg",
        alt: "SEAT CODE homepage on a laptop",
      },
      {
        type: "image",
        src: "/work/seat-code/phones.jpg",
        alt: "SEAT CODE mobile screens",
        caption: "Mobile",
      },
      {
        type: "image",
        src: "/work/seat-code/tablet.jpg",
        alt: "SEAT CODE project stories on a tablet",
        caption: "Project stories",
      },
      {
        type: "text",
        eyebrow: "Outcome",
        heading: "A platform that can keep changing",
        body: [
          "The site is no longer a fixed brochure. Content, projects and people can move through it, and the brand reads as modern and specific.",
          "It positions SEAT CODE as an innovative place to work, makes the culture and the work easier to understand, and lets internal teams publish and grow the platform on their own.",
        ],
      },
      {
        type: "text",
        eyebrow: "Handover",
        heading: "Designing beyond delivery",
        body: [
          "With the site, we wrote a playbook for how to use and manage Webflow: how to update content, and how to adapt pages as the organization changes.",
          "The playbook is the part that lasts. SEAT CODE can build on the work without waiting for us — not only a finished website, but a team able to shape it over time.",
        ],
      },
    ],
    footerNote:
      "The result is a dynamic, future-ready platform that reflects SEAT CODE’s identity, strengthens talent attraction, and enables internal teams to evolve content on their own. *Confidential — frog / Capgemini Invent.",
    nextSlug: "cupra-hux",
  },
  {
    slug: "cupra-hux",
    number: "02",
    title: "Cupra HUX — Driven by Instinct",
    shortTitle: "Cupra HUX",
    client: "Cupra",
    year: "2025",
    tagline: "A future experience vision beyond the vehicle",
    cover: "/work/cupra-hux/corridor.jpg",
    accent: "#c45c26",
    theme: "dark",
    roles: [
      "Experience Design",
      "Design Research",
      "Product Strategy",
      "Product Conceptualization",
    ],
    details: ["Frog Design", "Core + extended team", "07/2024 – 12/2025"],
    intro: [
      "Following the successful HUX collaboration in 2023, Cupra returned to frog with a clear ambition: push experience design further without losing the brand’s instinctive DNA. The brief was not to redesign the car, but to reimagine the role it plays in people’s lives.",
      "Through immersion, stakeholder and user research, workshops and co-creation, we translated insights into personas, user stories and a shared experience vision — then made that complex future ecosystem tangible through storyboards and a bold comic narrative.",
      "The comic became a strategic asset for Cupra: aligning teams, capturing the soul of the brand, and enabling experience-led innovation across markets. Over 160 frames, 1,000+ AI assets and 60+ stakeholders shaped a vision where emotion, technology and performance act as one.",
    ],
    media: [
      {
        type: "text",
        eyebrow: "Challenge",
        heading: "Beyond the car, without losing the brand",
        body: [
          "After the HUX collaboration in 2023, Cupra came back with trust and a sharper ambition: push experience design further, and keep the clarity, boldness and instinct that define the brand.",
          "Mobility was changing, and isolated features were no longer enough. Cupra needed a future experience that could scale across markets, technologies and moments — not a redesigned car, but a new role for the car in people’s lives.",
        ],
      },
      {
        type: "image",
        src: "/work/cupra-hux/workshop.jpg",
        alt: "Workshop with the Cupra team mapping future experience stories",
        caption: "Co-creation with Cupra",
      },
      {
        type: "text",
        eyebrow: "Approach",
        heading: "Research, then a story people can hold",
        body: [
          "We worked beside Cupra: immersion and stakeholder interviews first, then user interviews and workshops to find real needs and moments worth designing for. Those became personas and user stories the teams could share.",
          "From there, collaborative workshops shaped and tested the vision. The concepts landed as storyboards and a comic, so a complex ecosystem could be read, passed around and scaled inside the company.",
        ],
      },
      {
        type: "image",
        src: "/work/cupra-hux/storyboard-layers.jpg",
        alt: "Layered storyboard from sketch to finished comic frames",
        caption: "From sketch to frame",
      },
      {
        type: "text",
        eyebrow: "Research",
        heading: "An international read on the driving experience",
        body: [
          "The vision sits on fieldwork across the UK, Germany and Spain.",
          "3 stakeholder interviews. 23 user diaries. 16 workshops with users.",
        ],
      },
      {
        type: "image",
        src: "/work/cupra-hux/personas.jpg",
        alt: "Grid of Cupra HUX persona scenes and characters",
        caption: "Personas",
      },
      {
        type: "text",
        eyebrow: "Immersion",
        heading: "Characters refined until they felt specific",
        body: [
          "We built the characters with AI tools, then reworked them every day until the people, the cars and the places felt like one world — not a generic future.",
          "Over five days with the client we traced the paths those characters would take, and locked the concepts we would actually draw.",
        ],
      },
      {
        type: "image",
        src: "/work/cupra-hux/stories.jpg",
        alt: "Cupra HUX user stories as maps and comic sequences",
        caption: "User stories",
      },
      {
        type: "text",
        eyebrow: "Visual process",
        heading: "Prompt, direction, then the interface",
        body: [
          "Each frame followed the same path. First a prompt from a reference image. Then the picture was pushed in Photoshop until the light and the world matched the story. Last, the interfaces were drawn in Figma and placed into the scene.",
        ],
      },
      {
        type: "image",
        src: "/work/cupra-hux/interfaces.png",
        alt: "Cupra HUX interface system across phone, car and notifications",
        caption: "Interface system",
      },
      {
        type: "image",
        src: "/work/cupra-hux/frame-03.png",
        alt: "Cupra HUX frame with the in-car interface added",
        caption: "3 — Interface",
      },
      {
        type: "image",
        src: "/work/cupra-hux/comic-book.jpg",
        alt: "Printed Cupra HUX book, Driven by Instinct, open on the comic",
        caption: "The comic",
      },
      {
        type: "image",
        src: "/work/cupra-hux/comic-page.jpg",
        alt: "A Cupra HUX comic page of a dawn departure in Barcelona",
        caption: "A page from the story",
      },
      {
        type: "text",
        eyebrow: "Outcome",
        heading: "Innovation and emotion, told as one journey",
        body: [
          "We designed and tested the interactions for a future vehicle and for the wider Cupra system, keeping the experience precise enough to feel satisfying and open enough to keep evolving.",
          "The vision joins Cupra’s focus on innovation and technology with human emotion. Two detailed user stories carry that soul, and the comics follow five people through their time with the future car.",
          "It was presented to the Board. The comic is now a strategic asset — something teams align around, not a deck that gets filed.",
        ],
      },
      {
        type: "text",
        eyebrow: "In numbers",
        heading: "What the work left behind",
        body: [
          "160+ frames, turning a complex future into something you can point at.",
          "1,000+ AI prompts and assets, used to explore fast and then edit hard.",
          "60+ people at Cupra, across teams, so the vision had shared owners.",
          "7 stories, 38 pages, across the US, Europe and fleets.",
        ],
      },
      {
        type: "text",
        eyebrow: "Cupra",
        heading: "“The comic has become a strategic asset.”",
        body: [
          "“What really stood out was the team’s involvement and the way we worked together. The outcome goes beyond a deliverable — the comic has become a strategic asset for Cupra.”",
          "Pablo de Rivas, Cross Product Strategy & Customer Requirements Manager, Cupra.",
        ],
      },
    ],
    footerNote:
      "A holistic future experience vision merging innovation & tech with human emotion — presented to the Board and adopted as a strategic driver across Cupra. *Confidential — frog / Capgemini Invent.",
    nextSlug: "cupra",
  },
  {
    slug: "cupra",
    number: "03",
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
        type: "video",
        src: "/work/cupra/preview.mp4",
        poster: "/work/cupra/preview-poster.jpg",
        alt: "Cupra project preview video",
        caption: "Preview",
        controls: true,
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
    number: "04",
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
    number: "05",
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
    number: "06",
    title: "Hyperloop TT — Human Sequence",
    shortTitle: "Hyperloop TT",
    client: "Hyperloop TT",
    year: "2022",
    tagline: "Reading the machine as a body, the body as a machine",
    cover: "/work/hyperloop/detail-3.png",
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
    number: "07",
    title: "RECREM — Metadreams",
    shortTitle: "RECREM",
    client: "RECREM (Fictional project)",
    year: "2022",
    tagline: "An access point to the human metaverse of dreams",
    cover: "/work/recrem/detail-1.jpg",
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
    nextSlug: "seat-code",
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
