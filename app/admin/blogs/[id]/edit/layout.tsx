import { supabase } from "@/lib/supabase";

const staticExportFallbackParams = [{ id: "__static_export_placeholder__" }];

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("blogs").select("id");

    if (!data || data.length === 0) return staticExportFallbackParams;

    return data.map((blog) => ({
      id: blog.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for admin blogs:", error);
    return staticExportFallbackParams;
  }
}

export default function AdminBlogEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
