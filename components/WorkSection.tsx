"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface WorkSectionProps {
  onViewEnter: () => void;
  onViewLeave: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

type ProjectCategory = "All" | "Website" | "App" | "Open Source" | "Fullstack";

const filters: ProjectCategory[] = ["All", "Website", "App", "Fullstack", "Open Source"];

const projects = [
  { id: "01", title: "ResQLink Management", category: "Fullstack" as const, year: "2025", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80", tools: [{ name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }, { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }] },
  { id: "02", title: "Content Dashboard", category: "App" as const, year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80", tools: [{ name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }] },
  { id: "03", title: "Portfolio Generator", category: "Open Source" as const, year: "2024", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80", tools: [{ name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }] },
  { id: "04", title: "Agency Landing Page", category: "Website" as const, year: "2024", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", tools: [{ name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" }] },
  { id: "05", title: "Task Management App", category: "App" as const, year: "2024", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80", tools: [{ name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }] },
  { id: "06", title: "Restaurant Website", category: "Website" as const, year: "2023", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", tools: [{ name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }, { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }] },
];

const ease = [0.16, 1, 0.3, 1] as const;

const WorkSection = ({ onViewEnter, onViewLeave, onPointerEnter, onPointerLeave }: WorkSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // First 4 in the grid, rest scroll horizontally (if you want all to show, just use `filtered` instead of `gridProjects`)
  const gridProjects = filtered.slice(0, 4);

  return (
    <section className="px-8 md:px-12">
      <div className="flex justify-between items-end mb-10 border-b border-border pb-6">
        <div>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Selected Work</span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Projects</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
            className={`font-technical text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 border transition-all duration-300 ${activeFilter === f
              ? "border-primary text-primary bg-primary/10"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Responsive Container: Flex/Horizontal Scroll on Mobile -> Grid on Desktop */}
      <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 gap-8 pb-8 -mx-8 px-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence mode="popLayout">
          {gridProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewEnter={onViewEnter}
              onViewLeave={onViewLeave}
            />
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
};

interface ProjectCardProps {
  project: { id: string; title: string; category: string; year: string; image: string; tools?: { name: string; icon: string }[] };
  onViewEnter: () => void;
  onViewLeave: () => void;
}

const ProjectCard = ({ project, onViewEnter, onViewLeave }: ProjectCardProps) => (
  <motion.article
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5, ease }}
    // UPDATED CLASSES: Added w-[85vw] for mobile sizing, shrink-0 to prevent squishing, and snap-center for swipe snapping.
    className="group w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center md:snap-align-none flex flex-col"
  >
    <div
      onMouseEnter={onViewEnter}
      onMouseLeave={onViewLeave}
      className="relative aspect-[16/10] overflow-hidden rounded-sm"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.2, ease }}
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute top-3 right-3 font-technical text-[9px] text-primary-foreground bg-primary/80 backdrop-blur-sm px-3 py-1 uppercase tracking-widest">
        {project.category}
      </div>
    </div>
    <div className="flex justify-between items-start mt-4">
      <div>
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
          Project {project.id}
        </span>
        <h3 className="font-display text-xl md:text-2xl italic mt-1">{project.title}</h3>
      </div>
      <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase">
        {project.year}
      </span>
    </div>
    {project.tools && (
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tools.map((tool) => (
          <span
            key={tool.name}
            className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-border text-muted-foreground bg-primary/5 rounded-sm"
          >
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-3.5 h-3.5 object-contain"
              loading="lazy"
            />
            {tool.name}
          </span>
        ))}
      </div>
    )}
  </motion.article>
);

export default WorkSection;