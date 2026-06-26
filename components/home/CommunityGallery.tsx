"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageSlot from "@/components/ui/ImageSlot";
import { ImageSlotId } from "@/data/images";

function GalleryTile({
  slot,
  className,
  delay,
  sizes,
  alt,
  isInView,
}: {
  slot: ImageSlotId;
  className?: string;
  delay: number;
  sizes: string;
  alt: string;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-2xl group ${className ?? ""}`}
    >
      <ImageSlot
        slot={slot}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-osu-scarlet-dark-60/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function CommunityGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-white overflow-hidden border-y border-osu-gray-light-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
            Our Community
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Together at OSU
          </h2>
          <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-6" />
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            From involvement fairs to workshops and project nights. This is what
            building a home for Muslims in tech looks like on campus.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-4">
          {/* Bento hero — large left fills full height of two stacked right tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 lg:h-[min(50vw,500px)]">
            <GalleryTile
              slot="home-gallery-featured"
              alt="MTC at Ohio State community"
              delay={0}
              sizes="(max-width: 1024px) 100vw, 58vw"
              isInView={isInView}
              className="min-h-[280px] lg:col-span-7 lg:row-span-2 lg:min-h-0 h-full"
            />
            <GalleryTile
              slot="home-gallery-2"
              alt="MTC community moment"
              delay={0.08}
              sizes="(max-width: 1024px) 100vw, 42vw"
              isInView={isInView}
              className="min-h-[200px] lg:col-span-5 lg:row-span-1 lg:min-h-0 h-full"
            />
            <GalleryTile
              slot="home-gallery-3"
              alt="MTC community moment"
              delay={0.16}
              sizes="(max-width: 1024px) 100vw, 42vw"
              isInView={isInView}
              className="min-h-[200px] lg:col-span-5 lg:row-span-1 lg:min-h-0 h-full"
            />
          </div>

          {/* Three equal panels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(
              [
                ["home-gallery-4", 0.24],
                ["home-gallery-5", 0.32],
                ["home-gallery-6", 0.4],
              ] as const
            ).map(([slot, delay], i) => (
              <GalleryTile
                key={slot}
                slot={slot}
                alt={`MTC community moment ${i + 4}`}
                delay={delay}
                sizes="(max-width: 640px) 100vw, 33vw"
                isInView={isInView}
                className="min-h-[220px] sm:aspect-[5/4] sm:min-h-0"
              />
            ))}
          </div>

          {/* Wide left + two stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[min(38vw,380px)]">
            <GalleryTile
              slot="home-gallery-7"
              alt="MTC community moment"
              delay={0.48}
              sizes="(max-width: 1024px) 100vw, 50vw"
              isInView={isInView}
              className="min-h-[260px] lg:min-h-0 h-full"
            />
            <div className="grid grid-rows-2 gap-4 min-h-[260px] lg:min-h-0 h-full">
              <GalleryTile
                slot="home-gallery-8"
                alt="MTC community moment"
                delay={0.56}
                sizes="(max-width: 1024px) 100vw, 25vw"
                isInView={isInView}
                className="min-h-[120px] h-full"
              />
              <GalleryTile
                slot="home-gallery-9"
                alt="MTC community moment"
                delay={0.64}
                sizes="(max-width: 1024px) 100vw, 25vw"
                isInView={isInView}
                className="min-h-[120px] h-full"
              />
            </div>
          </div>

          {/* Closing trio — wider than the old tiny mosaic row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                ["home-gallery-10", 0.72],
                ["home-gallery-11", 0.8],
                ["home-gallery-12", 0.88],
              ] as const
            ).map(([slot, delay], i) => (
              <GalleryTile
                key={slot}
                slot={slot}
                alt={`MTC community moment ${i + 10}`}
                delay={delay}
                sizes="(max-width: 768px) 100vw, 33vw"
                isInView={isInView}
                className="min-h-[200px] md:aspect-[4/3] md:min-h-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
