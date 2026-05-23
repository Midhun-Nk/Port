import type { Metadata } from "next";
import BlogPageClient from "@/components/BlogPageClient";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";

export const metadata: Metadata = {
  title: "Developer Blog — Web Development Articles & Tutorials by Midhun NK",
  description:
    "In-depth articles, tutorials, and thoughts on React, Next.js, Node.js, TypeScript, and modern web development by Midhun NK. Practical insights for developers.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Developer Blog — Web Development Articles & Tutorials by Midhun NK",
    description:
      "In-depth articles on React, Next.js, Node.js, TypeScript, and modern web development by Midhun NK.",
    url: `${BASE_URL}/blog`,
    type: "website",
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Midhun NK Blog" }],
  },
  twitter: {
    title: "Developer Blog — Web Development Articles & Tutorials by Midhun NK",
    description:
      "In-depth articles on React, Next.js, Node.js, TypeScript, and web development by Midhun NK.",
    images: ["/assets/og-default.png"],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE_URL}/blog#blog`,
  url: `${BASE_URL}/blog`,
  name: "Midhun NK Developer Blog",
  description:
    "In-depth articles, tutorials, and thoughts on React, Next.js, Node.js, and modern web development.",
  author: { "@id": `${BASE_URL}/#person` },
  publisher: { "@id": `${BASE_URL}/#person` },
  isPartOf: { "@id": `${BASE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
    ],
  },
};

export default function BlogPage() {
  return (
    <>
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        strategy="beforeInteractive"
      />
      <BlogPageClient />
    </>
  );
}
