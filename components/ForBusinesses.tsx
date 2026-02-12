"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

export default function ForBusinesses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Fresh perspective",
      description: "Students bring current skills and a different angle. Good for projects that benefit from a new set of eyes or up-to-date tools.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Flexible terms",
      description: "Volunteer, stipend, or paid—we can structure the engagement to fit your budget. Many students are here mainly for the experience.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Right-sized projects",
      description: "From a single deliverable (e.g. a report or landing page) to ongoing support. We scope it so it's manageable for you and them.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality in mind",
      description: "Students are mentored by MTC so work stays on track. We're not sending you someone and disappearing—we stay involved.",
    },
  ];

  const projectTypes = [
    "Website Development & Design",
    "Digital Marketing & Social Media",
    "Data Analysis & Research",
    "Business Strategy & Consulting",
    "Content Creation & Writing",
    "Technology Implementation",
    "Process Optimization",
    "Market Research",
  ];

  return (
    <section id="businesses" className="py-24 bg-pattern-dots-gradient">
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
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Partner With Us
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            Get help from OSU students who want to do real work. We handle matching and support so you get reliable output without the overhead of a full hire.
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
          className="bg-gradient-to-r from-osu-scarlet to-osu-scarlet-dark-40 rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-6">Types of work we do</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {projectTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-lg">{type}</span>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-white/90"
          >
            If you have something else in mind, get in touch—we can usually find a fit.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
