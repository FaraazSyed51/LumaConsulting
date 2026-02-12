"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real work, real impact",
      description:
        "Students take on actual projects—websites, research, strategy—so you get usable deliverables, not just recommendations. We match based on your needs and their skills.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Backed by MTC",
      description:
        "Consultants are supported by MTC mentors and resources so work stays on track and meets a professional bar. We're here to make sure both sides get value.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Built to last",
      description:
        "We set up projects so they can turn into ongoing relationships. Many of our partners come back for follow-up work or new initiatives.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-pattern-dots-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/mtc-logo.png"
              alt="MTC OSU Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Luma Consulting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Luma Consulting is a consulting series from the Muslim Tech Collaborative (MTC) at Ohio State. 
            We pair businesses and nonprofits with OSU students so organizations get real work done and 
            students get experience that counts.
          </p>
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <p className="text-lg text-osu-scarlet font-semibold">
            Powered by Muslim Tech Collaborative at OSU
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-osu-scarlet border border-osu-gray-light-40 hover:border-osu-gray-dark-20"
            >
              <div className="w-16 h-16 bg-osu-scarlet rounded-xl flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-r from-osu-scarlet to-osu-scarlet-dark-40 rounded-2xl text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-white/90 leading-relaxed">
            We want organizations to get the help they need and students to build portfolios that open doors. 
            Luma is the bridge: clear projects, clear expectations, and support from MTC so both sides win.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
