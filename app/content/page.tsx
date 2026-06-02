import type { Metadata } from "next";
import ContentClient from "@/components/ContentClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.in";

export const metadata: Metadata = {
  title: "Developer Content — Tutorials, Videos & Articles by Midhun NK",
  description:
    "Explore developer tutorials, YouTube videos, and technical articles created by Midhun NK. Covering React, Next.js, Node.js, TypeScript, and modern web development topics.",
  alternates: { canonical: `${BASE_URL}/content` },
  openGraph: {
    title: "Developer Content — Tutorials, Videos & Articles by Midhun NK",
    description:
      "Tutorials, YouTube videos, and technical articles on React, Next.js, Node.js, and web development by Midhun NK.",
    url: `${BASE_URL}/content`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Content Creation" }],
  },
  twitter: {
    title: "Developer Content — Tutorials, Videos & Articles by Midhun NK",
    description:
      "Tutorials, videos, and articles on React, Next.js, Node.js, and web development by Midhun NK.",
    images: ["/assets/og-default.png"],
  },
};

const contentSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/content#webpage`,
  url: `${BASE_URL}/content`,
  name: "Content by Midhun NK",
  description: "Developer tutorials, videos, and articles by Midhun NK.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  author: { "@id": `${BASE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Content", item: `${BASE_URL}/content` },
    ],
  },
};

export default function ContentPage() {
  return (
    <>
      <Script
        id="schema-content"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contentSchema) }}
        strategy="beforeInteractive"
      />
      <div className="pt-32 pb-24 min-h-screen">
        <ContentClient />
      </div>
    </>
  );
}
