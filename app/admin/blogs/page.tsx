"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const ease = [0.16, 1, 0.3, 1] as const;

interface Blog {
  id: string;
  title: string;
  slug: string;
  topic: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  views: number;
}

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, topic, published, featured, created_at, views")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch {
      setError("Could not load blogs. Check Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase.from("blogs").update({ published: !published }).eq("id", id);
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b)));
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await supabase.from("blogs").delete().eq("id", id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex justify-between items-end mb-10"
      >
        <div>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Content</span>
          <h1 className="font-display text-5xl italic tracking-tighter mt-1">All Posts</h1>
        </div>
        <Link href="/admin/blogs/new">
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-technical text-xs uppercase tracking-widest"
          >
            <Plus size={14} />
            New Post
          </motion.button>
        </Link>
      </motion.div>

      {loading && <p className="font-technical text-xs text-muted-foreground">Loading posts...</p>}
      {error && <p className="font-technical text-xs text-destructive border border-destructive/30 bg-destructive/5 px-4 py-3">{error}</p>}

      {!loading && !error && blogs.length === 0 && (
        <div className="border border-dashed border-border p-12 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">No posts yet</p>
          <p className="font-technical text-xs text-muted-foreground mt-2">Create your first blog post to get started</p>
        </div>
      )}

      <div className="space-y-2">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: i * 0.04 }}
            className="flex items-center gap-4 border border-border p-4 bg-background/50 hover:border-primary/30 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg italic tracking-tight truncate">{blog.title}</h3>
                {blog.featured && (
                  <span className="font-technical text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-0.5 shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                {blog.topic} · {new Date(blog.created_at).toLocaleDateString()} · {blog.views} views
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`font-technical text-[9px] uppercase tracking-widest px-2 py-1 border ${blog.published ? "text-green-400 border-green-400/30 bg-green-400/5" : "text-muted-foreground border-border"}`}>
                {blog.published ? "Live" : "Draft"}
              </span>

              <button
                onClick={() => togglePublish(blog.id, blog.published)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title={blog.published ? "Unpublish" : "Publish"}
              >
                {blog.published ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>

              <Link href={`/admin/blogs/${blog.id}/edit`}>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
              </Link>

              <Link href={`/blog/${blog.slug}`} target="_blank">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="View">
                  <ExternalLink size={14} />
                </button>
              </Link>

              <button
                onClick={() => deleteBlog(blog.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
