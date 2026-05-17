import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("blogs").select("id");

    if (!data) return [];

    return data.map((blog) => ({
      id: blog.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for admin blogs:", error);
    return [];
  }
}

export default function AdminBlogEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
