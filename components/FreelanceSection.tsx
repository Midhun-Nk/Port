
"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

interface FreelanceSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const freelanceProjects = [
  {
    client: "FineWay Travels",
    project: "Travellor Landing Page",
    description: "A responsive and dynamic landing page for a travel company. Built in Next.js and TailwindCSS with SEO-optimized structure and modern design.",
    tech: ["Next.js", "Tailwindcss"],
    duration: "1 month",
    year: "2025",
    status: "Delivered",
    image: "/freelance/finewaytravels.png",
    link: "https://www.finewaytravels.com/",
  },
  {
    client: "Mike Studio",
    project: "SyncFlow AI",
    description: "A premium AI-powered workflow automation dashboard built for seamless team collaboration and analytics monitoring.",
    tech: ["Next.js", "Supabase", "FastAPI", "Tailwindcss"],
    duration: "2 months",
    year: "2026",
    status: "Delivered",
    image: "/freelance/syncflow.png",
    link: "https://syncflow.ai/",
  },
  {
    client: "Mike Studio",
    project: "Mike Studio Portfolio",
    description: "An elegant, interactive creative agency portfolio website showcasing professional photography and design works.",
    tech: ["Next.js", "Framer Motion", "Tailwindcss"],
    duration: "2 months",
    year: "2026",
    status: "Delivered",
    image: "/freelance/mikestudio.png",
    link: "https://mikestudio.in/",
  }, {
    client: "Mike Studio",
    project: "Fashion E-commerce",
    description: "A luxury fashion e-commerce storefront featuring interactive product catalogs, cart management, and fluid page transitions.",
    tech: ["Next.js", "Tailwindcss", "Framer Motion"],
    duration: "2 months",
    year: "2026",
    status: "Delivered",
    image: "/freelance/fashion.png",
    link: "https://fashdeliveringfashion.vercel.app/",
  },
];

const techIconMap: Record<string, string> = {
  "React": "react/react-original.svg",
  "React Native": "react/react-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  "PostgreSQL": "postgresql/postgresql-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  "MongoDB": "mongodb/mongodb-original.svg",
  "Express": "express/express-original.svg",
  "MySQL": "mysql/mysql-original.svg",
  "Firebase": "firebase/firebase-plain.svg",
  "Tailwindcss": "tailwindcss/tailwindcss-original.svg",
  "FastAPI": "fastapi/fastapi-original.svg",
  "Supabase": "supabase/supabase-plain.svg",
  "Framer Motion": "framermotion/framermotion-original.svg",
};

const ease = [0.16, 1, 0.3, 1] as const;

const FreelanceSection = ({ onPointerEnter, onPointerLeave }: FreelanceSectionProps) => {
  // 1. Create a ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 2. Create the scroll function
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on the mobile card width (85vw + gap)
      const scrollAmount = window.innerWidth * 0.85 + 32; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="freelance" className="px-8 md:px-12 py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className="flex justify-between items-end mb-16 border-b border-border pb-6"
      >
        <div>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Client Work</span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Freelance</h2>
        </div>
        
        {/* Desktop View: Project Count */}
        <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase hidden md:inline-block">
          {freelanceProjects.length} Projects Delivered
        </span>

        {/* 3. Mobile View: Scroll Navigation Buttons */}
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
      </motion.div>

      {/* Responsive Container: Flex/Horizontal Scroll on Mobile -> Grid on Desktop */}
      <div 
        ref={scrollContainerRef}
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 gap-8 pb-8 -mx-8 px-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {freelanceProjects.map((project, i) => (
          <motion.div
            key={project.project}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
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
              className="group block border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-300 h-full rounded-lg"
            >
              {/* Image */}
              <div className="overflow-hidden relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.project}
                  className="w-full h-auto block scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                
                {/* REMOVED GRADIENT DIV FROM HERE
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" /> 
                */}

                <div className="absolute top-4 right-4 p-2 border border-border bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={14} className="text-primary" />
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="font-technical text-[9px] uppercase tracking-widest text-primary border border-primary/40 bg-primary/10 px-2 py-1">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest">{project.client}</p>
                    <h3 className="font-display text-xl md:text-2xl italic tracking-tight mt-1 text-primary">
                      {project.project}
                    </h3>
                  </div>
                  <span className="font-technical text-[10px] text-muted-foreground tracking-widest mt-1">{project.year}</span>
                </div>

                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-3.5 border-t border-border/50">
                  {project.tech.map((t) => {
                    const iconPath = techIconMap[t];
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1 border border-border/60 group-hover:border-primary/20 group-hover:text-foreground transition-colors duration-300"
                      >
                        {iconPath && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`}
                            alt={t}
                            className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FreelanceSection;

