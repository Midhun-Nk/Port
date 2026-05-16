"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BlogEditor from "@/components/admin/BlogEditor";

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase.from("blogs").select("*").eq("id", params.id).single();
      if (data) {
        setBlog({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          subtopic: data.subtopic ?? "",
          youtube_url: data.youtube_url ?? "",
          cover_image: data.cover_image ?? "",
          og_image: data.og_image ?? "",
          seo_title: data.seo_title ?? "",
          seo_description: data.seo_description ?? "",
          seo_keywords: data.seo_keywords ?? "",
          read_time: data.read_time?.toString() ?? "",
        });
      }
      setLoading(false);
    };
    fetchBlog();
  }, [params.id]);

  if (loading) return <p className="font-technical text-xs text-muted-foreground pt-20 pl-8">Loading...</p>;
  if (!blog) return <p className="font-technical text-xs text-destructive pt-20 pl-8">Post not found.</p>;
  return <BlogEditor initialData={blog as Record<string, unknown> & { id: string }} isEdit />;
}
