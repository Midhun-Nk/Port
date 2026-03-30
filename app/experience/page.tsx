import { Metadata } from "next";
import ExperienceClient from "@/components/ExperienceClient";

export const metadata: Metadata = {
  title: "Experience | Midhun NK",
  description: "My professional work experience, roles, and software engineering history.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <ExperienceClient />
    </div>
  );
}