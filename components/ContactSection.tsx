"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Link,
  Play,
  X,
  Camera
} from "lucide-react";

interface ContactSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  { name: "GitHub", icon: GitBranch, url: "#" },
  { name: "LinkedIn", icon: Link, url: "#" },
  { name: "YouTube", icon: Play, url: "#" },
  { name: "Twitter / X", icon: X, url: "#" },
  { name: "Instagram", icon: Camera, url: "#" },
];

const contactInfo = [
  {
    icon: Mail,
    title: "MAIL US",
    lines: ["hello@midhunnk.dev", "contact@midhunnk.dev"],
  },
  {
    icon: Phone,
    title: "CONTACT US",
    lines: ["+91 123-456-7890", "+91 098-765-4321"],
  },
  {
    icon: MapPin,
    title: "LOCATION",
    lines: ["Kerala, India"],
  },
];

const ContactSection = ({ onPointerEnter, onPointerLeave }: ContactSectionProps) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="px-8 md:px-12 py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="grid grid-cols-12 gap-8 md:gap-16"
      >
        {/* Left - Contact Info + Socials */}
        <div className="col-span-12 md:col-span-5 flex flex-col">
          {/* Increased text-[10px] to text-xs */}
          <span className="font-technical text-xs font-medium text-[#D4AF37] uppercase tracking-widest mb-8 block">
            Contact Info
          </span>

          <div className="space-y-8">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  {/* Increased text-[10px] to text-xs */}
                  <span className="font-technical text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">
                    {item.title}
                  </span>
                  {item.lines.map((line) => (
                    // Increased text-sm to text-base
                    <p key={line} className="font-technical text-base text-foreground/80">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="mt-12"
          >
            {/* Increased text-[10px] to text-xs */}
            <span className="font-technical text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-5">
              Social Info
            </span>
            <div className="flex gap-3">
              {socials.map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease, delay: 0.5 + i * 0.05 }}
                    whileHover={{ y: -2 }}
                    onMouseEnter={onPointerEnter}
                    onMouseLeave={onPointerLeave}
                    className="relative overflow-hidden group w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-[#D4AF37] transition-colors duration-400"
                    title={social.name}
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                    <IconComponent className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-500" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right - Heading + Form */}
        <div className="col-span-12 md:col-span-7">
          <div className="bg-card/30 border border-border rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mb-10">
              Let's work <span className="text-[#D4AF37]">together</span><span className="text-[#D4AF37]">.</span>
            </h2>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    placeholder="Name *"
                    className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 font-technical text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    placeholder="Email *"
                    className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 font-technical text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-400"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  maxLength={200}
                  placeholder="Your Subject *"
                  className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 font-technical text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-400"
                />
              </div>
              <div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={4}
                  placeholder="Your Message *"
                  className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 font-technical text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-400 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                onMouseEnter={onPointerEnter}
                onMouseLeave={onPointerLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full font-technical text-[11px] uppercase tracking-[0.15em] px-10 py-4 bg-[#D4AF37] text-black rounded-lg transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg shadow-[#D4AF37]/20"
              >
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;