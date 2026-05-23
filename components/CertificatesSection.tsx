"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificatesSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const certificates = [
  {
    title: "Python & Django Development",
    issuer: "Udemy",
    year: "2025",
    image: "/certificates/certificate-1.png",
    description: "Comprehensive training in building scalable web applications, REST APIs, and server-side logic using Python and the Django framework.",
    skills: [
      { name: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
      { name: "bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" }
    ]
  },
  {
    title: "Data Structures Using Python",
    issuer: "Udemy",
    year: "2025",
    image: "/certificates/certificate-2.png",
    description: "Mastery of fundamental data structures, algorithms, search/sort techniques, and complexity analysis using Python for optimized problem-solving.",
    skills: [
      { name: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "DSA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },
  {
    title: "IEEE SPS Kerala Chapter",
    issuer: "MDIT",
    year: "2024",
    image: "/certificates/certificate-3.png",
    description: "Collaborative training and development workshops focusing on signal processing, fullstack applications, and technical leadership.",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2024",
    image: "/certificates/certificate-4.png",
    description: "Solid foundations in modern responsive layout design, HTML5, CSS3, accessibility standards, flexbox/grid, and media queries.",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  },
  {
    title: "Python Internship",
    issuer: "Revertech IT Solution",
    year: "2023",
    image: "/certificates/certificate-5.png",
    description: "Hands-on industrial internship working on real-world backend automation, scripting, API design, and PostgreSQL integration.",
    skills: [
      { name: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },
  {
    title: "Full Stack Developer",
    issuer: "Edunet Foundation",
    year: "2025",
    image: "/certificates/certificate-6.png",
    description: "End-to-end full-stack development experience building RESTful architectures using React, Express, Node.js, and MongoDB.",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  },
  {
    title: "Introduction to SQL",
    issuer: "SkillUp",
    year: "2025",
    image: "/certificates/certificate-7.png",
    description: "Relational database design, query optimization, complex joins, indexing, and transactional database management using MySQL and PostgreSQL.",
    skills: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  },
  {
    title: "Python & Django REST API",
    issuer: "Udemy",
    year: "2025",
    image: "/certificates/certificate-8.png",
    description: "Advanced API development, covering token authentication, throttling, serializers, viewsets, and DRF unit testing.",
    skills: [
      { name: "django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
      { name: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  },
];

// Sort certificates from newest to oldest
const sortedCertificates = [...certificates].sort((a, b) => Number(b.year) - Number(a.year));

const CertificatesSection = ({ onPointerEnter, onPointerLeave }: CertificatesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="certificates" className="px-8 md:px-12 py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-border pb-6">
          <div>
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Credentials Registry</span>
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Certificates</h2>
          </div>
          <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase hidden md:inline-block">
            {sortedCertificates.length} Records Indexed
          </span>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Certificate Rows */}
          <div className="col-span-12 md:col-span-7 flex flex-col border-t border-border">
            {sortedCertificates.map((cert, i) => {
              const isActive = activeIndex === i;
              const formattedIndex = String(i + 1).padStart(2, "0");

              return (
                <div
                  key={i}
                  onMouseEnter={() => {
                    setActiveIndex(i);
                    onPointerEnter();
                  }}
                  onMouseLeave={onPointerLeave}
                  onClick={() => setActiveIndex(i)}
                  className={`border-b border-border py-6 transition-all duration-300 cursor-pointer group rounded-none relative overflow-hidden px-4 md:px-6 ${
                    isActive 
                      ? "bg-primary/[0.02] border-b-primary shadow-[inset_4px_0_0_0_hsl(var(--primary))]" 
                      : "hover:bg-primary/[0.005] hover:border-b-primary/50"
                  }`}
                >
                  {/* Top line of metadata */}
                  <div className="flex items-center justify-between gap-4 mb-2 font-technical text-[10px] uppercase tracking-widest">
                    <span className={`transition-colors ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}>
                      [{formattedIndex}]
                    </span>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">{cert.issuer}</span>
                      <span className="text-primary">{cert.year}</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className={`font-display text-xl md:text-2xl italic tracking-tight transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-foreground group-hover:text-primary/80"
                  }`}>
                    {cert.title}
                  </h3>

                  {/* Expandable Details Container */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 flex flex-col gap-4">
                      {/* Description */}
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest text-primary/80 px-2 py-1 border border-primary/30 group-hover:border-primary/50 group-hover:text-primary bg-primary/[0.01] transition-all duration-300 rounded-none"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-3.5 h-3.5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                              loading="lazy"
                            />
                            {skill.name}
                          </span>
                        ))}
                      </div>

                      {/* Mobile Only: Inline Image Preview */}
                      <div className="block md:hidden mt-4 border border-primary/30 bg-muted/20 w-full overflow-hidden aspect-[4/3] rounded-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cert.image}
                          alt={`${cert.title} Preview`}
                          className="w-full h-full object-cover scale-95"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky technical preview panel (Desktop only) */}
          <div className="hidden md:block md:col-span-5 relative">
            <div className="sticky top-32 w-full flex flex-col">
              {/* Technical framing decoration */}
              <div className="flex justify-between items-center text-[9px] font-technical text-primary/60 uppercase tracking-widest px-3 py-1.5 border-t border-x border-primary/30 bg-primary/[0.01]">
                <span>[CREDENTIAL-PREVIEW: {String(activeIndex + 1).padStart(2, "0")}]</span>
                <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
              </div>

              {/* Main Image Frame */}
              <div className="w-full aspect-[4/3] border border-primary/30 bg-card/20 backdrop-blur-md overflow-hidden relative group rounded-none flex items-center justify-center p-4">
                {/* Visual grid line overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease }}
                    className="w-full h-full relative"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sortedCertificates[activeIndex].image}
                      alt={sortedCertificates[activeIndex].title}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] scale-95"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lower frame decoration */}
              <div className="flex justify-between items-center text-[8px] font-technical text-muted-foreground uppercase tracking-widest px-3 py-2 border-b border-x border-primary/30 bg-primary/[0.01]">
                <span>SYS.STATUS: ACTIVE_DECRYPT</span>
                <span>MD5_VERIFIED</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;