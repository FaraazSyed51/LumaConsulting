"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ImageSlot from "@/components/ui/ImageSlot";
import { Target, Users, Lightbulb } from "lucide-react";
import { NATIONAL_MTC_URL } from "@/data/site";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "You get real deliverables",
      description:
        "Students take on actual work: websites, research, tools, strategy. You walk away with something you can use, not a slide deck of recommendations.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "We don't disappear",
      description:
        "Every team has MTC mentors checking in along the way, so the work stays on track and meets a real professional bar. We stay involved start to finish.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "It can grow with you",
      description:
        "Most projects start small. A lot of our partners come back for follow-up work or a new idea once they see what a team can do.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-section-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <ImageSlot
              slot="logo"
              alt="MTC OSU Logo"
              width={80}
              height={80}
              className="rounded-full object-cover"
              showLabel={false}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            What Luma actually is
          </h2>
          <p className="text-xl text-osu-gray-dark-40 max-w-3xl mx-auto mb-4">
            Luma is the student consulting arm of the Muslim Tech Collaborative
            at Ohio State. We pair OSU students with businesses, nonprofits, and
            community orgs that need technical work done — and the students get
            experience that actually counts.
          </p>
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <p className="text-lg text-osu-scarlet font-semibold">
            A chapter initiative of{" "}
            <a
              href={NATIONAL_MTC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-osu-scarlet-dark-40"
            >
              Muslim Tech Collaborative
            </a>{" "}
            at OSU
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
              <h3 className="text-2xl font-bold text-osu-gray-dark-80 mb-4">
                {feature.title}
              </h3>
              <p className="text-osu-gray-dark-40 leading-relaxed">
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
          <h3 className="text-3xl font-bold mb-4">Why we do it</h3>
          <p className="text-lg text-white/90 leading-relaxed">
            Good technical help is expensive, and a lot of orgs that do real good
            in our community can&apos;t afford it. Meanwhile students need real
            work to point to. Luma sits in the middle: clear projects, clear
            expectations, and MTC backing the whole thing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
