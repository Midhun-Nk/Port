"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Access denied.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-12">
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Admin Access</span>
          <h1 className="font-display text-5xl md:text-6xl italic tracking-tighter mt-2">
            Sign In<span className="text-primary">.</span>
          </h1>
          <p className="font-technical text-xs text-muted-foreground mt-4 tracking-wide">
            Restricted area — authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background border border-border pl-10 pr-4 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors duration-300 text-foreground placeholder:text-muted-foreground/50"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-background border border-border pl-10 pr-12 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors duration-300 text-foreground placeholder:text-muted-foreground/50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-technical text-xs text-destructive tracking-wide border border-destructive/30 bg-destructive/5 px-4 py-3"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground font-technical text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
            <ArrowRight size={16} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
