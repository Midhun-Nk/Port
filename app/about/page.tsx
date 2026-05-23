import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "About Midhun NK — Fullstack Developer from India",
  description:
    "Learn about Midhun NK — a passionate Fullstack Developer and Content Creator from India. Background in React, Next.js, Node.js, and TypeScript with hands-on freelance experience.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Midhun NK — Fullstack Developer from India",
    description:
      "Background, skills, and journey of Midhun NK — Fullstack Developer and Content Creator based in India.",
    url: `${BASE_URL}/about`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "About Midhun NK" }],
  },
  twitter: {
    title: "About Midhun NK — Fullstack Developer from India",
    description:
      "Background, skills, and journey of Midhun NK — Fullstack Developer and Content Creator based in India.",
    images: ["/assets/og-default.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about#webpage`,
  url: `${BASE_URL}/about`,
  name: "About Midhun NK",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#person` },
  description: "About page of Midhun NK — Fullstack Developer and Content Creator from India.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="schema-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        strategy="beforeInteractive"
      />
      <div className="pt-32 pb-24 min-h-screen">
        <AboutClient />
      </div>
    </>
  );
}
