"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Eye, Tag, ArrowLeft, Play, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase, Subtopic } from "@/lib/supabase";
import Script from "next/script";

const BASE_URL = "https://midhunnk.com";
const ease = [0.16, 1, 0.3, 1] as const;

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  topic: string;
  subtopic: string | null;
  subtopics: Subtopic[] | null;
  tags: string[];
  cover_image: string | null;
  youtube_url: string | null;
  read_time: number | null;
  views: number;
  created_at: string;
  featured: boolean;
  author: string;
  seo_title: string | null;
  seo_description: string | null;
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function renderContent(content: string) {
  return content
    .split("\n\n")
    .map((para) => {
      if (para.startsWith("## ")) return `<h2>${para.slice(3)}</h2>`;
      if (para.startsWith("### ")) return `<h3>${para.slice(4)}</h3>`;
      if (para.startsWith("# ")) return `<h1>${para.slice(2)}</h1>`;
      if (para.startsWith("```")) return `<pre><code>${para.slice(3).replace(/```$/, "")}</code></pre>`;
      if (para.startsWith("- ")) return `<ul>${para.split("\n").map((l) => `<li>${l.slice(2)}</li>`).join("")}</ul>`;
      return `<p>${para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")}</p>`;
    })
    .join("\n");
}

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", params.slug)
        .eq("published", true)
        .single();

      if (data) {
        setBlog(data);
        await supabase.from("blogs").update({ views: data.views + 1 }).eq("id", data.id);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-label="Loading blog post">
        <div className="flex gap-2" role="status" aria-live="polite">
          {[0, 150, 300].map((delay) => (
            <div key={delay} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
          ))}
          <span className="sr-only">Loading…</span>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h1 className="font-display text-6xl italic text-muted-foreground">Post not found</h1>
          <Link href="/blog" className="font-technical text-xs text-primary mt-6 block hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const ytId = blog.youtube_url ? getYouTubeId(blog.youtube_url) : null;
  const pageUrl = `${BASE_URL}/blog/${blog.slug}`;
  const ogImage = blog.cover_image || "/assets/og-default.png";

  // Article structured data (client-rendered for dynamic content)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    url: pageUrl,
    headline: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    image: ogImage,
    datePublished: blog.created_at,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: blog.author || "Midhun NK",
    },
    publisher: { "@id": `${BASE_URL}/#person` },
    isPartOf: { "@id": `${BASE_URL}/blog#blog` },
    keywords: blog.tags?.join(", "),
    articleSection: blog.topic,
    timeRequired: blog.read_time ? `PT${blog.read_time}M` : undefined,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: blog.title, item: pageUrl },
      ],
    },
  };

  return (
    <>
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      <article className="min-h-screen px-8 md:px-12 pt-28 pb-20" itemScope itemType="https://schema.org/BlogPosting">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-5xl mx-auto"
        >
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground truncate max-w-[200px]" aria-current="page">{blog.title}</li>
            </ol>
          </nav>

          {/* Back */}
          <Link href="/blog" aria-label="Back to all blog posts">
            <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest mb-8 hover:text-primary transition-colors">
              <ArrowLeft size={12} /> All Posts
            </motion.div>
          </Link>

          {/* Topic + Meta */}
          <div className="flex gap-2 mb-6 flex-wrap" role="list" aria-label="Post categories">
            <span role="listitem" className="font-technical text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">{blog.topic}</span>
            {blog.subtopic && <span role="listitem" className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1">{blog.subtopic}</span>}
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl italic tracking-tighter leading-[0.9]" itemProp="headline">{blog.title}</h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="font-technical text-sm text-muted-foreground mt-6 leading-relaxed border-l-2 border-primary/40 pl-4" itemProp="description">{blog.excerpt}</p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-5 mt-8 pb-8 border-b border-border font-technical text-[10px] text-muted-foreground uppercase tracking-widest flex-wrap">
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              <span itemProp="name">{blog.author}</span>
            </span>
            <time className="flex items-center gap-1" dateTime={blog.created_at} itemProp="datePublished">
              <Calendar size={10} aria-hidden="true" />
              {new Date(blog.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            {blog.read_time && (
              <span className="flex items-center gap-1">
                <Clock size={10} aria-hidden="true" />{blog.read_time} min read
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye size={10} aria-hidden="true" />{blog.views + 1} views
            </span>
          </div>

          {/* Cover Image */}
          {blog.cover_image && (
            <motion.figure
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="mt-10 overflow-hidden border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.cover_image}
                alt={`Cover image for ${blog.title}`}
                className="w-full h-auto max-h-[480px] object-cover"
                loading="eager"
                fetchPriority="high"
                itemProp="image"
              />
              <figcaption className="sr-only">Cover image for {blog.title}</figcaption>
            </motion.figure>
          )}

          {/* YouTube embed */}
          {ytId && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
              aria-label="Video content"
            >
              <div className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                <Play size={12} className="text-red-400" aria-hidden="true" /> Video
              </div>
              <div className="relative aspect-video border border-border overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={`Video: ${blog.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.section>
          )}

          {/* Main Content */}
          {blog.content && blog.content.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="mt-12 prose-blog"
              style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}
              dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
              itemProp="articleBody"
            />
          )}

          {/* Subtopics */}
          {blog.subtopics && blog.subtopics.length > 0 && (
            <div className="mt-12 space-y-12">
              {blog.subtopics.map((sub, idx) => {
                const ytSubId = sub.video_url ? getYouTubeId(sub.video_url) : null;
                return (
                  <section key={idx} className="border-t border-border pt-10 space-y-6">
                    {sub.title && (
                      <h2 className="font-display text-3xl md:text-4xl italic tracking-tight text-foreground">{sub.title}</h2>
                    )}
                    {sub.image && (
                      <figure className="overflow-hidden border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sub.image}
                          alt={sub.title ? `Illustration for ${sub.title}` : "Section illustration"}
                          className="w-full h-auto max-h-[480px] object-cover"
                          loading="lazy"
                        />
                      </figure>
                    )}
                    {sub.details && (
                      <p className="font-technical text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{sub.details}</p>
                    )}
                    {sub.unordered_list && sub.unordered_list.length > 0 && (
                      <ul className="list-disc pl-5 space-y-2 font-technical text-sm text-muted-foreground">
                        {sub.unordered_list.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    )}
                    {sub.ordered_list && sub.ordered_list.length > 0 && (
                      <ol className="list-decimal pl-5 space-y-2 font-technical text-sm text-muted-foreground">
                        {sub.ordered_list.map((item, i) => <li key={i}>{item}</li>)}
                      </ol>
                    )}
                    {sub.web_url && (
                      <div className="mt-4">
                        <a
                          href={sub.web_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors font-technical text-xs uppercase tracking-widest"
                          aria-label={`Open external website${sub.title ? `: ${sub.title}` : ""}`}
                        >
                          <ExternalLink size={12} aria-hidden="true" /> Open Website
                        </a>
                      </div>
                    )}
                    {ytSubId && (
                      <div className="mt-4">
                        <div className="relative aspect-video border border-border overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${ytSubId}`}
                            title={sub.title ? `Video: ${sub.title}` : "Subtopic video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-border">
              <nav aria-label="Post tags">
                <div className="flex gap-2 flex-wrap">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?q=${encodeURIComponent(tag)}`}
                      className="flex items-center gap-1.5 font-technical text-[10px] text-muted-foreground border border-border/60 px-3 py-1.5 hover:border-primary/30 hover:text-foreground transition-colors"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      <Tag size={10} aria-hidden="true" />{tag}
                    </Link>
                  ))}
                </div>
              </nav>
            </footer>
          )}

          {/* Back link */}
          <div className="mt-16">
            <Link href="/blog" aria-label="Back to all blog posts">
              <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 font-technical text-xs text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                <ArrowLeft size={14} aria-hidden="true" /> Back to all posts
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </article>
    </>
  );
}
