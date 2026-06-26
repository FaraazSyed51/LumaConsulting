"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Code2,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Users,
  Globe,
} from "lucide-react";
import { NATIONAL_MTC_URL } from "@/data/site";

const stories = [
  {
    icon: Code2,
    tag: "Luma Consulting",
    headline: "Real projects, built by students",
    body: "Our student consulting team takes on real projects for mosques, nonprofits, and community organizations: websites, tools, research, and more. Students build skills through hands-on work and ship things people actually use.",
    href: "/luma",
    cta: "Explore Luma",
    span: "lg:col-span-7",
    accent: "bg-osu-scarlet text-white",
    iconBg: "bg-white/20 text-white",
    bodyClass: "text-white/85",
    tagClass: "text-white/70",
    titleClass: "text-white",
  },
  {
    icon: GraduationCap,
    tag: "Youth Education & Workshops",
    headline: "Technical Excellence",
    body: "We teach tech to the youth and build practical skills through workshops, hackathons, and project-based learning, from coding fundamentals to AI/ML, led by industry professionals and experienced students.",
    href: "/about",
    cta: "Learn More",
    span: "lg:col-span-5",
    accent: "bg-white border border-osu-gray-light-40",
    iconBg: "bg-osu-scarlet/10 text-osu-scarlet",
    bodyClass: "text-osu-gray-dark-40",
    tagClass: "text-osu-scarlet",
    titleClass: "text-osu-gray-dark-80",
  },
  {
    icon: Briefcase,
    tag: "Career Preparation",
    headline: "Professional Development",
    body: "We help members grow their careers through networking, resume reviews, interview prep, and conversations with recruiters. Programming designed for Muslims in tech at every stage.",
    href: "/#why-join",
    cta: "Get Involved",
    span: "lg:col-span-4",
    accent: "bg-white border border-osu-gray-light-40",
    iconBg: "bg-osu-scarlet/10 text-osu-scarlet",
    bodyClass: "text-osu-gray-dark-40",
    tagClass: "text-osu-scarlet",
    titleClass: "text-osu-gray-dark-80",
  },
  {
    icon: Users,
    tag: "Our Impact",
    headline: "A People-First Community",
    body: "We're people-first. MTC connects members both spiritually and professionally: a tight-knit group that genuinely looks out for one another, on campus and beyond.",
    href: "/board",
    cta: "Meet Us",
    span: "lg:col-span-4",
    accent: "bg-section-dark text-white",
    iconBg: "bg-white/10 text-osu-scarlet",
    bodyClass: "text-osu-gray-light-40",
    tagClass: "text-osu-gray-light-20",
    titleClass: "text-white",
  },
  {
    icon: Globe,
    tag: "National Network",
    headline: "Part of a National Movement",
    body: "As a university chapter of the Muslim Tech Collaborative, we connect Buckeyes to a nationwide network of chapters, mentors, and opportunities through mtc.so.",
    href: NATIONAL_MTC_URL,
    cta: "Explore the national org",
    external: true,
    span: "lg:col-span-4",
    accent: "bg-section-muted border border-osu-gray-light-40",
    iconBg: "bg-osu-scarlet/10 text-osu-scarlet",
    bodyClass: "text-osu-gray-dark-40",
    tagClass: "text-osu-scarlet",
    titleClass: "text-osu-gray-dark-80",
  },
];

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="what-we-do" className="py-28 bg-section-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-6 leading-tight">
            Pillars of{" "}
            <span className="text-osu-scarlet">Impact</span>
          </h2>
          <p className="text-xl text-osu-gray-dark-40 leading-relaxed">
            Most of what we do falls into three areas: real consulting projects,
            hands-on learning, and career support, backed by a community that
            looks out for each other.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 lg:auto-rows-fr">
          {stories.map((story, index) => {
            const Icon = story.icon;
            const inner = (
              <motion.article
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className={`group h-full p-7 md:p-9 rounded-2xl flex flex-col shadow-sm hover:shadow-lg transition-shadow ${story.accent} ${story.span}`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${story.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${story.tagClass}`}
                  >
                    {story.tag}
                  </span>
                </div>
                <h3
                  className={`text-2xl md:text-[1.65rem] font-bold mb-3 leading-snug ${story.titleClass}`}
                >
                  {story.headline}
                </h3>
                <p className={`leading-relaxed mb-6 flex-1 ${story.bodyClass}`}>
                  {story.body}
                </p>
                <span
                  className={`inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all ${
                    story.accent.includes("bg-osu-scarlet") ||
                    story.accent.includes("bg-section-dark")
                      ? "text-white"
                      : "text-osu-scarlet"
                  }`}
                >
                  {story.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.article>
            );

            if (story.external) {
              return (
                <a
                  key={story.headline}
                  href={story.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={story.span}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={story.headline} href={story.href} className={story.span}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
