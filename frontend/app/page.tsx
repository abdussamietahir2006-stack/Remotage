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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.remotage.com/#organization",
        "name": "Remotage",
        "url": "https://www.remotage.com",
        "logo": "https://www.remotage.com/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/remotage",
          "https://twitter.com/remotageteam"
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Remote Business Services",
        "provider": {
          "@id": "https://www.remotage.com/#organization"
        },
        "areaServed": [
          { "@type": "Country", "name": "US" },
          { "@type": "Country", "name": "UK" },
          { "@type": "Country", "name": "Australia" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Remotage Service Catalog",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lead Generation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Customer Support" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marketing & Social Media" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Finance & Bookkeeping" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate Services" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Online Reputation Management" } }
          ]
        }
      }
    ]
  };

  return (
    <main className="pt-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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