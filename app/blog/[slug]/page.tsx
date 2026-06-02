import { supabase } from "@/lib/supabase";
import BlogPostClient from "./BlogPostClient";

const staticExportFallbackParams = [{ slug: "__static_export_placeholder__" }];

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

export default function BlogPostPage() {
  return <BlogPostClient />;
}
