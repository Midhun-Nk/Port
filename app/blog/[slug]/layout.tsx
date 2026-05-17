import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from("blogs")
      .select("slug")
      .eq("published", true);

    if (!data) return [];

    return data.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [];
  }
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
