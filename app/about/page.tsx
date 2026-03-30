import { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About | Midhun NK",
  description: "Learn more about my background, skills, and journey as a developer.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <AboutClient />
    </div>
  );
}