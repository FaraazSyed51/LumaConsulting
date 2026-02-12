"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Handshake, Rocket } from "lucide-react";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phases = [
    {
      number: "01",
      icon: <Search className="w-8 h-8" />,
      title: "Consultation",
      description:
        "We talk through what you need—whether it's a one-off project or ongoing support. We define scope, timeline, and what \"done\" looks like so everyone starts aligned.",
    },
    {
      number: "02",
      icon: <Handshake className="w-8 h-8" />,
      title: "Matching",
      description:
        "Students are placed into groups based on the skills needed to complete each project. We match your project with a group that has the right mix—software dev, AI/ML, design, research, or whatever the work requires—so you get a team that can deliver.",
    },
    {
      number: "03",
      icon: <Rocket className="w-8 h-8" />,
      title: "Delivery",
      description:
        "The student group does the work with check-ins and support from us. We use simple frameworks so deliverables are consistent and usable. You get something you can actually use.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-osu-gray-light-80 to-white">
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
            Our Approach
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            We work in three steps: understand your needs, match you with a student group, then support the work through to delivery.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-osu-scarlet via-osu-gray to-osu-scarlet" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-osu-gray-light-40 border-t-4 border-t-osu-scarlet">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-osu-scarlet rounded-xl flex items-center justify-center text-white">
                      {phase.icon}
                    </div>
                    <span className="text-6xl font-bold text-osu-gray-light-40">
                      {phase.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Phase {phase.number}
                  </h3>
                  <h4 className="text-xl font-semibold text-osu-scarlet mb-4">
                    {phase.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-osu-gray-light-40"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Payment is flexible
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Some partners pay students; others offer volunteer or stipend arrangements. We’re happy to work with your budget. Students join mainly for the experience and something concrete for their portfolio, so both paid and unpaid setups work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
