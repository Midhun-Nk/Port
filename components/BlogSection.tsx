"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Eye, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  topic: string;
  subtopic: string | null;
  tags: string[];
  cover_image: string | null;
  read_time: number | null;
  views: number;
  created_at: string;
}

interface BlogSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogSection({ onPointerEnter, onPointerLeave }: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("id, title, slug, excerpt, topic, subtopic, tags, cover_image, read_time, views, created_at")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3);
        if (error) {
          console.error("Error fetching recent blogs:", error);
        } else if (data) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch recent blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBlogs();
  }, []);

  // If not loading and no blogs are published, hide the section gracefully
  if (!loading && blogs.length === 0) return null;

  return (
    <section id="recent-blogs" className="px-8 md:px-12 py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-border pb-6">
          <div>
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
              Writing & Thoughts
            </span>
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">
              Recent Blogs
            </h2>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-2 font-technical text-[11px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
          >
            View All Blogs
            <span className="p-1.5 border border-primary/30 group-hover:border-primary/70 bg-background/80 backdrop-blur-sm transition-all duration-300">
              <ArrowUpRight size={12} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-border bg-background/50 rounded-none p-5 h-full animate-pulse flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="w-full aspect-[16/10] bg-muted/20 rounded-none mb-6" />
                    <div className="h-4 bg-muted/30 rounded-none w-1/4 mb-4" />
                    <div className="h-6 bg-muted/30 rounded-none w-3/4 mb-3" />
                    <div className="h-4 bg-muted/20 rounded-none w-full mb-2" />
                    <div className="h-4 bg-muted/20 rounded-none w-5/6" />
                  </div>
                  <div className="h-4 bg-muted/30 rounded-none w-1/2 mt-6" />
                </div>
              ))
            : blogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={onPointerEnter}
                  onMouseLeave={onPointerLeave}
                  className="flex"
                >
                  <Link href={`/blog/${blog.slug}`} className="flex flex-col flex-1 w-full">
                    <div className="group border border-primary/50 bg-background/50 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] hover:bg-primary/[0.02] transition-all duration-300 flex flex-col h-full rounded-none p-5 overflow-hidden">
                      {/* Image Container with Hover Zoom */}
                      {blog.cover_image && (
                        <div className="w-full aspect-[16/10] mb-6 overflow-hidden rounded-none border border-primary/30 group-hover:border-primary/50 bg-muted/20 relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover scale-95 group-hover:scale-100 transition-all duration-700 ease-in-out"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col flex-grow">
                        {/* Topic/Category */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                          <span className="font-technical text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">
                            {blog.topic}
                          </span>
                          {blog.subtopic && (
                            <span className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
                              {blog.subtopic}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl italic tracking-tight group-hover:text-primary transition-colors duration-300">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="font-technical text-[11px] text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mt-4">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="font-technical text-[9px] text-muted-foreground border border-border/60 px-2 py-0.5 flex items-center gap-1">
                                <Tag size={8} />{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stats / Footer */}
                        <div className="mt-auto pt-4 flex items-center gap-3 border-t border-primary/30 font-technical text-[9px] text-muted-foreground uppercase tracking-widest">
                          {blog.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock size={9} />{blog.read_time} min
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye size={9} />{blog.views}
                          </span>
                          <span className="ml-auto">
                            {new Date(blog.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </motion.div>
    </section>
  );
}
