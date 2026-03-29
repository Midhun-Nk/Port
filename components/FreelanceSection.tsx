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
  },
  {
    client: "FoodieHub",
    project: "Restaurant Ordering App",
    description: "Developed a cross-platform food ordering application with live order tracking, payment gateway, and admin panel.",
    tech: ["React Native", "Firebase", "Razorpay"],
    duration: "2 months",
    year: "2025",
    status: "Delivered",
  },
  {
    client: "EduLearn Academy",
    project: "Learning Management System",
    description: "Created an LMS platform with video streaming, quiz engine, progress tracking, and certificate generation.",
    tech: ["Next.js", "MongoDB", "AWS S3", "FFmpeg"],
    duration: "4 months",
    year: "2024",
    status: "Delivered",
  },
  {
    client: "HealthFirst Clinic",
    project: "Appointment Booking System",
    description: "Designed and developed an appointment scheduling system with doctor profiles, slot management, and SMS notifications.",
    tech: ["React", "Express", "Twilio", "MySQL"],
    duration: "6 weeks",
    year: "2024",
    status: "Delivered",
  },
  {
    client: "CryptoVault",
    project: "Portfolio Tracker",
    description: "Built a cryptocurrency portfolio tracker with real-time price feeds, alerts, and P&L analytics.",
    tech: ["React", "WebSocket", "CoinGecko API", "Chart.js"],
    duration: "5 weeks",
    year: "2024",
    status: "Delivered",
  },
];

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
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
            Client Work
          </span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">
            Freelance
          </h2>
        </div>
        <span className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase">
          {freelanceProjects.length} Projects Delivered
        </span>
      </motion.div>

      <div className="space-y-6">
        {freelanceProjects.map((project, i) => (
          <motion.div
            key={project.project}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
          >
            <motion.div
              onMouseEnter={onPointerEnter}
              onMouseLeave={onPointerLeave}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease }}
              className="group border border-border hover:border-primary/40 p-6 md:p-8 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                {/* Left: Index + Client */}
                <div className="flex items-center gap-6 md:w-1/4 flex-shrink-0">
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
                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 md:w-32 flex-shrink-0">
                  <span className="font-technical text-[10px] text-primary uppercase tracking-widest px-3 py-1 border border-primary/30 bg-primary/5">
                    {project.status}
                  </span>
                  <span className="font-technical text-[10px] text-muted-foreground tracking-widest">
                    {project.duration}
                  </span>
                  <span className="font-technical text-[10px] text-muted-foreground tracking-widest">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Tech tags */}
              <div className="relative z-10 flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/50">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-technical text-[9px] uppercase tracking-widest text-muted-foreground px-3 py-1.5 border border-border/60 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FreelanceSection;
