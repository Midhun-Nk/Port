import { Metadata } from "next";
import ContentClient from "@/components/ContentClient";

export const metadata: Metadata = {
  title: "Content Creation | Midhun NK",
  description: "Articles, videos, and tutorials I have created for the developer community.",
};

export default function ContentPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <ContentClient />
    </div>
  );
}