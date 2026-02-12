"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Network, BookOpen, Zap } from "lucide-react";

export default function ForStudents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Real projects",
      description: "You're not doing busywork. You'll have a clear scope, a real client or org, and something you can point to and describe in interviews.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Frameworks and support",
      description: "MTC gives you guides and check-ins so you're not figuring it all out alone. The goal is work you're proud to show.",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Connections",
      description: "You'll work with org leads and sometimes other students. Good way to build relationships in Columbus and at OSU.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Mentorship",
      description: "Advisors and the MTC community are there to help when you're stuck. We want the project to succeed for both sides.",
    },
  ];

  const skills = [
    "AI / ML",
    "Software Development",
    "Web Development",
    "Data Analysis",
    "Digital Marketing",
    "Business Strategy",
    "Design",
    "Research",
  ];

  return (
    <section id="students" className="py-24 bg-gradient-to-b from-white to-osu-gray-light-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <div className="inline-flex items-center justify-center w-20 h-20 bg-osu-scarlet rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            Work on real projects with real orgs. You get something solid for your portfolio and resume; they get work that’s actually useful.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-osu-gray-light-40 border-l-4 border-l-osu-scarlet hover:border-osu-gray-dark-20"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-osu-scarlet rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-osu-gray-light-40"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-8 h-8 text-osu-scarlet" />
            <h3 className="text-3xl font-bold text-gray-900">Skills we look for</h3>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            We take students from different majors and experience levels. These are areas we often need—but if yours isn’t listed, still apply.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-3 bg-osu-gray-light-60 rounded-lg text-center font-medium text-osu-gray-dark-60 hover:bg-osu-scarlet hover:text-white transition-colors cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-lg text-gray-600 text-center"
          >
            Don’t see your skill? Still fill out the form—we add new project types as partners come in.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
