import type { Metadata } from "next";
import ProjectsClient from "@/components/ProjectsClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "Projects — React & Next.js Web Applications by Midhun NK",
  description:
    "Explore fullstack web applications and projects built by Midhun NK using React, Next.js, Node.js, and TypeScript. From SaaS products to open-source tools.",
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: "Projects — React & Next.js Web Applications by Midhun NK",
    description:
      "Fullstack web applications and projects built by Midhun NK using React, Next.js, Node.js, and TypeScript.",
    url: `${BASE_URL}/projects`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Projects" }],
  },
  twitter: {
    title: "Projects — React & Next.js Web Applications by Midhun NK",
    description:
      "Fullstack web applications and projects built by Midhun NK using React, Next.js, Node.js, and TypeScript.",
    images: ["/assets/og-default.png"],
  },
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/projects#webpage`,
  url: `${BASE_URL}/projects`,
  name: "Projects by Midhun NK",
  description: "Fullstack web applications and projects built by Midhun NK.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  author: { "@id": `${BASE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/projects` },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Script
        id="schema-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        strategy="beforeInteractive"
      />
      <ProjectsClient />
    </>
  );
}
