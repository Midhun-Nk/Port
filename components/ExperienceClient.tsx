"use client";

import ExperienceSection from "@/components/ExperienceSection";
import { useCursor } from "@/components/CustomCursor";

export default function ExperienceClient() {
  const { setVariant } = useCursor();

  return (
    <ExperienceSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}