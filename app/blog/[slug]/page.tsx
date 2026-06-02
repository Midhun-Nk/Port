"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Eye, Tag, ArrowLeft, Play, Calendar, ExternalLink, Copy, Check } from "lucide-react";
import Link from "next/link";
import { supabase, Subtopic } from "@/lib/supabase";

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

// Very simple markdown-to-HTML renderer
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
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => {
      setCopiedIdx(null);
    }, 2000);
  };

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
        // Increment views
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 150, 300].map((delay) => (
            <div key={delay} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <p className="font-display text-6xl italic text-muted-foreground">Post not found</p>
          <Link href="/blog" className="font-technical text-xs text-primary mt-6 block hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const ytId = blog.youtube_url ? getYouTubeId(blog.youtube_url) : null;

  return (
    <article className="min-h-screen px-8 md:px-12 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-5xl mx-auto"
      >
        {/* Back */}
        <Link href="/blog">
          <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest mb-8 hover:text-primary transition-colors">
            <ArrowLeft size={12} /> All Posts
          </motion.div>
        </Link>

        {/* Topic + Meta */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="font-technical text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">{blog.topic}</span>
          {blog.subtopic && <span className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1">{blog.subtopic}</span>}
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl italic tracking-tighter leading-[0.9]">{blog.title}</h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="font-technical text-sm text-muted-foreground mt-6 leading-relaxed border-l-2 border-primary/40 pl-4">{blog.excerpt}</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-5 mt-8 pb-8 border-b border-border font-technical text-[10px] text-muted-foreground uppercase tracking-widest flex-wrap">
          <span>{blog.author}</span>
          <span className="flex items-center gap-1"><Calendar size={10} />{new Date(blog.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          {blog.read_time && <span className="flex items-center gap-1"><Clock size={10} />{blog.read_time} min read</span>}
          <span className="flex items-center gap-1"><Eye size={10} />{blog.views + 1} views</span>
        </div>

        {/* Cover Image */}
        {blog.cover_image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mt-10 overflow-hidden border border-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.cover_image} alt={blog.title} className="w-full h-auto max-h-[480px] object-cover" />
          </motion.div>
        )}

        {/* YouTube embed */}
        {ytId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <div className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              <Play size={12} className="text-red-400" /> Video
            </div>
            <div className="relative aspect-video border border-border overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Intro Content */}
        {blog.content && blog.content.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-12 prose-blog"
            style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}
            dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
          />
        )}

        {/* Subtopics */}
        {blog.subtopics && blog.subtopics.length > 0 && (
          <div className="mt-12 space-y-12">
            {blog.subtopics.map((sub, idx) => {
              const ytSubId = sub.video_url ? getYouTubeId(sub.video_url) : null;
              return (
                <div key={idx} className="border-t border-border pt-10 space-y-6">
                  {/* Subtopic Title */}
                  {sub.title && (
                    <h2 className="font-display text-3xl md:text-4xl italic tracking-tight text-foreground">
                      {sub.title}
                    </h2>
                  )}

                  {/* Subtopic Image */}
                  {sub.image && (
                    <div className="overflow-hidden border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sub.image} alt={sub.title || "Subtopic image"} className="w-full h-auto max-h-[480px] object-cover" />
                    </div>
                  )}

                  {/* Subtopic Details */}
                  {sub.details && (
                    <p className="font-technical text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {sub.details}
                    </p>
                  )}

                  {/* Subtopic Unordered List */}
                  {sub.unordered_list && sub.unordered_list.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 font-technical text-sm text-muted-foreground">
                      {sub.unordered_list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {/* Subtopic Ordered List */}
                  {sub.ordered_list && sub.ordered_list.length > 0 && (
                    <ol className="list-decimal pl-5 space-y-2 font-technical text-sm text-muted-foreground">
                      {sub.ordered_list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  )}

                  {/* Subtopic Code Snippet */}
                  {sub.code_snippet && (
                    <div className="mt-6 border border-border bg-secondary/30 rounded-none overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/60 font-technical text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>Code Snippet / Prompt</span>
                        <button
                          onClick={() => handleCopy(sub.code_snippet!, idx)}
                          className="flex items-center gap-1.5 hover:text-primary transition-colors focus:outline-none"
                        >
                          {copiedIdx === idx ? (
                            <>
                              <Check size={12} className="text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto font-mono text-xs text-foreground bg-black/10 select-text leading-relaxed">
                        <code>{sub.code_snippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Subtopic Website Link */}
                  {sub.web_url && (
                    <div className="mt-4">
                      <a
                        href={sub.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors font-technical text-xs uppercase tracking-widest"
                      >
                        <ExternalLink size={12} /> Open Website
                      </a>
                    </div>
                  )}

                  {/* Subtopic Video */}
                  {ytSubId && (
                    <div className="mt-4">
                      <div className="relative aspect-video border border-border overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${ytSubId}`}
                          title="Subtopic video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex gap-2 flex-wrap">
              {blog.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 font-technical text-[10px] text-muted-foreground border border-border/60 px-3 py-1.5 hover:border-primary/30 hover:text-foreground transition-colors cursor-pointer">
                  <Tag size={10} />{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-16">
          <Link href="/blog">
            <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 font-technical text-xs text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft size={14} /> Back to all posts
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </article>
  );
}
