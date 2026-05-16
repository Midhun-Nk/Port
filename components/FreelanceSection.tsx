"use client";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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
    image: "/freelance/fineway.png",
    link: "https://www.finewaytravels.com/",
  },
  {
    client: "Mike Studio",
    project: "LearnStak",
    description: "An educational learning platform for students and professionals with Roadmap and Learning Paths, complete documentation, and resource management.",
    tech: ["Next.js", "Supabase", "FastAPI", "Tailwindcss"],
    duration: "2 months",
    year: "2025",
    status: "Delivered",
    image: "/freelance/learnstak.png",
    link: "https://learnstak.com/",
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
};

const ease = [0.16, 1, 0.3, 1] as const;

const FreelanceSection = ({ onPointerEnter, onPointerLeave }: FreelanceSectionProps) => {
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
        <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase hidden md:inline-block">
          {freelanceProjects.length} Projects Delivered
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {freelanceProjects.map((project, i) => (
          <motion.div
            key={project.project}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={onPointerEnter}
              onMouseLeave={onPointerLeave}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease }}
              className="group block border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-300 h-full"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.project}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
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
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest">{project.client}</p>
                    <h3 className="font-display text-2xl italic tracking-tight mt-1 group-hover:text-primary transition-colors duration-300">
                      {project.project}
                    </h3>
                  </div>
                  <span className="font-technical text-[10px] text-muted-foreground tracking-widest mt-1">{project.year}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {project.tech.map((t) => {
                    const iconPath = techIconMap[t];
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest text-muted-foreground px-2.5 py-1.5 border border-border/60 group-hover:border-primary/20 group-hover:text-foreground transition-colors duration-300"
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
