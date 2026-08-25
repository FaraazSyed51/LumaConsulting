"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarClock } from "lucide-react";
import { MTC_OSU_DISCORD_URL, MTC_OSU_INSTAGRAM_URL } from "@/data/site";

export default function StudentApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="form" className="py-24 bg-section-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Student Applications
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-osu-gray-light-40 border-t-4 border-t-osu-scarlet p-8 md:p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-osu-scarlet/10 text-osu-scarlet flex items-center justify-center mx-auto mb-6">
            <CalendarClock className="w-8 h-8" />
          </div>
          <p className="inline-flex px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider rounded-md bg-osu-gray-light-80 text-osu-gray-dark-60">
            Applications closed
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-osu-gray-dark-80 mb-4">
            Fall Luma semester will be announced soon
          </h3>
          <p className="text-lg text-osu-gray-dark-40 leading-relaxed max-w-xl mx-auto mb-8">
            Stay tuned for project openings and application dates. Follow us for
            updates, or email{" "}
            <a
              href="mailto:ohiostatemtc@gmail.com"
              className="text-osu-scarlet font-medium hover:underline"
            >
              ohiostatemtc@gmail.com
            </a>{" "}
            if you have questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={MTC_OSU_DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] bg-osu-scarlet text-white rounded-xl font-semibold hover:bg-osu-scarlet-dark-40 transition-colors"
            >
              Join Discord
            </a>
            <a
              href={MTC_OSU_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] border-2 border-osu-gray-light-40 text-osu-gray-dark-80 rounded-xl font-semibold hover:border-osu-scarlet hover:text-osu-scarlet transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
