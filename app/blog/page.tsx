"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Eye, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const ease = [0.16, 1, 0.3, 1] as const;

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  topic: string;
  subtopic: string | null;
  tags: string[];
  cover_image: string | null;
  youtube_url: string | null;
  read_time: number | null;
  views: number;
  created_at: string;
  featured: boolean;
  author: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, topic, subtopic, tags, cover_image, youtube_url, read_time, views, created_at, featured, author")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) {
        setBlogs(data);
        setFiltered(data);
        const topicSet = Array.from(new Set(data.map((b) => b.topic).filter(Boolean)));
        setTopics(["All", ...topicSet]);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;
    if (activeTopic !== "All") result = result.filter((b) => b.topic === activeTopic);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.topic?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [search, activeTopic, blogs]);

  const featured = filtered.find((b) => b.featured);
  const rest = filtered.filter((b) => !b.featured || filtered.indexOf(b) > 0);

  return (
    <div className="min-h-screen px-8 md:px-12 pt-28 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mb-16"
      >
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Writing</span>
        <h1 className="font-display text-7xl md:text-9xl italic tracking-tighter mt-2">Blog</h1>
        <p className="font-technical text-xs text-muted-foreground mt-4 max-w-md leading-relaxed">
          Thoughts on development, design, and building things that matter.
        </p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        className="flex flex-col md:flex-row gap-4 mb-12"
      >
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full bg-background border border-border pl-10 pr-4 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {topics.map((topic) => (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTopic(topic)}
              className={`font-technical text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                activeTopic === topic
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {loading && (
        <div className="flex items-center gap-3 py-20">
          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="font-technical text-xs text-muted-foreground ml-2">Loading posts...</span>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center border border-dashed border-border">
          <p className="font-display text-3xl italic text-muted-foreground">No posts found</p>
          {search && <p className="font-technical text-xs text-muted-foreground mt-2">Try different search terms</p>}
        </div>
      )}

      {/* Featured */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mb-12"
        >
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest mb-4 block">Featured</span>
          <Link href={`/blog/${featured.slug}`}>
            <motion.div
              whileHover={{ x: 8 }}
              className="group border border-border hover:border-primary/40 transition-colors duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                {featured.cover_image && (
                  <div className="h-64 md:h-auto overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.cover_image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className={`p-8 md:p-10 flex flex-col justify-center ${!featured.cover_image ? "col-span-2" : ""}`}>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="font-technical text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">
                      {featured.topic}
                    </span>
                    {featured.subtopic && (
                      <span className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
                        {featured.subtopic}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl italic tracking-tighter group-hover:text-primary transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="font-technical text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-6 font-technical text-[10px] text-muted-foreground uppercase tracking-widest">
                    {featured.read_time && <span className="flex items-center gap-1"><Clock size={10} />{featured.read_time} min</span>}
                    <span className="flex items-center gap-1"><Eye size={10} />{featured.views}</span>
                    <span>{new Date(featured.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Blog Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              layout
            >
              <Link href={`/blog/${blog.slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group border border-border hover:border-primary/40 transition-all duration-300 h-full flex flex-col overflow-hidden bg-background/50 backdrop-blur-sm"
                >
                  {blog.cover_image && (
                    <div className="h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="font-technical text-[9px] uppercase tracking-widest text-primary/80">{blog.topic}</span>
                      {blog.subtopic && (
                        <span className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">/ {blog.subtopic}</span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl italic tracking-tight group-hover:text-primary transition-colors duration-300 flex-1">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="font-technical text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                    )}
                    {blog.tags?.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mt-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-technical text-[9px] text-muted-foreground border border-border/60 px-2 py-0.5 flex items-center gap-1">
                            <Tag size={8} />{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border font-technical text-[9px] text-muted-foreground uppercase tracking-widest">
                      {blog.read_time && <span className="flex items-center gap-1"><Clock size={9} />{blog.read_time}m</span>}
                      <span className="flex items-center gap-1"><Eye size={9} />{blog.views}</span>
                      <span className="ml-auto">{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
