"use client";

import Hero from "@/components/Hero";
import { useCursor } from "@/components/CustomCursor";

export default function HomeClient() {
  const { setVariant } = useCursor();

  return (
    <Hero
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
      onViewEnter={() => setVariant("view")}
      onViewLeave={() => setVariant("default")}
    />
  );
}