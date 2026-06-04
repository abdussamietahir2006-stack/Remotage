import { getPageContent } from '@/lib/cms';
import AboutHero from "@/sections/about/AboutHero";
import AboutStory from "@/sections/about/AboutStory";
import AboutMissionVision from "@/sections/about/AboutMissionVision";
import AboutStats from "@/sections/about/AboutStats";
import AboutValues from "@/sections/about/AboutValues";
import AboutCTA from "@/sections/about/AboutCTA";

export const metadata = {
  title: "About | Remotage",
  description: "Learn about Remotage — who we are, our mission, and the team behind your remote advantage.",
};

export default async function AboutPage() {
  const cms = await getPageContent('about');
  const content = (cms?.content as Record<string, string>) ?? {};
  const images = (cms?.images as Record<string, string>) ?? {};

  return (
    <main>
      <AboutHero content={content} />
      <AboutStats content={content} />
      <AboutStory content={content} images={images} />
      <AboutMissionVision content={content} />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}