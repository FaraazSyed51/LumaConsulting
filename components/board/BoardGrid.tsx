"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { boardMembers, getInitials } from "@/data/board";

function BoardCard({
  name,
  role,
  email,
  index,
  isInView,
}: {
  name: string;
  role: string;
  email?: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group text-center"
    >
      <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark-40 p-1 shadow-lg group-hover:shadow-xl transition-shadow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-osu-gray-light-80 to-osu-gray-light-60 flex items-center justify-center overflow-hidden">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-osu-scarlet transition-transform duration-300 group-hover:scale-110">
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-bold text-osu-gray-dark-80 mb-1">{name}</h3>
      <p className="text-sm font-medium text-osu-scarlet mb-1">{role}</p>
      {email && (
        <a
          href={`mailto:${email}`}
          className="text-xs text-osu-gray-dark-40 hover:text-osu-scarlet transition-colors break-all"
        >
          {email}
        </a>
      )}
    </motion.article>
  );
}

export default function BoardGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-section-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-6" />
          <p className="text-osu-gray-dark-40 max-w-xl mx-auto">
            Our executive board leads MTC at Ohio State, from community events
            and marketing to Luma Consulting and chapter operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {boardMembers.map((member, index) => (
            <BoardCard
              key={member.name}
              name={member.name}
              role={member.role}
              email={member.email}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
