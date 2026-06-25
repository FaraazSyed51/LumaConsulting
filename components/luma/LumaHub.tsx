"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import SiteNavigation from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";

const paths = [
  {
    href: "/luma/students",
    icon: GraduationCap,
    label: "For Students",
    headline: "Join a project team",
    description:
      "Join live project teams with real partners. Rank the ones you want and apply in one place.",
    cta: "View projects & apply",
    accent: "from-osu-scarlet to-osu-scarlet-dark-40",
  },
  {
    href: "/luma/partners",
    icon: Building2,
    label: "For Partners",
    headline: "Start a project with us",
    description:
      "Businesses, nonprofits, and masjids — get real technical work done by OSU students with MTC support from kickoff to delivery.",
    cta: "Partner with Luma",
    accent: "from-osu-gray-dark-80 to-osu-gray-dark-60",
  },
];

export default function LumaHub() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation />

      <section className="relative pt-32 pb-20 gradient-scarlet overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80 font-semibold uppercase tracking-widest text-sm mb-4"
          >
            Luma Consulting
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Real projects.
            <br />
            <span className="text-osu-gray-light-40">Built at Ohio State.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Luma connects OSU students with partners who need real technical work —
            and gives both sides the structure to actually ship.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-section-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-osu-gray-dark-40 mb-10 text-lg">
            Choose your path
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path, index) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                >
                  <Link
                    href={path.href}
                    className="group block h-full rounded-2xl bg-white border border-osu-gray-light-40 overflow-hidden shadow-sm hover:shadow-xl hover:border-osu-scarlet/20 transition-all duration-300"
                  >
                    <div className={`h-2 bg-gradient-to-r ${path.accent}`} />
                    <div className="p-8 md:p-10">
                      <div className="w-14 h-14 rounded-xl bg-osu-scarlet/10 text-osu-scarlet flex items-center justify-center mb-6 group-hover:bg-osu-scarlet group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className="text-xs font-semibold text-osu-scarlet uppercase tracking-wider mb-2">
                        {path.label}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-osu-gray-dark-80 mb-3">
                        {path.headline}
                      </h2>
                      <p className="text-osu-gray-dark-40 leading-relaxed mb-6">
                        {path.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-osu-scarlet font-semibold group-hover:gap-3 transition-all">
                        {path.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
