"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTransform } from "framer-motion";

interface HeroProps {
  opacity: any;
}

export default function Hero({ opacity }: HeroProps) {
  const scrollToForm = () => {
    const element = document.querySelector("#form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-scarlet">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Illuminate Your Business.
          <br />
          <span className="text-osu-gray-light-40">Empower Student Growth.</span>
        </motion.h1>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="block w-16 h-1 bg-osu-gray rounded-full mx-auto mb-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
        >
          We connect OSU students with local businesses and nonprofits. You get capable hands and new ideas; 
          students get real projects and experience that matters on a resume.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-osu-scarlet rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Get Involved
          </motion.button>
          <motion.button
            onClick={() => {
              const element = document.querySelector("#about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector("#about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ArrowDown size={32} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
