import { supabase } from "@/lib/supabase";
import EditBlogClient from "./EditBlogClient";

const staticExportFallbackParams = [{ id: "__static_export_placeholder__" }];

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("blogs").select("id");

    if (!data || data.length === 0) return staticExportFallbackParams;

    return data.map((blog) => ({
      id: blog.id.toString(),
    }));
  } catch {
    return staticExportFallbackParams;
  }
}

export default function EditBlogPage() {
  return <EditBlogClient />;
}
