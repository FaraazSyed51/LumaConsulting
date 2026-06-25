"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { studentFaqs, partnerFaqs, type FaqItem } from "@/data/lumaFaq";

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-osu-gray-light-40 rounded-xl bg-white overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-osu-gray-dark-80">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-osu-scarlet/10 text-osu-scarlet flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-osu-gray-dark-40 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const copy = {
  student: {
    title: "Student FAQ",
    subtitle: "Common questions before you apply to a Luma project.",
    faqs: studentFaqs,
  },
  partner: {
    title: "Partner FAQ",
    subtitle: "What businesses and orgs usually ask before starting a project.",
    faqs: partnerFaqs,
  },
};

export default function Faq({ variant = "student" }: { variant?: "student" | "partner" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const content = copy[variant];

  return (
    <section id="faq" className="py-24 bg-section-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block h-1 w-12 rounded-full bg-osu-scarlet mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-osu-gray-dark-40">{content.subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {content.faqs.map((faq, index) => (
            <FaqAccordionItem
              key={faq.q}
              faq={faq}
              index={index}
              isInView={isInView}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
