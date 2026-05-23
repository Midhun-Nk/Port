import type { Metadata } from "next";
import CertificatesClient from "@/components/CertificatesClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "Certifications & Awards — Midhun NK's Professional Credentials",
  description:
    "Professional certifications and awards earned by Midhun NK in software development, cloud computing, and web technologies. Verified credentials from industry-recognized programs.",
  alternates: { canonical: `${BASE_URL}/certificates` },
  openGraph: {
    title: "Certifications & Awards — Midhun NK's Professional Credentials",
    description:
      "Professional certifications and awards of Midhun NK — Fullstack Developer from India.",
    url: `${BASE_URL}/certificates`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Certifications" }],
  },
  twitter: {
    title: "Certifications & Awards — Midhun NK's Professional Credentials",
    description:
      "Professional certifications and awards of Midhun NK — Fullstack Developer from India.",
    images: ["/assets/og-default.png"],
  },
};

const certSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/certificates#webpage`,
  url: `${BASE_URL}/certificates`,
  name: "Certifications & Awards — Midhun NK",
  description: "Professional certifications and awards earned by Midhun NK.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Certificates", item: `${BASE_URL}/certificates` },
    ],
  },
};

export default function CertificatesPage() {
  return (
    <>
      <Script
        id="schema-certificates"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }}
        strategy="beforeInteractive"
      />
      <div className="pt-32 pb-24 min-h-screen">
        <CertificatesClient />
      </div>
    </>
  );
}
