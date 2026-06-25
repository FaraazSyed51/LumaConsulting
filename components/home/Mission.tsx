"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="mission" className="py-28 bg-section-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-6 leading-tight">
              Tech for the community,
              <span className="text-osu-scarlet"> by the community.</span>
            </h2>
            <span className="block h-1 w-16 rounded-full bg-osu-scarlet mb-8" />
            <p className="text-lg text-osu-gray-dark-40 leading-relaxed mb-6">
              The Muslim Tech Collaborative builds tech for community challenges
              while helping students grow into the field. At Ohio State, that
              means connecting students with real projects at mosques, nonprofits,
              and community organizations.
            </p>
            <p className="text-lg text-osu-gray-dark-40 leading-relaxed mb-8">
              Whether you&apos;re in CS, business, pre-med, or liberal arts —
              if you&apos;re interested in technology, there&apos;s a place for
              you in MTC. Muslims of all academic backgrounds are welcome.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-osu-scarlet text-white rounded-lg font-semibold hover:bg-osu-scarlet-dark-40 transition-colors"
            >
              Learn More About Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <ImageSlot
                slot="home-mission"
                alt="MTC members at an Ohio State event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-osu-gray-light-60 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-osu-scarlet/20 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
