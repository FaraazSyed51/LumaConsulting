"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

type LumaHeroProps = {
  variant: "student" | "partner";
};

const copy = {
  student: {
    badge: "Luma for Students",
    title: "Work on something real.",
    accent: "Ship it with a real partner.",
    body: "Luma places OSU students on live project teams with real partners. Submit one application, rank your preferences, and we'll match you to the best fit.",
    primary: { label: "Apply now", href: "#form" },
    secondary: { label: "See projects", href: "#projects" },
  },
  partner: {
    badge: "Luma for Partners",
    title: "Get work done.",
    accent: "Without the overhead.",
    body: "OSU students build websites, tools, and research for businesses, nonprofits, and masjids, with MTC mentoring the whole way.",
    primary: { label: "Start a project", href: "#form" },
    secondary: { label: "How it works", href: "#process" },
  },
};

export default function LumaHero({ variant }: LumaHeroProps) {
  const c = copy[variant];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const offset = href.startsWith("#") && document.querySelector(".luma-page") ? 132 : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden gradient-scarlet">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-16 left-8 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [45, 0, 45] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-16 right-8 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium"
        >
          {c.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
        >
          {c.title}
          <br />
          <span className="text-osu-gray-light-40">{c.accent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          {c.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo(c.primary.href)}
            className="px-8 py-4 bg-white text-osu-scarlet rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            {c.primary.label}
          </button>
          <button
            onClick={() => scrollTo(c.secondary.href)}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
          >
            {c.secondary.label}
          </button>
        </motion.div>

        <motion.button
          onClick={() => scrollTo(c.secondary.href)}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-white/70 hover:text-white"
          aria-label="Scroll down"
        >
          <ArrowDown size={28} />
        </motion.button>
      </div>
    </section>
  );
}
