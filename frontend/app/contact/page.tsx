import { getPageContent } from '@/lib/cms';
import ContactHero from "@/sections/contact/ContactHero";
import ContactForm from "@/sections/contact/ContactForm";
import ContactBooking from "@/sections/contact/ContactBooking";
import ContactFAQ from "@/sections/contact/ContactFAQ";

export const metadata = {
  title: "Contact | Remotage",
  description: "Get in touch with Remotage. Book a free discovery call or send us a message.",
};

export default async function ContactPage() {
  const cms = await getPageContent('contact');
  const content = (cms?.content as Record<string, string>) ?? {};

  return (
    <main>
      <ContactHero content={content} />
      <ContactForm content={content} />
      <ContactBooking />
      <ContactFAQ content={content} />
    </main>
  );
}