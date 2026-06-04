import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: {
    default: "Remotage — Your Remote Advantage",
    template: "%s | Remotage",
  },
  description:
    "Scale faster with expert-led virtual assistant services, automation, and remote execution. Serving startups, SMBs, and professionals worldwide.",
  keywords: [
    "virtual assistant services",
    "remote services",
    "lead generation",
    "customer support outsourcing",
    "virtual bookkeeping",
    "real estate virtual assistant",
    "remote marketing services",
    "CRM management",
    "online reputation management",
    "remotage",
  ],
  metadataBase: new URL("https://www.remotage.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.remotage.com",
    siteName: "Remotage",
    title: "Remotage — Your Remote Advantage",
    description:
      "Scale faster with expert-led virtual assistant services, automation, and remote execution. Serving startups, SMBs, and professionals worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remotage — Your Remote Advantage",
    description:
      "Scale faster with expert-led virtual assistant services, automation, and remote execution.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}