"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Star, StarOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ImageUpload from "./ImageUpload";

const ease = [0.16, 1, 0.3, 1] as const;

interface BlogData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string; // Summary
  content: string; // Optional full content
  topic: string;
  subtopic: string; // Category subtopic
  tags: string;
  cover_image: string; // Banner Image
  youtube_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image: string;
  published: boolean;
  featured: boolean;
  read_time: string;
  author: string;
  subtopics?: any[] | null;
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
  subtopics: [],
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

interface EditorSubtopic {
  title: string;
  image: string;
  details: string;
  unordered_list_raw: string;
  ordered_list_raw: string;
  video_url: string;
  web_url: string;
  code_snippet: string;
}

export default function BlogEditor({ initialData, isEdit = false }: Props) {
  const [data, setData] = useState<BlogData>({ ...defaultData, ...initialData });
  const [subtopics, setSubtopics] = useState<EditorSubtopic[]>(() => {
    if (initialData?.subtopics && Array.isArray(initialData.subtopics)) {
      return (initialData.subtopics as any[]).map((sub: any) => ({
        title: sub.title || "",
        image: sub.image || "",
        details: sub.details || "",
        unordered_list_raw: Array.isArray(sub.unordered_list) ? sub.unordered_list.join("\n") : "",
        ordered_list_raw: Array.isArray(sub.ordered_list) ? sub.ordered_list.join("\n") : "",
        video_url: sub.video_url || "",
        web_url: sub.web_url || "",
        code_snippet: sub.code_snippet || "",
      }));
    }
    return [];
  });
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

  const handleAddSubtopic = () => {
    setSubtopics((prev) => [
      ...prev,
      {
        title: "",
        image: "",
        details: "",
        unordered_list_raw: "",
        ordered_list_raw: "",
        video_url: "",
        web_url: "",
        code_snippet: "",
      },
    ]);
  };

  const handleRemoveSubtopic = (index: number) => {
    setSubtopics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveSubtopic = (index: number, direction: "up" | "down") => {
    setSubtopics((prev) => {
      const copy = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target >= 0 && target < copy.length) {
        const temp = copy[index];
        copy[index] = copy[target];
        copy[target] = temp;
      }
      return copy;
    });
  };

  const handleSubtopicFieldChange = (index: number, field: keyof EditorSubtopic, value: string) => {
    setSubtopics((prev) =>
      prev.map((sub, i) => (i === index ? { ...sub, [field]: value } : sub))
    );
  };

  const handleSave = async (publish?: boolean) => {
    if (!data.title || !data.slug) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content || "",
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
      subtopics: subtopics.map((sub) => ({
        title: sub.title || null,
        image: sub.image || null,
        details: sub.details || null,
        unordered_list: sub.unordered_list_raw
          ? sub.unordered_list_raw.split("\n").map((item) => item.trim()).filter(Boolean)
          : null,
        ordered_list: sub.ordered_list_raw
          ? sub.ordered_list_raw.split("\n").map((item) => item.trim()).filter(Boolean)
          : null,
        video_url: sub.video_url || null,
        web_url: sub.web_url || null,
        code_snippet: sub.code_snippet || null,
      })),
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
          <Field label="Summary" value={data.excerpt} onChange={set("excerpt")} rows={3} placeholder="A brief description shown in listings..." />
          <Field label="Full Content (Markdown or HTML) - Optional" value={data.content} onChange={set("content")} rows={10} placeholder="Write optional introductory content here..." />
        </Section>

        {/* Subtopics */}
        <div className="border border-border p-6 bg-background/50 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-technical text-[10px] uppercase tracking-widest text-primary">Subtopics / Content Sections</h3>
            <button
              type="button"
              onClick={handleAddSubtopic}
              className="px-3 py-1.5 border border-primary/30 text-primary hover:bg-primary/10 font-technical text-[9px] uppercase tracking-widest transition-all"
            >
              + Add Subtopic
            </button>
          </div>

          {subtopics.length === 0 ? (
            <p className="font-technical text-xs text-muted-foreground text-center py-8 border border-dashed border-border/60">
              No subtopics added yet. Click "+ Add Subtopic" to add sections to your post.
            </p>
          ) : (
            <div className="space-y-6">
              {subtopics.map((sub, idx) => (
                <div key={idx} className="border border-border p-5 bg-background/30 relative space-y-4">
                  {/* Subtopic Header Actions */}
                  <div className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">
                      Subtopic #{idx + 1}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSubtopic(idx, "up")}
                        className="px-2 py-0.5 border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground text-[9px] font-technical uppercase"
                        title="Move Up"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        disabled={idx === subtopics.length - 1}
                        onClick={() => handleMoveSubtopic(idx, "down")}
                        className="px-2 py-0.5 border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground text-[9px] font-technical uppercase"
                        title="Move Down"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtopic(idx)}
                        className="px-2 py-0.5 border border-destructive/40 text-destructive hover:text-destructive hover:bg-destructive/5 text-[9px] font-technical uppercase"
                        title="Remove Subtopic"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Subtopic Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Title</label>
                      <input
                        type="text"
                        value={sub.title}
                        onChange={(e) => handleSubtopicFieldChange(idx, "title", e.target.value)}
                        placeholder="e.g., 1. Setup Project"
                        className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      />
                    </div>
                    <ImageUpload
                      label="Subtopic Image"
                      value={sub.image}
                      onChange={(val) => handleSubtopicFieldChange(idx, "image", val)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Details / Paragraph Content</label>
                    <textarea
                      value={sub.details}
                      onChange={(e) => handleSubtopicFieldChange(idx, "details", e.target.value)}
                      rows={4}
                      placeholder="Add descriptive details here..."
                      className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground resize-y"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Code Snippet / Prompt</label>
                    <textarea
                      value={sub.code_snippet}
                      onChange={(e) => handleSubtopicFieldChange(idx, "code_snippet", e.target.value)}
                      rows={4}
                      placeholder="Enter code block or AI prompt here..."
                      className="w-full bg-background border border-border px-3 py-2 font-mono text-xs focus:border-primary focus:outline-none transition-colors text-foreground resize-y placeholder:text-muted-foreground/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Unordered List (One item per line)</label>
                      <textarea
                        value={sub.unordered_list_raw}
                        onChange={(e) => handleSubtopicFieldChange(idx, "unordered_list_raw", e.target.value)}
                        rows={3}
                        placeholder="First point&#10;Second point"
                        className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground resize-y"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Ordered List (One item per line)</label>
                      <textarea
                        value={sub.ordered_list_raw}
                        onChange={(e) => handleSubtopicFieldChange(idx, "ordered_list_raw", e.target.value)}
                        rows={3}
                        placeholder="Step 1 details&#10;Step 2 details"
                        className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground resize-y"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Video URL (e.g. YouTube URL)</label>
                      <input
                        type="url"
                        value={sub.video_url}
                        onChange={(e) => handleSubtopicFieldChange(idx, "video_url", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground">Website / Live Link URL</label>
                      <input
                        type="url"
                        value={sub.web_url}
                        onChange={(e) => handleSubtopicFieldChange(idx, "web_url", e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-background border border-border px-3 py-2 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Classification */}
        <Section title="Topic & Classification">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Topic / Category" value={data.topic} onChange={set("topic")} placeholder="Web Development" />
            <Field label="Subtopic Classification" value={data.subtopic} onChange={set("subtopic")} placeholder="Next.js" />
          </div>
          <Field label="Tags (comma-separated)" value={data.tags} onChange={set("tags")} placeholder="react, nextjs, typescript, tutorial" />
        </Section>

        {/* Media */}
        <Section title="Media">
          <ImageUpload
            label="Banner Image"
            value={data.cover_image}
            onChange={set("cover_image")}
          />
          <Field label="YouTube Video URL (optional)" value={data.youtube_url} onChange={set("youtube_url")} type="url" placeholder="https://youtube.com/watch?v=..." />
        </Section>

        {/* SEO */}
        <Section title="SEO & Social">
          <Field label="SEO Title" value={data.seo_title} onChange={set("seo_title")} placeholder="My Amazing Post | Midhun NK" />
          <Field label="SEO Description (150-160 chars)" value={data.seo_description} onChange={set("seo_description")} rows={2} placeholder="Optimized description for search engines..." />
          <Field label="SEO Keywords (comma-separated)" value={data.seo_keywords} onChange={set("seo_keywords")} placeholder="react, web dev, fullstack" />
          <Field label="OG Image URL (for social sharing)" value={data.og_image} onChange={set("og_image")} type="url" placeholder="https://... (defaults to banner image)" />
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
