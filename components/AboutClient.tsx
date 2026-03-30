"use client";

import AboutSection from "@/components/AboutSection";
import { useCursor } from "@/components/CustomCursor";

export default function AboutClient() {
  const { setVariant } = useCursor();

  return (
    <AboutSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}