"use client";
import { motion } from "framer-motion";
import { Camera, Users, Heart, MessageCircle, Play, TrendingUp } from "lucide-react";

interface ContentSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { icon: Users, value: "10K+", label: "Followers" },
  { icon: Heart, value: "50K+", label: "Likes" },
  { icon: Play, value: "200+", label: "Reels" },
  { icon: TrendingUp, value: "500K+", label: "Reach" },
];

const reels = [
  {
    title: "5 VS Code Shortcuts You Need",
    views: "12.4K",
    likes: "1.2K",
    gradient: "from-rose-500/20 to-orange-500/20",
  },
  {
    title: "React Hooks Explained in 60s",
    views: "24.1K",
    likes: "3.4K",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Deploy Next.js in 30 Seconds",
    views: "8.7K",
    likes: "980",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Git Commands Every Dev Needs",
    views: "18.3K",
    likes: "2.1K",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
];

const topics = [
  "React Tips", "JavaScript", "CSS Tricks", "System Design",
  "Career Advice", "Dev Tools", "Node.js", "TypeScript",
];

const ContentSection = ({ onPointerEnter, onPointerLeave }: ContentSectionProps) => {
  return (
    <section id="content" className="px-8 md:px-12 py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease }}
      >
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-7">
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
              Content Creation
            </span>
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-4">
              Sharing knowledge<span className="text-primary">,</span>
              <br />
              one reel at a time<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 flex items-end">
            <p className="font-technical text-sm text-muted-foreground leading-relaxed">
              I create bite-sized software engineering content on Instagram — tips, tricks,
              and tutorials that help developers level up their skills. From React patterns
              to deployment hacks, I break down complex concepts into digestible reels.
            </p>
          </div>
        </div>

        {/* Instagram Card + Stats */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
            className="col-span-12 md:col-span-4 border border-border rounded-2xl p-8 bg-card/30 hover:border-primary/40 transition-colors duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="font-display text-xl italic text-foreground">M</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg italic tracking-tight text-foreground">
                  @midhunnk.dev
                </h3>
                <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest">
                  Software Engineer Tips
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-5 h-5 text-primary" />
              <span className="font-technical text-sm text-foreground/80">Instagram Creator</span>
            </div>

            <p className="font-technical text-xs text-muted-foreground leading-relaxed mb-6">
              Fullstack dev sharing daily tips on React, JavaScript, and modern web development.
              Making tech accessible, one post at a time. 🚀
            </p>

            <motion.a
              href="https://instagram.com/midhunnk.dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full text-center font-technical text-[11px] uppercase tracking-[0.15em] py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white rounded-lg transition-opacity hover:opacity-90"
            >
              Follow on Instagram
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -4 }}
                onMouseEnter={onPointerEnter}
                onMouseLeave={onPointerLeave}
                className="border border-border rounded-2xl p-6 bg-card/20 hover:border-primary/30 transition-all duration-500 flex flex-col justify-between"
              >
                <stat.icon className="w-6 h-6 text-primary mb-4" />
                <div>
                  <span className="font-display text-4xl md:text-5xl italic tracking-tighter text-foreground">
                    {stat.value}
                  </span>
                  <p className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Reels */}
        <div className="mb-12">
          <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest block mb-6">
            Popular Reels
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={onPointerEnter}
                onMouseLeave={onPointerLeave}
                className="group border border-border rounded-xl overflow-hidden bg-card/20 hover:border-primary/30 transition-all duration-500 cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${reel.gradient} flex items-center justify-center relative`}>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center border border-foreground/20"
                    whileHover={{ scale: 1.15 }}
                  >
                    <Play className="w-5 h-5 text-foreground ml-0.5" />
                  </motion.div>
                </div>
                <div className="p-4">
                  <h4 className="font-technical text-xs text-foreground font-medium mb-3 leading-relaxed">
                    {reel.title}
                  </h4>
                  <div className="flex items-center gap-4">
                    <span className="font-technical text-[10px] text-muted-foreground flex items-center gap-1">
                      <Play className="w-3 h-3" /> {reel.views}
                    </span>
                    <span className="font-technical text-[10px] text-muted-foreground flex items-center gap-1">
                      <Heart className="w-3 h-3" /> {reel.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest block mb-5">
            Topics I Cover
          </span>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic, i) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease, delay: 0.35 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                onMouseEnter={onPointerEnter}
                onMouseLeave={onPointerLeave}
                className="font-technical text-[11px] uppercase tracking-widest px-5 py-2.5 border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-400 cursor-default"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContentSection;
