"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface StackSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    title: "Frontend",
    tools: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    ],
  },
  {
    title: "Backend",
    tools: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  {
    title: "DevOps & Tools",
    tools: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
  {
    title: "Content",
    tools: [
      { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
      { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
      { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
    ],
  },
];

const StackSection = ({ onPointerEnter, onPointerLeave }: StackSectionProps) => {
  const [activeTab, setActiveTab] = useState(categories[0].title);

  // Reusable component for the tool chips so we don't repeat code
  const renderTools = (tools: typeof categories[0]["tools"]) => (
    <div className="flex flex-wrap gap-3">
      {tools.map((tool) => (
        <motion.span
          key={tool.name}
          whileHover={{ scale: 1.08, y: -3 }}
          transition={{ duration: 0.3, ease }}
          onMouseEnter={onPointerEnter}
          onMouseLeave={onPointerLeave}
          className="flex items-center gap-2.5 font-technical text-[11px] uppercase tracking-[0.12em] px-5 py-3 border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-500 rounded-sm"
        >
          <img
            src={tool.icon}
            alt={tool.name}
            className="w-5 h-5 object-contain"
            loading="lazy"
          />
          {tool.name}
        </motion.span>
      ))}
    </div>
  );

  return (
    <section id="stack" className="px-8 md:px-12 relative z-10 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex justify-between items-end mb-10 md:mb-16 border-b border-border pb-6">
          <div>
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Technologies</span>
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">My Stack</h2>
          </div>
        </div>

        {/* ========================================= */}
        {/* MOBILE VIEW (Filter Tabs instead of Grid) */}
        {/* ========================================= */}
        <div className="md:hidden block">
          {/* Scrollable Tabs */}
          <div className="flex gap-3 overflow-x-auto snap-x pb-6 -mx-8 px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(cat.title)}
                className={`shrink-0 snap-center font-technical text-[11px] uppercase tracking-[0.12em] px-5 py-2.5 border transition-all duration-300 rounded-full ${activeTab === cat.title
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Category Content (Animated) */}
          <div className="mt-2 min-h-[300px]">
            <AnimatePresence mode="wait">
              {categories.map((cat) =>
                cat.title === activeTab ? (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {renderTools(cat.tools)}
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================= */}
        {/* DESKTOP VIEW (Full Grid)                  */}
        {/* ========================================= */}
        <div className="hidden md:grid md:grid-cols-2 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="group"
            >
              <h3 className="font-display text-2xl italic mb-6 text-foreground">
                {cat.title}<span className="text-primary">.</span>
              </h3>
              {renderTools(cat.tools)}
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default StackSection;