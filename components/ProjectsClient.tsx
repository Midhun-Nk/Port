"use client";

import WorkSection from "@/components/WorkSection";
import { useCursor } from "@/components/CustomCursor";

export default function ProjectsClient() {
  const { setVariant } = useCursor();

  // We bring back your cursor logic here since this is a Client Component
  const cursorProps = {
    onPointerEnter: () => setVariant("pointer"),
    onPointerLeave: () => setVariant("default"),
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-display mb-12">All Projects</h1>
        
        <WorkSection
          onViewEnter={() => setVariant("view")}
          onViewLeave={() => setVariant("default")}
          {...cursorProps}
        />
      </div>
    </div>
  );
}