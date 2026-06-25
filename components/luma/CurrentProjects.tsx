"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Users, ArrowRight } from "lucide-react";
import { lumaProjects, projectIcon } from "@/data/lumaProjects";

export default function CurrentProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-white border-y border-osu-gray-light-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Current Projects
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            Here&apos;s what we&apos;re working on with partners right now.
          </p>
        </motion.div>

        <div className="space-y-10">
          {lumaProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border border-osu-gray-light-40 border-l-4 border-l-osu-scarlet overflow-hidden hover:shadow-md hover:border-osu-gray-dark-20 transition-all duration-300"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-14 h-14 rounded-xl bg-osu-scarlet flex items-center justify-center text-white flex-shrink-0 group-hover:bg-osu-scarlet-dark-40 transition-colors">
                    {projectIcon(project.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-osu-scarlet uppercase tracking-wider mb-1">
                      {project.client}
                    </p>
                    <h3 className="text-2xl font-bold text-osu-gray-dark-80 mb-3">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mb-5 p-4 rounded-xl bg-osu-gray-light-90 border border-osu-gray-light-40">
                      <span className="text-xs font-semibold text-osu-gray uppercase tracking-wider">
                        Partnership
                      </span>
                      {project.partner.logo ? (
                        <div className="flex items-center gap-3">
                          <Image
                            src={project.partner.logo}
                            alt={project.partner.logoAlt ?? project.partner.name}
                            width={100}
                            height={32}
                            className="h-7 w-auto object-contain"
                          />
                          {project.partner.title && (
                            <span className="text-sm text-osu-gray-dark-40">
                              {project.partner.title}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-osu-gray-dark-80">
                            {project.partner.name}
                          </p>
                          {project.partner.title && (
                            <p className="text-sm text-osu-gray-dark-40">
                              {project.partner.title}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-osu-gray-dark-40 leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-osu-gray uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-osu-scarlet" />
                        What we&apos;re doing
                      </h4>
                      <ul className="space-y-1.5">
                        {project.howWeHelp.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-osu-gray-dark-40 text-sm"
                          >
                            <span className="text-osu-scarlet mt-0.5">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-osu-gray-light-60 text-osu-gray-dark-60 text-xs font-medium rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`#form?project=${project.id}`}
                        className="ml-auto inline-flex items-center gap-1.5 px-5 py-2.5 bg-osu-scarlet text-white text-sm font-semibold rounded-lg hover:bg-osu-scarlet-dark-40 transition-colors"
                      >
                        Apply to this project
                        <ArrowRight className="w-4 h-4" />
                      </a>
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
