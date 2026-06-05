import { getPageContent } from '@/lib/cms';
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactBooking from "@/components/contact/ContactBooking";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata = {
  title: "Contact",
  description:
    "Book a free discovery call with Remotage. No commitment required — let us show you how we can scale your business operations remotely.",
  alternates: { canonical: "/contact" },
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