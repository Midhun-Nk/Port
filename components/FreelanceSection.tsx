"use client";
import { motion } from "framer-motion";

interface FreelanceSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const freelanceProjects = [
  {
    client: "TechStartup Co.",
    project: "SaaS Dashboard",
    description: "Built a full-stack analytics dashboard with real-time data visualization, user management, and subscription billing integration.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    duration: "3 months",
    year: "2025",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    client: "FoodieHub",
    project: "Restaurant Ordering App",
    description: "Developed a cross-platform food ordering application with live order tracking, payment gateway, and admin panel.",
    tech: ["React Native", "Firebase", "Razorpay"],
    duration: "2 months",
    year: "2025",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
  },
  {
    client: "EduLearn Academy",
    project: "Learning Management System",
    description: "Created an LMS platform with video streaming, quiz engine, progress tracking, and certificate generation.",
    tech: ["Next.js", "MongoDB", "AWS S3", "FFmpeg"],
    duration: "4 months",
    year: "2024",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
  },
  {
    client: "HealthFirst Clinic",
    project: "Appointment Booking System",
    description: "Designed and developed an appointment scheduling system with doctor profiles, slot management, and SMS notifications.",
    tech: ["React", "Express", "Twilio", "MySQL"],
    duration: "6 weeks",
    year: "2024",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    client: "CryptoVault",
    project: "Portfolio Tracker",
    description: "Built a cryptocurrency portfolio tracker with real-time price feeds, alerts, and P&L analytics.",
    tech: ["React", "WebSocket", "CoinGecko API", "Chart.js"],
    duration: "5 weeks",
    year: "2024",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1605792657360-d58dbd42a6fb?q=80&w=1982&auto=format&fit=crop",
  },
];

// Map tech names to their specific Devicon SVG paths
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
  "AWS S3": "amazonwebservices/amazonwebservices-original-wordmark.svg",
};

const ease = [0.16, 1, 0.3, 1] as const;

const FreelanceSection = ({ onPointerEnter, onPointerLeave }: FreelanceSectionProps) => {
  return (
    <section id="freelance" className="px-8 md:px-12 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "-50px" }}
        transition={{ duration: 0.6, ease }}
        className="flex justify-between items-end mb-16 border-b border-border pb-6"
      >
        <div>
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
            Client Work
          </span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">
            Freelance
          </h2>
        </div>
        <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase hidden md:inline-block">
          {freelanceProjects.length} Projects Delivered
        </span>
      </motion.div>

      {/* UPDATED CONTAINER:
        Uses flex for mobile horizontal scroll, switches to flex-col on desktop.
        Hides scrollbar and enables edge-to-edge scrolling with negative margins.
      */}
      <div className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-6 pb-8 md:pb-0 -mx-8 px-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {freelanceProjects.map((project, i) => (
          <motion.div
            key={project.project}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            /* UPDATED ITEM SIZING: w-[85vw] on mobile to prevent shrinking, auto on desktop */
            className="will-change-[opacity,transform] w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center md:snap-align-none flex flex-col"
          >
            <motion.div
              onMouseEnter={onPointerEnter}
              onMouseLeave={onPointerLeave}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease }}
              /* Added h-full and flex-col so cards stretch equally on mobile */
              className="group border border-border hover:border-primary/40 p-6 md:p-8 transition-colors duration-300 relative overflow-hidden bg-background/50 backdrop-blur-sm transform-gpu h-full flex flex-col"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center flex-grow">

                {/* Expandable Image Preview (Optimized Transitions) */}
                <div className="w-full h-48 mb-6 md:mb-0 md:h-24 md:w-0 md:opacity-0 group-hover:md:w-48 group-hover:md:opacity-100 group-hover:md:mr-8 overflow-hidden rounded-lg transition-[width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 border border-border/20 shadow-xl relative will-change-[width,opacity]">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.project}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1 w-full">
                  {/* Left: Index + Client */}
                  <div className="flex items-start md:items-center gap-4 md:gap-6 md:w-1/4 flex-shrink-0">
                    <span className="font-display text-3xl md:text-4xl italic text-primary/30 group-hover:text-primary transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest">
                        {project.client}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl italic mt-1 group-hover:text-primary transition-colors duration-300">
                        {project.project}
                      </h3>
                    </div>
                  </div>

                  {/* Center: Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed md:flex-1">
                    {project.description}
                  </p>

                  {/* Right: Meta */}
                  <div className="flex flex-wrap md:flex-col items-center md:items-end gap-3 md:gap-2 md:w-32 flex-shrink-0">
                    <span className="font-technical text-[10px] text-primary uppercase tracking-widest px-3 py-1 border border-primary/30 bg-primary/5">
                      {project.status}
                    </span>
                    <span className="font-technical text-[10px] text-muted-foreground tracking-widest hidden md:block">
                      {project.duration}
                    </span>
                    <span className="font-technical text-[10px] text-muted-foreground tracking-widest hidden md:block">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech tags with Icons - Pushed to bottom using mt-auto on mobile */}
              <div className="relative z-10 flex flex-wrap gap-2 mt-auto md:mt-5 pt-5 border-t border-border/50">
                {project.tech.map((t) => {
                  const iconPath = techIconMap[t];
                  return (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 font-technical text-[9px] uppercase tracking-widest text-muted-foreground px-3 py-1.5 border border-border/60 group-hover:border-primary/20 group-hover:text-foreground transition-colors duration-300 bg-background/50"
                    >
                      {iconPath && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`}
                          alt={`${t} icon`}
                          loading="lazy"
                          decoding="async"
                          className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      {t}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FreelanceSection;