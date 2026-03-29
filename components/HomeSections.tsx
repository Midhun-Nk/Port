"use client";

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import StackSection from "@/components/StackSection";
import WorkSection from "@/components/WorkSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import ContentSection from "@/components/ContentSection";
import FreelanceSection from "@/components/FreelanceSection";
import { useCursor } from "@/components/CustomCursor";

export default function HomeSections() {
  const { setVariant } = useCursor();

  const cursorProps = {
    onPointerEnter: () => setVariant("pointer"),
    onPointerLeave: () => setVariant("default"),
  };

  return (
    <>
      <Hero
        {...cursorProps}
        onViewEnter={() => setVariant("view")}
        onViewLeave={() => setVariant("default")}
      />
      <AboutSection {...cursorProps} />
      <ContentSection {...cursorProps} />
      <ExperienceSection {...cursorProps} />
      <FreelanceSection {...cursorProps} />
      <StackSection {...cursorProps} />
      <section id="projects">
        <WorkSection
          onViewEnter={() => setVariant("view")}
          onViewLeave={() => setVariant("default")}
          {...cursorProps}
        />
      </section>
      <CertificatesSection {...cursorProps} />
      <ContactSection {...cursorProps} />
    </>
  );
}