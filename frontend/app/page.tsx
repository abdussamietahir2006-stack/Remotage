import { getPageContent } from '@/lib/cms';
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhoWeHelp from "@/components/home/WhoWeHelp";
import Process from "@/components/home/Process";
import Clients from "@/components/home/Clients";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export const metadata = {
  title: "Remotage — Your Remote Advantage",
  description:
    "Scale faster with expert-led virtual assistant services, automation, and remote execution. Lead generation, customer support, bookkeeping, marketing, web development and more — serving startups and SMBs worldwide.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const cms = await getPageContent('home');
  const content = (cms?.content as Record<string, string>) ?? {};
  const images  = (cms?.images  as Record<string, string>) ?? {};

  return (
    <main className="pt-24">
      <Hero content={content} images={images} />
      <ServicesPreview content={content} />
      <WhoWeHelp images={images} />
      <Process />
      <Clients content={content} images={images} />
      <Testimonials content={content} images={images} />
      <Newsletter content={content} />
    </main>
  );
}