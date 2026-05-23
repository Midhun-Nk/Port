import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import Script from "next/script";

const BASE_URL = "https://midhunnk.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Midhun NK — Fullstack Developer & Content Creator",
    template: "%s | Midhun NK",
  },
  description:
    "Midhun NK is a Fullstack Developer and Content Creator based in India. Building scalable web applications with React, Next.js, and Node.js. Sharing developer tutorials and tech content.",
  keywords: [
    "Midhun NK",
    "Fullstack Developer India",
    "Next.js developer",
    "React developer Kerala",
    "Content Creator developer",
    "web developer portfolio",
    "Node.js developer",
    "TypeScript developer",
    "freelance web developer India",
  ],
  authors: [{ name: "Midhun NK", url: BASE_URL }],
  creator: "Midhun NK",
  publisher: "Midhun NK",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Midhun NK — Fullstack Developer & Content Creator",
    title: "Midhun NK — Fullstack Developer & Content Creator",
    description:
      "Building scalable web apps with React, Next.js & Node.js. Freelance developer and content creator based in India.",
    images: [
      {
        url: "/assets/og-default.png",
        width: 1200,
        height: 630,
        alt: "Midhun NK — Fullstack Developer & Content Creator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@midhunnk",
    creator: "@midhunnk",
    title: "Midhun NK — Fullstack Developer & Content Creator",
    description:
      "Building scalable web apps with React, Next.js & Node.js. Freelance developer and content creator based in India.",
    images: ["/assets/og-default.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
  classification: "Portfolio",
  verification: {
    // google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    // bing: "YOUR_BING_VERIFICATION_CODE",
  },
};

// JSON-LD structured data: Person + Website + Organization
const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Midhun NK",
      url: BASE_URL,
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/portrait-1.png`,
        width: 800,
        height: 800,
      },
      jobTitle: "Fullstack Developer & Content Creator",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      description:
        "Fullstack Developer and Content Creator based in India, specializing in React, Next.js, Node.js, and TypeScript.",
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Web Development",
        "Content Creation",
        "Fullstack Development",
      ],
      sameAs: [
        "https://github.com/midhunnk",
        "https://linkedin.com/in/midhunnk",
        "https://twitter.com/midhunnk",
        "https://youtube.com/@midhunnk",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Midhun NK",
      description:
        "Portfolio of Midhun NK — Fullstack Developer & Content Creator",
      publisher: { "@id": `${BASE_URL}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Midhun NK — Freelance Web Development",
      url: `${BASE_URL}/freelance`,
      image: `${BASE_URL}/assets/portrait-1.png`,
      description:
        "Freelance fullstack web development services including React, Next.js, Node.js applications and custom web solutions.",
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: "Worldwide",
      serviceType: "Web Development",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* JSON-LD */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
