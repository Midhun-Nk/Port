import type { Metadata } from "next";
import StackClient from "@/components/StackClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.in";

export const metadata: Metadata = {
  title: "Tech Stack — Tools & Technologies Used by Midhun NK",
  description:
    "Explore the full tech stack of Midhun NK — React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, Tailwind CSS, and more. Tools and frameworks powering real-world projects.",
  alternates: { canonical: `${BASE_URL}/stack` },
  openGraph: {
    title: "Tech Stack — Tools & Technologies Used by Midhun NK",
    description:
      "React, Next.js, TypeScript, Node.js, Supabase, Tailwind CSS and more — the full developer toolkit of Midhun NK.",
    url: `${BASE_URL}/stack`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Tech Stack" }],
  },
  twitter: {
    title: "Tech Stack — Tools & Technologies Used by Midhun NK",
    description:
      "React, Next.js, TypeScript, Node.js, Supabase, Tailwind CSS and more — the full developer toolkit of Midhun NK.",
    images: ["/assets/og-default.png"],
  },
};

const stackSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/stack#webpage`,
  url: `${BASE_URL}/stack`,
  name: "Tech Stack — Midhun NK",
  description: "Technologies and tools used by Midhun NK in web development.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tech Stack", item: `${BASE_URL}/stack` },
    ],
  },
};

export default function StackPage() {
  return (
    <>
      <Script
        id="schema-stack"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackSchema) }}
        strategy="beforeInteractive"
      />
      <div className="pt-32 pb-24 min-h-screen">
        <StackClient />
      </div>
    </>
  );
}
