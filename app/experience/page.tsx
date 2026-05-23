import type { Metadata } from "next";
import ExperienceClient from "@/components/ExperienceClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "Work Experience — Midhun NK's Software Engineering Career",
  description:
    "Midhun NK's professional work experience — roles, responsibilities, and achievements as a Fullstack Developer. Hands-on experience with React, Next.js, and backend systems.",
  alternates: { canonical: `${BASE_URL}/experience` },
  openGraph: {
    title: "Work Experience — Midhun NK's Software Engineering Career",
    description:
      "Professional work experience, roles, and engineering history of Midhun NK — Fullstack Developer from India.",
    url: `${BASE_URL}/experience`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Work Experience" }],
  },
  twitter: {
    title: "Work Experience — Midhun NK's Software Engineering Career",
    description:
      "Professional work experience and engineering history of Midhun NK — Fullstack Developer from India.",
    images: ["/assets/og-default.png"],
  },
};

const experienceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/experience#webpage`,
  url: `${BASE_URL}/experience`,
  name: "Experience — Midhun NK",
  description: "Professional experience page of Midhun NK — Fullstack Developer from India.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Experience", item: `${BASE_URL}/experience` },
    ],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <Script
        id="schema-experience"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceSchema) }}
        strategy="beforeInteractive"
      />
      <div className="pt-32 pb-24 min-h-screen">
        <ExperienceClient />
      </div>
    </>
  );
}
