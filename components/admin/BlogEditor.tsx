"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Star, StarOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

interface BlogData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  topic: string;
  subtopic: string;
  tags: string;
  cover_image: string;
  youtube_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image: string;
  published: boolean;
  featured: boolean;
  read_time: string;
  author: string;
}

interface Props {
  initialData?: Partial<BlogData> & { id?: string };
  isEdit?: boolean;
}

const defaultData: BlogData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  topic: "",
  subtopic: "",
  tags: "",
  cover_image: "",
  youtube_url: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  og_image: "",
  published: false,
  featured: false,
  read_time: "",
  author: "Midhun NK",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-border p-6 bg-background/50 space-y-4">
    <h3 className="font-technical text-[10px] uppercase tracking-widest text-primary border-b border-border pb-3">{title}</h3>
    {children}
  </div>
);

const Field = ({
  label, value, onChange, type = "text", placeholder = "", rows,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; rows?: number;
}) => (
  <div className="space-y-1">
    <label className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
    {rows ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-background border border-border px-4 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors resize-y text-foreground placeholder:text-muted-foreground/40"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border px-4 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/40"
      />
    )}
  </div>
);

export default function BlogEditor({ initialData, isEdit = false }: Props) {
  const [data, setData] = useState<BlogData>({ ...defaultData, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const set = (field: keyof BlogData) => (value: string | boolean) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (v: string) => {
    setData((prev) => ({
      ...prev,
      title: v,
      slug: isEdit ? prev.slug : slugify(v),
      seo_title: isEdit ? prev.seo_title : v,
    }));
  };

  const handleSlugChange = (v: string) => {
    set("slug")(slugify(v));
  };

  const handleSave = async (publish?: boolean) => {
    if (!data.title || !data.slug || !data.content) {
      setError("Title, slug, and content are required.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      topic: data.topic,
      subtopic: data.subtopic || null,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      cover_image: data.cover_image || null,
      youtube_url: data.youtube_url || null,
      seo_title: data.seo_title || data.title,
      seo_description: data.seo_description || data.excerpt,
      seo_keywords: data.seo_keywords || null,
      og_image: data.og_image || data.cover_image || null,
      published: publish !== undefined ? publish : data.published,
      featured: data.featured,
      read_time: data.read_time ? Number(data.read_time) : null,
      author: data.author,
    };

    try {
      if (isEdit && initialData?.id) {
        const { error } = await supabase.from("blogs").update(payload).eq("id", initialData.id);
        if (error) throw error;
        setSuccess("Post updated successfully!");
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) throw error;
        setSuccess("Post created successfully!");
        setTimeout(() => router.push("/admin/blogs"), 1500);
      }
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to save. Check Supabase connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex justify-between items-start mb-10"
      >
        <div>
          <Link href="/admin/blogs" className="flex items-center gap-2 font-technical text-[10px] text-muted-foreground uppercase tracking-widest mb-3 hover:text-primary transition-colors">
            <ArrowLeft size={12} /> All Posts
          </Link>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">{isEdit ? "Editing" : "New Post"}</span>
          <h1 className="font-display text-5xl italic tracking-tighter mt-1">{isEdit ? "Edit Post" : "Create Post"}</h1>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => set("featured")(!data.featured)}
            className={`flex items-center gap-1.5 px-3 py-2 border font-technical text-[10px] uppercase tracking-widest transition-all ${data.featured ? "border-primary/50 text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/30"}`}
          >
            {data.featured ? <Star size={12} /> : <StarOff size={12} />}
            {data.featured ? "Featured" : "Feature"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => set("published")(!data.published)}
            className={`flex items-center gap-1.5 px-3 py-2 border font-technical text-[10px] uppercase tracking-widest transition-all ${data.published ? "border-green-400/50 text-green-400 bg-green-400/5" : "border-border text-muted-foreground hover:border-primary/30"}`}
          >
            {data.published ? <Eye size={12} /> : <EyeOff size={12} />}
            {data.published ? "Published" : "Draft"}
          </motion.button>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            disabled={saving}
            onClick={() => handleSave()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-technical text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save"}
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 border border-destructive/30 bg-destructive/5 px-4 py-3 font-technical text-xs text-destructive">
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 border border-green-400/30 bg-green-400/5 px-4 py-3 font-technical text-xs text-green-400">
          {success}
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Core */}
        <Section title="Core Content">
          <Field label="Title *" value={data.title} onChange={handleTitleChange} placeholder="My Amazing Blog Post" />
          <Field label="Slug *" value={data.slug} onChange={handleSlugChange} placeholder="my-amazing-blog-post" />
          <Field label="Excerpt / Summary" value={data.excerpt} onChange={set("excerpt")} rows={3} placeholder="A brief description shown in listings..." />
          <Field label="Full Content (Markdown or HTML) *" value={data.content} onChange={set("content")} rows={16} placeholder="Write your full blog post content here. Supports Markdown..." />
        </Section>

        {/* Classification */}
        <Section title="Topic & Classification">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Topic / Category" value={data.topic} onChange={set("topic")} placeholder="Web Development" />
            <Field label="Subtopic" value={data.subtopic} onChange={set("subtopic")} placeholder="Next.js" />
          </div>
          <Field label="Tags (comma-separated)" value={data.tags} onChange={set("tags")} placeholder="react, nextjs, typescript, tutorial" />
        </Section>

        {/* Media */}
        <Section title="Media">
          <Field label="Cover Image URL" value={data.cover_image} onChange={set("cover_image")} type="url" placeholder="https://..." />
          <Field label="YouTube Video URL (optional)" value={data.youtube_url} onChange={set("youtube_url")} type="url" placeholder="https://youtube.com/watch?v=..." />
        </Section>

        {/* SEO */}
        <Section title="SEO & Social">
          <Field label="SEO Title" value={data.seo_title} onChange={set("seo_title")} placeholder="My Amazing Post | Midhun NK" />
          <Field label="SEO Description (150-160 chars)" value={data.seo_description} onChange={set("seo_description")} rows={2} placeholder="Optimized description for search engines..." />
          <Field label="SEO Keywords (comma-separated)" value={data.seo_keywords} onChange={set("seo_keywords")} placeholder="react, web dev, fullstack" />
          <Field label="OG Image URL (for social sharing)" value={data.og_image} onChange={set("og_image")} type="url" placeholder="https://... (defaults to cover image)" />
        </Section>

        {/* Meta */}
        <Section title="Post Meta">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Author" value={data.author} onChange={set("author")} placeholder="Midhun NK" />
            <Field label="Read Time (minutes)" value={data.read_time} onChange={set("read_time")} type="number" placeholder="5" />
          </div>
        </Section>
      </div>
    </div>
  );
}
