import { getPageContent } from '@/lib/cms';
import ServicesHero from "@/sections/services/ServicesHero";
import AdminSupport from "@/sections/services/AdminSupport";
import CustomerSupport from "@/sections/services/CustomerSupport";
import MarketingSocial from "@/sections/services/MarketingSocial";
import FinanceBookkeeping from "@/sections/services/FinanceBookkeeping";
import ServiceWebDev from "@/sections/services/ServiceWebDev";
import ComparisonSection from "@/sections/services/ComparisonSection";
import ServicesCTA from "@/sections/services/ServicesCTA";

export const metadata = {
  title: "Services | Remotage",
  description: "Premium remote services to scale your business.",
};

export default async function ServicesPage() {
  const cms = await getPageContent('services');
  const content = (cms?.content as Record<string, string>) ?? {};
  const images  = (cms?.images  as Record<string, string>) ?? {};

  return (
    <main>
      <ServicesHero content={content} />
      <AdminSupport content={content} images={images} />
      <CustomerSupport content={content} images={images} />
      <MarketingSocial content={content} images={images} />
      <FinanceBookkeeping content={content} images={images} />
      <ServiceWebDev content={content} images={images} />
      <ComparisonSection />
      <ServicesCTA />
    </main>
  );
}