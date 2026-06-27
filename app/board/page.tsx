"use client";

import { motion } from "framer-motion";
import SiteNavigation from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";
import BoardGrid from "@/components/board/BoardGrid";

export default function BoardPage() {
  return (
    <main className="min-h-screen page-shell">
      <SiteNavigation />

      <section className="pt-32 pb-16 gradient-scarlet relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-osu-gray-light-40 font-semibold uppercase tracking-widest text-sm mb-4">
              Leadership
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Meet Us
            </h1>
            <p className="text-xl text-white/85 max-w-2xl">
              The students leading MTC at Ohio State, building community,
              driving projects, and shaping the future of Muslim representation
              in tech.
            </p>
          </motion.div>
        </div>
      </section>

      <BoardGrid />

      <SiteFooter />
    </main>
  );
}
