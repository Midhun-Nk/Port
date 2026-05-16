"use client";
import { motion } from "framer-motion";
const ease = [0.16, 1, 0.3, 1] as const;
export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Admin</span>
        <h1 className="font-display text-5xl italic tracking-tighter mt-1">Settings</h1>
      </motion.div>
      <div className="mt-10 border border-primary/20 bg-primary/5 p-6">
        <p className="font-technical text-xs text-primary tracking-wide uppercase mb-2">Environment Variables</p>
        <div className="space-y-3 font-technical text-xs text-muted-foreground leading-relaxed">
          <p><code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_SUPABASE_URL</code> — Your Supabase project URL</p>
          <p><code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> — Your Supabase anon key</p>
          <p><code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_ADMIN_EMAIL</code> — Admin login email (default: admin@midhunnk.com)</p>
          <p><code className="text-primary bg-primary/10 px-1">NEXT_PUBLIC_ADMIN_PASSWORD</code> — Admin login password (default: admin123)</p>
        </div>
      </div>
    </div>
  );
}
