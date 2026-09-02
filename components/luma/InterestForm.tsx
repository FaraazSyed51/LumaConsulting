"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  GraduationCap,
  Building2,
  Map,
  Landmark,
  UtensilsCrossed,
} from "lucide-react";
import { lumaProjects } from "@/data/lumaProjects";

type ApplicantType = "student" | "partner";

const YEAR_OPTIONS = [
  { value: "freshman", label: "Freshman" },
  { value: "sophomore", label: "Sophomore" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "graduate", label: "Graduate" },
  { value: "other", label: "Other" },
];

const ORG_TYPE_OPTIONS = [
  { value: "business", label: "Business" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "masjid", label: "Masjid / Islamic org" },
  { value: "other", label: "Other" },
];

const PROJECT_ICONS = {
  wahed: Landmark,
  "shahed-amanullah": Map,
  "halal-bites": UtensilsCrossed,
  "community-platform": Map,
  iwaqf: Landmark,
} as const;

const STUDENT_PROJECTS = [
  ...lumaProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.client,
    partnerLogo: p.partner.logo,
    partnerLogoAlt: p.partner.logoAlt,
  })),
  {
    id: "general",
    title: "Not sure yet",
    subtitle: "Open to any project — we'll find a fit",
    partnerLogo: undefined,
    partnerLogoAlt: undefined,
  },
];

function SimpleDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 rounded-xl border border-osu-gray-light-40 bg-white text-left transition-all duration-200 hover:border-osu-gray-dark-20 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-osu-gray-dark-80 font-medium" : "text-osu-gray"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-osu-gray transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 w-full mt-2 py-2 bg-white rounded-xl border border-osu-gray-light-40 shadow-lg overflow-hidden"
            role="listbox"
          >
            {options.map((opt) => (
              <li key={opt.value} role="option" aria-selected={value === opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors hover:bg-osu-gray-light-80 ${
                    value === opt.value
                      ? "bg-osu-gray-light-80 text-osu-scarlet font-medium"
                      : "text-osu-gray-dark-60"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-osu-gray focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent transition-all shadow-sm";

export default function InterestForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [applicantType, setApplicantType] = useState<ApplicantType>("student");
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    major: "",
    year: "",
    project: "",
    skills: "",
    message: "",
  });
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    organization: "",
    orgType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/project=([\w-]+)/);
    if (match) {
      setApplicantType("student");
      setStudentData((prev) => ({ ...prev, project: match[1] }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (applicantType === "student" && !studentData.project) {
      setError("Please select a project you want to join.");
      return;
    }

    setSubmitting(true);

    const payload =
      applicantType === "student"
        ? { applicantType: "student" as const, ...studentData }
        : { applicantType: "partner" as const, ...partnerData };

    try {
      const res = await fetch("/api/luma-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setStudentData({
        name: "",
        email: "",
        major: "",
        year: "",
        project: "",
        skills: "",
        message: "",
      });
      setPartnerData({
        name: "",
        email: "",
        organization: "",
        orgType: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 bg-section-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Apply to Luma
          </h2>
          <p className="text-xl text-osu-gray-dark-40">
            Students — pick a project and apply. Partners — tell us what you need
            built.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8 md:p-12 border border-osu-gray-light-40 border-t-4 border-t-osu-scarlet"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="w-20 h-20 text-osu-scarlet mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-osu-gray-dark-80 mb-4">
                Got it — thanks!
              </h3>
              <p className="text-lg text-osu-gray-dark-40">
                Your application is in. We&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex rounded-xl border border-osu-gray-light-40 p-1 mb-8 bg-osu-gray-light-90">
                <button
                  type="button"
                  onClick={() => {
                    setApplicantType("student");
                    setError(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    applicantType === "student"
                      ? "bg-white text-osu-scarlet shadow-sm"
                      : "text-osu-gray-dark-40 hover:text-osu-gray-dark-60"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  I&apos;m a Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApplicantType("partner");
                    setError(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    applicantType === "partner"
                      ? "bg-white text-osu-scarlet shadow-sm"
                      : "text-osu-gray-dark-40 hover:text-osu-gray-dark-60"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  I&apos;m a Partner
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-osu-scarlet/5 border border-osu-scarlet/20 rounded-xl text-osu-scarlet-dark-40">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {applicantType === "student" ? (
                    <motion.div
                      key="student"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-3">
                          Which project do you want to join? *
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {STUDENT_PROJECTS.map((project) => {
                            const Icon =
                              PROJECT_ICONS[project.id as keyof typeof PROJECT_ICONS];
                            const selected = studentData.project === project.id;

                            return (
                              <button
                                key={project.id}
                                type="button"
                                onClick={() => {
                                  setStudentData({ ...studentData, project: project.id });
                                  setError(null);
                                }}
                                className={`text-left p-4 rounded-xl border-2 transition-all ${
                                  selected
                                    ? "border-osu-scarlet bg-osu-scarlet/5 shadow-sm"
                                    : "border-osu-gray-light-40 hover:border-osu-scarlet/30 bg-white"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  {project.partnerLogo ? (
                                    <Image
                                      src={project.partnerLogo}
                                      alt={project.partnerLogoAlt ?? ""}
                                      width={72}
                                      height={24}
                                      className="h-6 w-auto object-contain mt-0.5"
                                    />
                                  ) : Icon ? (
                                    <div className="w-9 h-9 rounded-lg bg-osu-scarlet/10 text-osu-scarlet flex items-center justify-center flex-shrink-0">
                                      <Icon className="w-5 h-5" />
                                    </div>
                                  ) : (
                                    <div className="w-9 h-9 rounded-lg bg-osu-gray-light-80 text-osu-gray flex items-center justify-center flex-shrink-0 text-lg">
                                      ?
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="font-semibold text-osu-gray-dark-80 text-sm leading-snug">
                                      {project.title}
                                    </p>
                                    <p className="text-xs text-osu-gray-dark-40 mt-1 leading-relaxed">
                                      {project.subtitle}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="student-name" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="student-name"
                            required
                            value={studentData.name}
                            onChange={(e) =>
                              setStudentData({ ...studentData, name: e.target.value })
                            }
                            className={inputClass}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="student-email" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="student-email"
                            required
                            value={studentData.email}
                            onChange={(e) =>
                              setStudentData({ ...studentData, email: e.target.value })
                            }
                            className={inputClass}
                            placeholder="name@osu.edu"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="major" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Major
                          </label>
                          <input
                            type="text"
                            id="major"
                            value={studentData.major}
                            onChange={(e) =>
                              setStudentData({ ...studentData, major: e.target.value })
                            }
                            className={inputClass}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Year
                          </label>
                          <SimpleDropdown
                            value={studentData.year}
                            onChange={(value) =>
                              setStudentData({ ...studentData, year: value })
                            }
                            options={YEAR_OPTIONS}
                            placeholder="Select year"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="skills" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                          Skills & interests
                        </label>
                        <input
                          type="text"
                          id="skills"
                          value={studentData.skills}
                          onChange={(e) =>
                            setStudentData({ ...studentData, skills: e.target.value })
                          }
                          className={inputClass}
                          placeholder="e.g. React, Python, design, research..."
                        />
                      </div>

                      <div>
                        <label htmlFor="student-message" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                          Why do you want to join this project? *
                        </label>
                        <textarea
                          id="student-message"
                          required
                          rows={5}
                          value={studentData.message}
                          onChange={(e) =>
                            setStudentData({ ...studentData, message: e.target.value })
                          }
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about your background and what you'd like to work on..."
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="partner"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="partner-name" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Contact Name *
                          </label>
                          <input
                            type="text"
                            id="partner-name"
                            required
                            value={partnerData.name}
                            onChange={(e) =>
                              setPartnerData({ ...partnerData, name: e.target.value })
                            }
                            className={inputClass}
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="partner-email" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="partner-email"
                            required
                            value={partnerData.email}
                            onChange={(e) =>
                              setPartnerData({ ...partnerData, email: e.target.value })
                            }
                            className={inputClass}
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="organization" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Organization *
                          </label>
                          <input
                            type="text"
                            id="organization"
                            required
                            value={partnerData.organization}
                            onChange={(e) =>
                              setPartnerData({ ...partnerData, organization: e.target.value })
                            }
                            className={inputClass}
                            placeholder="Company or org name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                            Organization type
                          </label>
                          <SimpleDropdown
                            value={partnerData.orgType}
                            onChange={(value) =>
                              setPartnerData({ ...partnerData, orgType: value })
                            }
                            options={ORG_TYPE_OPTIONS}
                            placeholder="Select type"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="partner-message" className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">
                          What do you need built? *
                        </label>
                        <textarea
                          id="partner-message"
                          required
                          rows={6}
                          value={partnerData.message}
                          onChange={(e) =>
                            setPartnerData({ ...partnerData, message: e.target.value })
                          }
                          className={`${inputClass} resize-none`}
                          placeholder="Describe your project, timeline, and what success looks like..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                  className="w-full px-8 py-4 bg-osu-scarlet text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>
                    {submitting
                      ? "Sending..."
                      : applicantType === "student"
                        ? "Submit application"
                        : "Submit partnership inquiry"}
                  </span>
                  {!submitting && <Send className="w-5 h-5" />}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
