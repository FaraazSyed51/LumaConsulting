"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Users, Handshake, Mail } from "lucide-react";
import { NATIONAL_MTC_MEMBERS_URL } from "@/data/membership";
import { NATIONAL_MTC_LABEL, MTC_OSU_DISCORD_URL } from "@/data/site";

const cards = [
  {
    icon: Users,
    title: "Join The Community",
    subtitle: "Students & Members",
    description:
      "Apply through the MTC member application on mtc.so for jobs, events, connections, and member-only resources. Then join our OSU Discord for chapter updates on events, Luma, and more.",
    href: NATIONAL_MTC_MEMBERS_URL,
    cta: `Apply on ${NATIONAL_MTC_LABEL}`,
    variant: "primary" as const,
    external: true,
    secondaryHref: MTC_OSU_DISCORD_URL,
    secondaryCta: "Join Discord",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    subtitle: "Businesses & Organizations",
    description:
      "Work with talented OSU students through Luma Consulting. Get real technical work done while helping students build experience that matters.",
    href: "/luma/partners",
    cta: "Collaborate",
    variant: "secondary" as const,
    external: false,
  },
  {
    icon: Mail,
    title: "Get In Touch",
    subtitle: "Questions & Inquiries",
    description:
      "Have questions about MTC at OSU, want to start a project, or interested in sponsoring our initiatives? We'd love to hear from you.",
    href: "mailto:ohiostatemtc@gmail.com",
    cta: "Contact Us",
    variant: "secondary" as const,
    external: true,
  },
];

export default function GetInvolved() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-section-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
            Get Involved
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Be Part of the Movement
          </h2>
          <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-6" />
          <p className="text-xl text-osu-gray-dark-40 max-w-2xl mx-auto">
            Become a member, partner on a project, or just reach out. There&apos;s
            more than one way to be part of MTC.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isPrimary = card.variant === "primary";
            const isExternal =
              card.external ??
              (card.href.startsWith("mailto:") || card.href.startsWith("http"));

            const content = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group p-8 rounded-2xl h-full flex flex-col transition-all duration-300 ${
                  isPrimary
                    ? "bg-gradient-to-br from-osu-scarlet to-osu-scarlet-dark-40 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    : "bg-white border border-osu-gray-light-40 hover:border-osu-scarlet/30 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    isPrimary
                      ? "bg-white/20 text-white"
                      : "bg-osu-scarlet/10 text-osu-scarlet group-hover:bg-osu-scarlet group-hover:text-white transition-colors"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    isPrimary ? "text-white/70" : "text-osu-scarlet"
                  }`}
                >
                  {card.subtitle}
                </p>
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    isPrimary ? "text-white" : "text-osu-gray-dark-80"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`leading-relaxed mb-6 flex-1 ${
                    isPrimary ? "text-white/85" : "text-osu-gray-dark-40"
                  }`}
                >
                  {card.description}
                </p>
                <div className="flex flex-col gap-3">
                  {"secondaryHref" in card && card.secondaryHref ? (
                    <>
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-semibold ${
                          isPrimary ? "text-white hover:underline" : "text-osu-scarlet hover:underline"
                        }`}
                      >
                        {card.cta} →
                      </a>
                      <a
                        href={card.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-semibold ${
                          isPrimary ? "text-white/90 hover:text-white hover:underline" : "text-osu-scarlet hover:underline"
                        }`}
                      >
                        {card.secondaryCta} →
                      </a>
                    </>
                  ) : (
                    <span
                      className={`inline-flex items-center font-semibold ${
                        isPrimary
                          ? "text-white"
                          : "text-osu-scarlet group-hover:underline"
                      }`}
                    >
                      {card.cta} →
                    </span>
                  )}
                </div>
              </motion.div>
            );

            if ("secondaryHref" in card && card.secondaryHref) {
              return (
                <div key={card.title}>
                  {content}
                </div>
              );
            }

            if (isExternal) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={card.title} href={card.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
