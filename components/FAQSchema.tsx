/**
 * FAQSchema — Answer Engine Optimization (AEO) Component
 * 
 * Injects FAQ structured data for Google AI Overviews, Bing Copilot,
 * ChatGPT plugins, Perplexity, and other AI-powered search engines.
 * 
 * Usage: <FAQSchema faqs={[...]} />
 */

import Script from "next/script";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  id?: string;
}

export default function FAQSchema({ faqs, id = "schema-faq" }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

// Pre-built FAQ data for AEO — answers common searches about Midhun NK
export const portfolioFAQs: FAQ[] = [
  {
    question: "Who is Midhun NK?",
    answer:
      "Midhun NK is a Fullstack Developer and Content Creator based in India. He specializes in building modern web applications using React, Next.js, Node.js, and TypeScript, and creates developer tutorials and tech content.",
  },
  {
    question: "What technologies does Midhun NK use?",
    answer:
      "Midhun NK primarily works with React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, and Tailwind CSS. He is proficient in both frontend and backend development.",
  },
  {
    question: "Is Midhun NK available for freelance work?",
    answer:
      "Yes, Midhun NK is available for freelance web development projects. He offers fullstack development services including React/Next.js applications, REST APIs, and custom web solutions for startups and businesses worldwide.",
  },
  {
    question: "What kind of projects has Midhun NK built?",
    answer:
      "Midhun NK has built SaaS products, e-learning platforms, travel booking websites, portfolio sites, and custom business web applications. His projects include CodeSynz, LearnStak, SyncFlow, and ResQLink.",
  },
  {
    question: "Where can I read Midhun NK's developer blog?",
    answer:
      "Midhun NK's developer blog is available at midhunnk.in/blog, covering topics like React, Next.js, Node.js, TypeScript, and modern web development practices.",
  },
  {
    question: "How can I contact Midhun NK?",
    answer:
      "You can contact Midhun NK through the contact form on his portfolio website at midhunnk.in, or via his social media profiles on GitHub, LinkedIn, and Twitter.",
  },
];

export const freelanceFAQs: FAQ[] = [
  {
    question: "What freelance services does Midhun NK offer?",
    answer:
      "Midhun NK offers freelance fullstack web development services including React and Next.js frontend development, Node.js backend APIs, database design, Supabase integration, and complete web application development.",
  },
  {
    question: "How much does Midhun NK charge for freelance development?",
    answer:
      "Midhun NK's freelance rates vary based on project scope and complexity. Contact him directly through midhunnk.in/freelance for a custom quote tailored to your project needs.",
  },
  {
    question: "What is Midhun NK's development process?",
    answer:
      "Midhun NK follows a structured development process: requirements gathering, planning, iterative development with regular updates, testing, and deployment. He prioritizes clear communication and timely delivery.",
  },
];
