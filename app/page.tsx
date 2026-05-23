import type { Metadata } from "next";
import HomeSections from "@/components/HomeSections";
import Script from "next/script";
import FAQSchema, { portfolioFAQs } from "@/components/FAQSchema";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "Midhun NK — Fullstack Developer & Content Creator",
  description:
    "Welcome to the portfolio of Midhun NK. Fullstack Developer building modern web apps with React and Next.js. Content Creator sharing developer tutorials and tech insights from India.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Midhun NK — Fullstack Developer & Content Creator",
    description:
      "Explore projects, experience, and content from Midhun NK — a Fullstack Developer and Content Creator from India.",
    url: BASE_URL,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Portfolio" }],
  },
  twitter: {
    title: "Midhun NK — Fullstack Developer & Content Creator",
    description:
      "Explore projects, experience, and content from Midhun NK — a Fullstack Developer and Content Creator from India.",
    images: ["/assets/og-default.png"],
  },
};

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Midhun NK — Fullstack Developer & Content Creator",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#person` },
  description:
    "Portfolio homepage of Midhun NK showcasing projects, skills, experience, and developer content.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        strategy="beforeInteractive"
      />
      {/* AEO: FAQ schema for AI search engines */}
      <FAQSchema faqs={portfolioFAQs} id="schema-faq-home" />
      <HomeSections />
    </>
  );
}
