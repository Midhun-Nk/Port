import { Metadata } from "next";
// You can create a specific Client Component for projects, just like we did for HomeSections
import ProjectsClient from "@/components/ProjectsClient"; 

export const metadata: Metadata = {
  title: "Projects | Midhun NK",
  description: "A deep dive into my recent freelance work and fullstack applications.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}