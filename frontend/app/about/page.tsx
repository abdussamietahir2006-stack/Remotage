
import { getPageContent } from '@/lib/cms';
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutStats from "@/components/about/AboutStats";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About",
  description:
    "Learn about Remotage — a remote-first team founded in 2023, helping 150+ businesses scale with expert virtual services and automation.",
  alternates: { canonical: "/about" },
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