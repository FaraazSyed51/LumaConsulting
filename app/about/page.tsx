"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";
import { NATIONAL_MTC_URL, NATIONAL_MTC_LABEL } from "@/data/site";
import { NATIONAL_MTC_MEMBERS_URL } from "@/data/membership";
import SiteNavigation from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";
import {
  Target,
  Globe,
  Heart,
  ExternalLink,
  Code2,
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const initiatives = [
  {
    icon: Code2,
    title: "Luma Consulting",
    subtitle: "Pulse Consulting at OSU",
    description:
      "Student teams deliver real technical work for mosques, nonprofits, and local organizations, building portfolios while creating community impact.",
    href: "/luma",
  },
  {
    icon: GraduationCap,
    title: "Technical Education",
    subtitle: "Workshops & Skill Building",
    description:
      "Hands-on sessions from coding fundamentals to AI/ML. We teach tech to the youth and help members build practical skills for the industry.",
    href: "/#why-join",
  },
  {
    icon: Briefcase,
    title: "Professional Development",
    subtitle: "Careers & Networking",
    description:
      "Resume reviews, interview prep, recruiter conversations, and networking events that help Muslims navigate and grow in tech.",
    href: NATIONAL_MTC_MEMBERS_URL,
    external: true,
  },
];

const values = [
  {
    icon: Target,
    title: "Action-Oriented",
    description:
      "We don't just talk about change. We build it. Real projects, real deliverables, and impact that communities can see and use.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "MTC is people-first at its core. We foster connections at both the spiritual and professional level and celebrate each other's wins.",
  },
  {
    icon: Lightbulb,
    title: "Innovate With Intention",
    description:
      "Technology is a tool for good. We channel our skills toward problems that matter to Muslim communities and the world around us.",
  },
  {
    icon: Users,
    title: "Inclusive by Design",
    description:
      "Muslims and allies, all majors and backgrounds welcome. CS, business, pre-med, liberal arts. If you're interested in tech, you belong here.",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const nationalRef = useRef(null);
  const initiativesRef = useRef(null);
  const valuesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const nationalInView = useInView(nationalRef, { once: true, margin: "-80px" });
  const initiativesInView = useInView(initiativesRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation />

      {/* Hero — split image + intro */}
      <section className="pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[600px]">
          <div className="relative h-64 sm:h-80 lg:h-auto order-1 lg:order-2">
            <ImageSlot
              slot="about-hero"
              alt="MTC at Ohio State community"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-osu-scarlet/20 to-transparent lg:bg-gradient-to-l lg:from-white/0 lg:to-transparent" />
          </div>
          <div className="flex items-center gradient-scarlet px-6 sm:px-10 lg:px-16 py-16 lg:py-24 order-2 lg:order-1">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-osu-gray-light-40 font-semibold uppercase tracking-widest text-sm mb-4">
                About Us
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                MTC at
                <br />
                Ohio State
              </h1>
              <span className="block h-1 w-16 rounded-full bg-white/60 mb-6" />
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                A chapter of the Muslim Tech Collaborative, building a home for
                Muslims in tech at OSU through projects, education, and career
                development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For the ummah — our mission */}
      <section className="py-24 bg-section-gray border-b border-osu-gray-light-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
            For the Ummah
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-osu-gray-dark-80 mb-6 leading-tight">
            By the ummah,{" "}
            <span className="text-osu-scarlet">for the ummah.</span>
          </h2>
          <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-8" />
          <p className="text-lg md:text-xl text-osu-gray-dark-40 leading-relaxed">
            Everything we build is in service of our community. We bring whatever
            skills we have (code, design, research, strategy) to the masajid,
            nonprofits, and people already doing good, and channel them into
            meaningful innovation that leaves a real, lasting impact on the ummah.
            That&apos;s the work: technical excellence put to work for the people
            around us.
          </p>
        </motion.div>
      </section>

      {/* Who we are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-osu-gray-light-40">
              <ImageSlot
                slot="about-community"
                alt="MTC members at an OSU event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-osu-gray-dark-80 mb-6">
                More than a student org
              </h2>
              <span className="block h-1 w-12 rounded-full bg-osu-scarlet mb-8" />
              <p className="text-lg text-osu-gray-dark-40 leading-relaxed mb-6">
                MTC at Ohio State is the local chapter of a national nonprofit
                working to become the premier home for Muslims and allies in
                technology. We connect Buckeyes with real consulting projects,
                technical workshops, and professional development, while
                plugging members into a growing global network through{" "}
                <a
                  href={NATIONAL_MTC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-osu-scarlet font-medium hover:underline"
                >
                  {NATIONAL_MTC_LABEL}
                </a>
                .
              </p>
              <p className="text-lg text-osu-gray-dark-40 leading-relaxed">
                The goal is simple: build accessible pathways into tech, do work
                that creates real social impact, and give every member, whatever
                their major, a community of like-minded Muslims to grow with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* National connection */}
      <section className="py-24 bg-section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={nationalRef}
            initial={{ opacity: 0, y: 40 }}
            animate={nationalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-5 gap-8"
          >
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-osu-gray-light-40 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-osu-scarlet flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm">
                  Part of Something Bigger
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-osu-gray-dark-80 mb-4">
                The National Muslim Tech Collaborative
              </h2>
              <p className="text-osu-gray-dark-40 leading-relaxed mb-6">
                Founded at UC Berkeley in 2023, the national MTC has grown into
                a movement with university chapters across the country. The member
                application on {NATIONAL_MTC_LABEL} gives members access to jobs,
                events, connections, projects, and member-only resources
                nationwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={NATIONAL_MTC_MEMBERS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-osu-scarlet text-white rounded-lg font-semibold hover:bg-osu-scarlet-dark-40 transition-colors"
                >
                  Apply on {NATIONAL_MTC_LABEL}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={NATIONAL_MTC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-osu-gray-light-80 text-osu-gray-dark-80 rounded-lg font-semibold hover:bg-osu-gray-light-60 transition-colors border border-osu-gray-light-40"
                >
                  Explore {NATIONAL_MTC_LABEL}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl p-8 md:p-10 border border-osu-gray-light-40 border-l-4 border-l-osu-scarlet shadow-sm flex flex-col">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                <ImageSlot
                  slot="logo"
                  alt="MTC Logo"
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-osu-gray-light-40 object-cover w-full h-full"
                  showLabel={false}
                />
              </div>
              <h3 className="text-xl font-bold text-osu-gray-dark-80 mb-4">
                At Ohio State, you get
              </h3>
              <ul className="space-y-3 flex-1">
                {[
                  "National member perks: jobs, events, connections",
                  "Luma Consulting project teams",
                  "On-campus workshops & events",
                  "A Muslim tech community at OSU",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-osu-gray-dark-40 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-osu-scarlet mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#why-join"
                className="inline-flex items-center gap-2 mt-6 text-osu-scarlet font-semibold hover:underline"
              >
                See all member benefits
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three initiatives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={initiativesRef}
            initial={{ opacity: 0, y: 40 }}
            animate={initiativesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-osu-gray-dark-80 mb-4">
              Three Core Initiatives
            </h2>
            <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={initiativesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="h-full p-8 rounded-2xl bg-osu-gray-light-90 border border-osu-gray-light-40 hover:border-osu-scarlet/30 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-osu-scarlet text-white flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-osu-scarlet uppercase tracking-wider mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-osu-gray-dark-80 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-osu-gray-dark-40 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-osu-scarlet font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              );

              if (item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={item.title} href={item.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-section-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 40 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-osu-gray-dark-80 mb-4">
              Our Values
            </h2>
            <span className="inline-block h-1 w-16 rounded-full bg-osu-scarlet mb-4" />
            <p className="text-osu-gray-dark-40 max-w-xl mx-auto">
              The principles that guide everything we build at Ohio State.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08 }}
                  className="p-8 bg-white rounded-2xl border border-osu-gray-light-40 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-osu-gray-light-80 text-osu-scarlet flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-osu-gray-dark-80 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-osu-gray-dark-40 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-scarlet">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to join MTC at OSU?
          </h2>
          <p className="text-white/85 text-lg mb-8 leading-relaxed">
            Apply through the national member application, then get involved with
            our chapter for projects, events, and community on campus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={NATIONAL_MTC_MEMBERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-osu-scarlet rounded-xl font-semibold hover:bg-osu-gray-light-90 transition-colors shadow-lg"
            >
              Apply on {NATIONAL_MTC_LABEL}
            </a>
            <Link
              href="/#why-join"
              className="px-8 py-4 border-2 border-white/70 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Why Join MTC
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
