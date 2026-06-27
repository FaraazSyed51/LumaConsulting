"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, Rocket, Target, Wrench, Sparkles } from "lucide-react";
import { lumaProjects, projectIcon } from "@/data/lumaProjects";

export default function ProjectShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 bg-section-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-3">
            Open Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Open project teams
          </h2>
          <p className="text-lg text-osu-gray-dark-40 max-w-2xl mx-auto">
            Live partnerships with real deliverables. One team is open now; more
            projects are coming soon.
          </p>
        </motion.div>

        <div className="space-y-6">
          {lumaProjects.map((project, index) => {
            const Icon = project.icon;
            const isComingSoon = project.comingSoon === true;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-osu-gray-light-40 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="border-l-4 border-osu-scarlet p-6 md:p-8">
                  {/* Header: title left, partnership right */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 md:gap-6 mb-4">
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-osu-scarlet text-white flex items-center justify-center flex-shrink-0">
                        {projectIcon(Icon, "w-6 h-6")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-osu-scarlet uppercase tracking-wider mb-1">
                          {project.client}
                        </p>
                        <h3 className="text-2xl font-bold text-osu-gray-dark-80 leading-tight">
                          {project.title}
                        </h3>
                        {isComingSoon && (
                          <span className="inline-flex mt-2 px-2.5 py-1 text-xs font-semibold rounded-md bg-osu-gray-light-80 text-osu-gray-dark-60 uppercase tracking-wide">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 sm:text-right max-w-full sm:max-w-[200px]">
                      <p className="text-xs font-semibold text-osu-gray uppercase tracking-widest mb-2">
                        Partnership
                      </p>
                      {project.partner.logo ? (
                        <div className="inline-flex flex-col sm:items-end gap-1.5">
                          <div className="px-4 py-3 bg-white rounded-xl border border-osu-gray-light-40 shadow-sm">
                            <Image
                              src={project.partner.logo}
                              alt={project.partner.logoAlt ?? project.partner.name}
                              width={120}
                              height={36}
                              className="h-8 w-auto object-contain"
                            />
                          </div>
                          {project.partner.title && (
                            <p className="text-xs text-osu-gray-dark-40 leading-snug">
                              {project.partner.title}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-right">
                          <p className="text-sm font-bold text-osu-gray-dark-80 leading-snug">
                            {project.partner.name}
                          </p>
                          {project.partner.title && (
                            <p className="text-xs text-osu-gray-dark-40 mt-1 leading-relaxed">
                              {project.partner.title}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-osu-gray-dark-60 leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Why it matters + What you'll work on */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-osu-scarlet flex-shrink-0" />
                        <h4 className="text-xs font-bold text-osu-gray-dark-80 uppercase tracking-wide">
                          Why it matters
                        </h4>
                      </div>
                      <p className="text-sm text-osu-gray-dark-40 leading-relaxed">
                        {project.significance}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench className="w-4 h-4 text-osu-scarlet flex-shrink-0" />
                        <h4 className="text-xs font-bold text-osu-gray-dark-80 uppercase tracking-wide">
                          What you&apos;ll work on
                        </h4>
                      </div>
                      <ul className="space-y-1.5">
                        {project.howWeHelp.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm text-osu-gray-dark-40 leading-relaxed"
                          >
                            <span className="text-osu-scarlet flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6 p-5 rounded-xl bg-osu-scarlet/5 border border-osu-scarlet/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-osu-scarlet flex-shrink-0" />
                      <h4 className="text-xs font-bold text-osu-gray-dark-80 uppercase tracking-wide">
                        Experience & benefits you&apos;ll gain
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {project.experienceBenefits.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-osu-gray-dark-40 leading-relaxed"
                        >
                          <span className="text-osu-scarlet flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: meta + skills + CTA */}
                  <div className="pt-5 border-t border-osu-gray-light-40 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      {(project.application.deadline || project.application.startDate) && (
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                          {project.application.deadline && (
                            <span className="inline-flex items-center gap-1.5 font-medium text-osu-gray-dark-80">
                              <Calendar className="w-4 h-4 text-osu-scarlet" />
                              Apply by{" "}
                              <span className="text-osu-scarlet">
                                {project.application.deadline}
                              </span>
                            </span>
                          )}
                          {project.application.startDate && (
                            <span className="inline-flex items-center gap-1.5 text-osu-gray-dark-60">
                              <Rocket className="w-4 h-4 text-osu-scarlet" />
                              {project.application.startDate}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-md bg-osu-gray-light-80 text-osu-gray-dark-60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {isComingSoon ? (
                      <span className="flex-shrink-0 inline-flex items-center justify-center px-5 py-3 bg-osu-gray-light-80 text-osu-gray-dark-40 font-semibold rounded-xl border border-osu-gray-light-40">
                        Applications opening soon
                      </span>
                    ) : (
                      <Link
                        href="/luma/students#form"
                        onClick={() => {
                          sessionStorage.setItem("luma-highlight-project", project.id);
                        }}
                        className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-osu-scarlet text-white font-semibold rounded-xl hover:bg-osu-scarlet-dark-40 transition-colors"
                      >
                        Apply to this project
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
