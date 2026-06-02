import type { Metadata } from "next";
import FreelanceClient from "@/components/FreelanceClient";
import Script from "next/script";
import FAQSchema, { freelanceFAQs } from "@/components/FAQSchema";

const BASE_URL = "https://midhunnk.in";

export const metadata: Metadata = {
  title: "Freelance Web Development Services — Hire Midhun NK",
  description:
    "Hire Midhun NK for freelance fullstack web development. Expert in React, Next.js, Node.js, and TypeScript. Building responsive, high-performance web applications for startups and businesses.",
  alternates: { canonical: `${BASE_URL}/freelance` },
  openGraph: {
    title: "Freelance Web Development Services — Hire Midhun NK",
    description:
      "Expert freelance fullstack developer. React, Next.js, Node.js, TypeScript. Building web applications for startups and businesses globally.",
    url: `${BASE_URL}/freelance`,
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Freelance Services" }],
  },
  twitter: {
    title: "Freelance Web Development Services — Hire Midhun NK",
    description:
      "Expert freelance fullstack developer. React, Next.js, Node.js, TypeScript. Available for hire globally.",
    images: ["/assets/og-default.png"],
  },
};

const freelanceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${BASE_URL}/freelance#service`,
      name: "Freelance Fullstack Web Development",
      url: `${BASE_URL}/freelance`,
      description:
        "Professional freelance web development services including React, Next.js, Node.js applications, REST APIs, and custom web solutions.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      serviceType: "Web Development",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        description: "Custom web development pricing based on project scope.",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/freelance#webpage`,
      url: `${BASE_URL}/freelance`,
      name: "Freelance Services — Midhun NK",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Freelance", item: `${BASE_URL}/freelance` },
        ],
      },
    },
  ],
};

export default function FreelancePage() {
  return (
    <>
      <Script
        id="schema-freelance"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(freelanceSchema) }}
        strategy="beforeInteractive"
      />
      <FAQSchema faqs={freelanceFAQs} id="schema-faq-freelance" />
      <div className="pt-32 pb-24 min-h-screen">
        <FreelanceClient />
      </div>
    </>
  );
}
// Note: FAQSchema import is at top — add to the existing file
