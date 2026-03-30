"use client";

import ContentSection from "@/components/ContentSection";
import { useCursor } from "@/components/CustomCursor";

export default function ContentClient() {
  const { setVariant } = useCursor();

  return (
    <ContentSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}