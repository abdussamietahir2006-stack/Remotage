import { getPageContent } from '@/lib/cms';
import Hero from "@/sections/home/Hero";
import ServicesPreview from "@/sections/home/ServicesPreview";
import WhoWeHelp from "@/sections/home/WhoWeHelp";
import Process from "@/sections/home/Process";
import Clients from "@/sections/home/Clients";
import Testimonials from "@/sections/home/Testimonials";
import Newsletter from "@/sections/home/Newsletter";

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
      <Clients images={images} />
      <Testimonials />
      <Newsletter content={content} />
    </main>
  );
}