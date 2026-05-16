"use client";

import { motion } from "framer-motion";
import { FileText, Eye, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AdminDashboard() {
  const stats = [
    { label: "Total Posts", value: "—", icon: FileText },
    { label: "Published", value: "—", icon: Eye },
    { label: "Drafts", value: "—", icon: TrendingUp },
  ];

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Admin</span>
        <h1 className="font-display text-5xl md:text-6xl italic tracking-tighter mt-2">Dashboard</h1>
        <p className="font-technical text-xs text-muted-foreground mt-3 tracking-wide">
          Manage your blog content and site settings
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.05 }}
              className="border border-border p-6 bg-background/50"
            >
              <Icon size={20} className="text-primary mb-3" />
              <div className="font-display text-4xl italic tracking-tighter">{stat.value}</div>
              <div className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.3 }}
        className="mt-10 border border-border p-8 bg-background/50"
      >
        <h2 className="font-display text-2xl italic tracking-tighter mb-6">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/blogs/new">
            <motion.button
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-technical text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
              New Blog Post
            </motion.button>
          </Link>
          <Link href="/admin/blogs">
            <motion.button
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 px-6 py-3 border border-border font-technical text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <FileText size={16} />
              Manage Posts
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 border border-primary/20 bg-primary/5 p-6"
      >
        <p className="font-technical text-xs text-primary tracking-wide uppercase mb-2">Supabase Setup Required</p>
        <p className="font-technical text-xs text-muted-foreground leading-relaxed">
          Add <code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
          <code className="text-primary bg-primary/10 px-1">.env.local</code> file. Run the SQL migration in{" "}
          <code className="text-primary bg-primary/10 px-1">supabase/migrations/blogs.sql</code> to create the blogs table.
        </p>
      </motion.div>
    </div>
  );
}
