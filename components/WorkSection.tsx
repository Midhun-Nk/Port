"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

interface WorkSectionProps {
  onViewEnter: () => void;
  onViewLeave: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

type ProjectCategory = "All" | "Website" | "App" | "Open Source" | "Fullstack";

const filters: ProjectCategory[] = ["All", "Website", "App", "Fullstack", "Open Source"];

// Added 'description' to match the Freelance data structure and fill out the card content
const projects = [
  { 
    id: "01", 
    title: "ResQLink Management", 
    description: "An advanced emergency response platform that enables faster coordination, real-time alerts, and smarter decision making.",
    category: "Fullstack" as const, 
    year: "2025", 
    image: "/projects/resqlink.png", 
    tools: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, 
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }, 
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ],
    link: "#"
  },
  { 
    id: "02", 
    title: "LearnStak",
    description: "Master programming with interactive tutorials, hands-on coding challenges, real-world projects, and industry-recognized certifications.", 
    category: "App" as const, 
    year: "2026", 
    image: "/projects/learnstak.png", 
    tools: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, 
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
    ],
    link: "#" 
  },
  { 
    id: "03", 
    title: "CodeSynz", 
    description: "An open-source collaboration tool designed to synchronize development environments across remote teams instantly.",
    category: "Open Source" as const, 
    year: "2024", 
    image: "/projects/codesynz.png", 
    tools: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, 
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
    ],
    link: "#" 
  },
  { 
    id: "04", 
    title: "Agency Landing Page", 
    description: "A high-performance landing page tailored for creative agencies, featuring smooth scroll animations and dynamic content routing.",
    category: "Website" as const, 
    year: "2024", 
    image: "/projects/syncflow.png", 
    tools: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, 
      { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" }
    ],
    link: "#" 
  },
  { 
    id: "05", 
    title: "Task Management App", 
    description: "A collaborative task tracking application allowing users to assign, monitor, and complete project milestones in real-time.",
    category: "App" as const, 
    year: "2024", 
    image: "/task-app.png", 
    tools: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, 
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ],
    link: "#" 
  },
  { 
    id: "06", 
    title: "Restaurant Website", 
    description: "A modern web presence for a boutique restaurant, including an interactive menu, reservation system, and location details.",
    category: "Website" as const, 
    year: "2023", 
    image: "/restaurant-site.jpg", 
    tools: [
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }, 
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
    ],
    link: "#" 
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const WorkSection = ({ onViewEnter, onViewLeave, onPointerEnter, onPointerLeave }: WorkSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // First 4 in the grid, rest scroll horizontally
  const gridProjects = filtered.slice(0, 4);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.85 + 32; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="px-8 md:px-12">
      <div className="flex justify-between items-end mb-10 border-b border-border pb-6">
        <div>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Selected Work</span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Projects</h2>
        </div>

        <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase hidden md:inline-block">
          {filtered.length} Projects
        </span>

        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 border border-border bg-background/80 backdrop-blur-sm text-primary hover:bg-primary/10 transition-colors duration-300"
            aria-label="Scroll left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 border border-border bg-background/80 backdrop-blur-sm text-primary hover:bg-primary/10 transition-colors duration-300"
            aria-label="Scroll right"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

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

      <div 
        ref={scrollContainerRef}
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 gap-8 pb-8 -mx-8 px-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <AnimatePresence mode="popLayout">
          {gridProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewEnter={onViewEnter}
              onViewLeave={onViewLeave}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            />
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
};

interface ProjectCardProps {
  project: { id: string; title: string; description: string; category: string; year: string; image: string; link: string; tools?: { name: string; icon: string }[] };
  onViewEnter: () => void;
  onViewLeave: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ProjectCard = ({ project, onViewEnter, onViewLeave, onPointerEnter, onPointerLeave }: ProjectCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5, ease }}
    className="w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center md:snap-align-none"
  >
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease }}
      className="group block border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-300 h-full rounded-lg flex flex-col"
    >
      {/* Image Section */}
      <div 
        className="overflow-hidden relative w-full shrink-0 aspect-[16/10]"
        onMouseEnter={onViewEnter}
        onMouseLeave={onViewLeave}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover block scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        
        {/* Hover Arrow */}
        <div className="absolute top-4 right-4 p-2 border border-border bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={14} className="text-primary" />
        </div>

        {/* Category Badge - Positioned identically to the 'status' badge in Freelance */}
        <div className="absolute bottom-4 left-6">
          <span className="font-technical text-[9px] uppercase tracking-widest text-primary border border-primary/40 bg-primary/10 px-2 py-1 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest">
              Project {project.id}
            </p>
            <h3 className="font-display text-xl md:text-2xl italic tracking-tight mt-1 text-primary">
              {project.title}
            </h3>
          </div>
          <span className="font-technical text-[10px] text-muted-foreground tracking-widest mt-1">
            {project.year}
          </span>
        </div>

        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>

        {project.tools && (
          <div className="flex flex-wrap gap-2 pt-3.5 border-t border-border/50 mt-auto">
            {project.tools.map((tool) => (
              <span
                key={tool.name}
                className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1 border border-border/60 group-hover:border-primary/20 group-hover:text-foreground transition-colors duration-300"
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                {tool.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  </motion.div>
);

export default WorkSection;