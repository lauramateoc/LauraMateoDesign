import { ContactView } from "@/components/ContactView";
import { site } from "@/content/site";

export const metadata = {
  title: "Contact — Laura Mateo",
  description: `Contact Laura Mateo — ${site.email}`,
};

export default function ContactPage() {
  return <ContactView />;
}
