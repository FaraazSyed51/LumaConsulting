"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";

const rotatingPhrases = [
  "solve real problems.",
  "build technical skills.",
  "accelerate careers.",
  "uplift our community.",
];

export default function HomeHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = rotatingPhrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-osu-scarlet">
      {/* Layered scarlet background */}
      <div className="absolute inset-0 bg-gradient-to-br from-osu-scarlet via-[#A30A29] to-osu-scarlet-dark-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.14),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(112,7,28,0.55),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_0%_85%,rgba(255,255,255,0.06),transparent)]" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.09]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0 L80 40 L40 80 L0 40 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle cx="40" cy="40" r="3" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-110" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full ring-4 ring-white/40 shadow-2xl overflow-hidden bg-white">
              <ImageSlot
                slot="logo"
                alt="MTC at Ohio State"
                fill
                className="object-cover"
                sizes="144px"
                priority
                showLabel={false}
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-osu-gray-light-40 font-semibold tracking-widest uppercase text-sm mb-6"
        >
          Muslim Tech Collaborative
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[1.1]"
        >
          Welcome to MTC
          <br />
          <span className="text-osu-gray-light-40">at Ohio State</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-20 h-1 bg-white/60 rounded-full mx-auto mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-2 max-w-3xl mx-auto"
        >
          A home for Muslims in tech to
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white font-semibold mb-10 h-8 md:h-10"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#why-join"
            className="px-8 py-4 bg-white text-osu-scarlet rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Become a Member
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-transparent border-2 border-white/80 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <a
            href="#mission"
            className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={28} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
