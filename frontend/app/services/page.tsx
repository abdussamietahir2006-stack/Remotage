import { getPageContent } from '@/lib/cms';
import ServicesHero from "@/components/services/ServicesHero";
import AdminSupport from "@/components/services/AdminSupport";
import CustomerSupport from "@/components/services/CustomerSupport";
import MarketingSocial from "@/components/services/MarketingSocial";
import FinanceBookkeeping from "@/components/services/FinanceBookkeeping";
import ServiceWebDev from "@/components/services/ServiceWebDev";
import ComparisonSection from "@/components/services/ComparisonSection";
import ServicesCTA from "@/components/services/ServicesCTA";

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