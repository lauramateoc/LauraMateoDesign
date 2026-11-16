export const site = {
  name: "Laura Mateo",
  title: "Laura Mateo / Product Designer / Art Director",
  description:
    "Product Designer / Art Director focused on narratives and strategy for Interactive Experiences and Digital Products.",
  role: "Interactive designer / Product design",
  email: "lmateoconesa@gmail.com",
  phone: "+34 692 567 120",
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
