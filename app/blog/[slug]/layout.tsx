import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

const BASE_URL = "https://midhunnk.com";
const staticExportFallbackParams = [{ slug: "__static_export_placeholder__" }];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from("blogs")
      .select("slug")
      .eq("published", true);
    if (!data || data.length === 0) return staticExportFallbackParams;
    return data.map((blog) => ({ slug: blog.slug }));
  } catch {
    return staticExportFallbackParams;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: blog } = await supabase
      .from("blogs")
      .select("title, excerpt, seo_title, seo_description, cover_image, og_image, tags, topic, author, created_at")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!blog) {
      return {
        title: "Post Not Found",
        description: "The blog post you are looking for does not exist.",
        robots: { index: false, follow: false },
      };
    }

    const title = blog.seo_title || blog.title;
    const description = blog.seo_description || blog.excerpt;
    const ogImage = blog.og_image || blog.cover_image || "/assets/og-default.png";
    const pageUrl = `${BASE_URL}/blog/${slug}`;

    return {
      title: `${title} — Midhun NK Blog`,
      description,
      keywords: blog.tags || [],
      authors: [{ name: blog.author || "Midhun NK", url: BASE_URL }],
      alternates: { canonical: pageUrl },
      openGraph: {
        type: "article",
        title,
        description,
        url: pageUrl,
        authors: [blog.author || "Midhun NK"],
        publishedTime: blog.created_at,
        tags: blog.tags,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        section: blog.topic,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Blog Post — Midhun NK" };
  }
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
