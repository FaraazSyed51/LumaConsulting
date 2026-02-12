"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard,
  Globe,
  Map,
  Newspaper,
  Users,
} from "lucide-react";

export default function CurrentProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "40 Homes Secure Community Platform",
      client: "Community & volunteer coordination",
      summary:
        "40 Homes started during COVID-19 as a respite-care and errands platform for Muslim families. It’s now being rebuilt as a private, login-only space where orgs can post events, find vetted volunteers, and coordinate help—without putting sensitive info on public social media.",
      howWeHelp: [
        "Reviewing the original codebase and deciding what to reuse vs. rebuild",
        "Designing org and volunteer flows: signup, profiles, background checks",
        "Building request posting, matching by distance, and in-platform messaging",
        "Keeping the map view so coordinators can see where help is needed",
      ],
      tags: ["Web platform", "Security", "Volunteers", "Database"],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "MTC Ohio State Website",
      client: "Muslim Tech Collaborative at OSU",
      summary:
        "The main site for MTC at Ohio State: where people learn about the chapter, see events and projects, and sign up to join. We’re building it in Next.js so it’s fast, easy to update, and clearly shows what MTC does and how to get involved.",
      howWeHelp: [
        "Designing and building the site (Next.js, React, Tailwind)",
        "Adding an events section and a project showcase",
        "Setting up join/member forms and sponsor info",
        "Deploying and handing off so the chapter can own it long-term",
      ],
      tags: ["Next.js", "React", "Tailwind", "Vercel"],
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Ohio Muslim Community Mapping",
      client: "Organizing & advocacy (Yusra)",
      summary:
        "An internal, non-public map of Muslim communities, orgs, and campaigns across Ohio. It’s used for organizing and for meetings with officials—showing where communities are, what issues they’re working on, and relevant policy/financial data (e.g., bonds) at the county and state level.",
      howWeHelp: [
        "Gathering and structuring data on communities, orgs, and campaigns",
        "Building the interactive map and a simple dashboard for presentations",
        "Preparing reports and one-pagers for advocacy use",
        "Keeping access restricted and data stored safely",
      ],
      tags: ["Mapping", "Research", "Advocacy", "Data viz"],
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: "Impact Project — News Monitoring & Research",
      client: "The Impact Project",
      summary:
        "The Impact Project uses a tool (Clipbook) to pull in news and articles. Right now it catches a lot that isn’t relevant. We’re looking at whether an LLM-based step can filter by relevance, improve keyword use, and add basic categorization and summaries so the team spends less time sifting and more on analysis.",
      howWeHelp: [
        "Reviewing what Clipbook returns and where it falls short",
        "Testing an LLM layer for filtering and tagging articles",
        "Tightening search terms and keyword logic",
        "Proposing a workflow that fits their current process",
      ],
      tags: ["AI/LLM", "Research", "News monitoring", "Automation"],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-osu-gray-light-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Current Projects
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            Here’s what we’re working on with partners right now.
          </p>
        </motion.div>

        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border border-osu-gray-light-40 border-l-4 border-l-osu-scarlet overflow-hidden hover:shadow-md hover:border-osu-gray-dark-20 transition-all duration-300"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-14 h-14 rounded-xl bg-osu-scarlet flex items-center justify-center text-white flex-shrink-0 group-hover:bg-osu-scarlet-dark-40 transition-colors">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-osu-scarlet uppercase tracking-wider mb-1">
                      {project.client}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-osu-gray-dark-40 leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-osu-scarlet" />
                        What we’re doing
                      </h4>
                      <ul className="space-y-1.5">
                        {project.howWeHelp.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-600 text-sm"
                          >
                            <span className="text-osu-scarlet mt-0.5">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-osu-gray-light-60 text-osu-gray-dark-60 text-xs font-medium rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}