"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Users,
  Code2,
  TrendingUp,
  Lock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  memberPerks,
  NATIONAL_MTC_MEMBERS_URL,
} from "@/data/membership";
import { NATIONAL_MTC_LABEL, MTC_OSU_DISCORD_URL } from "@/data/site";

const perkIcons = [Briefcase, Calendar, Users, Code2, TrendingUp, Lock];

export default function MemberBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-join" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
            Why Join MTC
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            More Than a Club. A Network
          </h2>
          <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-6" />
          <p className="text-xl text-osu-gray-dark-40 max-w-3xl mx-auto leading-relaxed">
            The member application on{" "}
            <a
              href={NATIONAL_MTC_MEMBERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-osu-scarlet font-semibold hover:underline"
            >
              {NATIONAL_MTC_LABEL}
            </a>{" "}
            gives you access to jobs, events, connections, projects, and
            member-only resources across the national network, plus everything
            our Ohio State chapter offers on campus.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {memberPerks.map((perk, index) => {
            const Icon = perkIcons[index] ?? Users;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-7 bg-white rounded-2xl border border-osu-gray-light-40 shadow-sm hover:shadow-md hover:border-osu-scarlet/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-osu-scarlet/10 text-osu-scarlet flex items-center justify-center mb-5 group-hover:bg-osu-scarlet group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-osu-gray-dark-80 mb-2">
                  {perk.title}
                </h3>
                <p className="text-osu-gray-dark-40 text-sm leading-relaxed">
                  {perk.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark-40 p-8 md:p-12 text-white shadow-xl"
        >
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="join-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#join-pattern)" />
            </svg>
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to join?
              </h3>
              <p className="text-white/90 leading-relaxed mb-2">
                Apply through the national MTC member application for access to
                jobs, events, connections, and member-only opportunities across
                the network.
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                At OSU, join our Discord for events, Luma updates, workshops, and
                our on-campus Muslim tech community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-4">
              <a
                href={NATIONAL_MTC_MEMBERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-osu-scarlet rounded-xl font-semibold text-lg hover:bg-osu-gray-light-90 transition-colors shadow-lg"
              >
                Apply on {NATIONAL_MTC_LABEL}
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={MTC_OSU_DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/60 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Join Discord
                <ExternalLink className="w-5 h-5" />
              </a>
              <Link
                href="/luma/students#form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/60 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Join the OSU Chapter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
