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
  ChevronUp,
  GripVertical,
  Calendar,
  Rocket,
  Upload,
  FileText,
  X,
} from "lucide-react";
import {
  lumaProjects,
  lumaProjectIds,
  projectIcon,
} from "@/data/lumaProjects";

const YEAR_OPTIONS = [
  { value: "freshman", label: "Freshman" },
  { value: "sophomore", label: "Sophomore" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "graduate", label: "Graduate" },
  { value: "other", label: "Other" },
];

const HOURS_OPTIONS = [
  { value: "1-2", label: "1–2 hours" },
  { value: "2-4", label: "2–4 hours" },
  { value: "4-6", label: "4–6 hours" },
  { value: "6-8", label: "6–8 hours" },
  { value: "8+", label: "8+ hours" },
];

const GRAD_YEAR_START = new Date().getFullYear();
const GRAD_YEAR_OPTIONS = Array.from({ length: 8 }, (_, i) => {
  const year = String(GRAD_YEAR_START + i);
  return { value: year, label: year };
});

const ACCEPTED_RESUME_EXTENSIONS = ".pdf,.doc,.docx";
const ACCEPTED_RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

function isAcceptedResumeFile(file: File) {
  if (ACCEPTED_RESUME_MIME_TYPES.has(file.type)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext === "pdf" || ext === "doc" || ext === "docx";
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Could not read resume file."));
    reader.readAsDataURL(file);
  });
}

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
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 rounded-xl border border-osu-gray-light-40 bg-white text-left focus:outline-none focus:ring-2 focus:ring-osu-scarlet shadow-sm"
      >
        <span className={value ? "text-osu-gray-dark-80 font-medium" : "text-osu-gray"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-osu-gray transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-osu-gray-light-40 shadow-lg max-h-56 overflow-y-auto"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-osu-gray-light-80 ${
                    value === opt.value ? "text-osu-scarlet font-medium bg-osu-gray-light-80" : "text-osu-gray-dark-60"
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

function ProjectRanking({
  order,
  onChange,
}: {
  order: string[];
  onChange: (order: string[]) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const reorder = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= order.length || to >= order.length) {
      return;
    }
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const move = (index: number, direction: -1 | 1) => {
    reorder(index, index + direction);
  };

  return (
    <div className="space-y-2">
      {order.map((id, index) => {
        const project = lumaProjects.find((p) => p.id === id);
        if (!project) return null;

        const isDragging = dragIndex === index;
        const isDropTarget = overIndex === index && dragIndex !== null && dragIndex !== index;

        return (
          <div
            key={id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => {
              e.preventDefault();
              setOverIndex(index);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) reorder(dragIndex, index);
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            className={`flex items-center gap-3 p-4 rounded-xl border bg-white transition-all ${
              isDragging
                ? "opacity-50 border-osu-scarlet/40 shadow-md"
                : isDropTarget
                  ? "border-osu-scarlet ring-2 ring-osu-scarlet/30"
                  : "border-osu-gray-light-40"
            }`}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-osu-scarlet text-white text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <GripVertical className="w-5 h-5 text-osu-gray flex-shrink-0 cursor-grab active:cursor-grabbing" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-osu-gray-dark-80 text-sm truncate">
                {project.title}
              </p>
              <p className="text-xs text-osu-gray-dark-40 truncate">{project.client}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="p-1 rounded hover:bg-osu-gray-light-80 disabled:opacity-30"
                aria-label="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1}
                className="p-1 rounded hover:bg-osu-gray-light-80 disabled:opacity-30"
                aria-label="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
      <p className="text-xs text-osu-gray-dark-40 pt-1">
        #1 is your top choice. Drag rows or use the arrows to reorder.
      </p>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-osu-gray focus:outline-none focus:ring-2 focus:ring-osu-scarlet shadow-sm";

export default function StudentApplicationForm() {
  const ref = useRef(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null);
  const [rankings, setRankings] = useState<string[]>([...lumaProjectIds]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    universityEmail: "",
    major: "",
    year: "",
    graduatingYear: "",
    linkedin: "",
    github: "",
    hoursPerWeek: "",
    availableUntil: "",
    interest: "",
    skills: "",
    additionalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const highlight = sessionStorage.getItem("luma-highlight-project");
    if (highlight && lumaProjectIds.includes(highlight)) {
      setRankings([highlight, ...lumaProjectIds.filter((id) => id !== highlight)]);
      setExpandedBrief(highlight);
      sessionStorage.removeItem("luma-highlight-project");
    }
  }, []);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeError(null);

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (!isAcceptedResumeFile(file)) {
      setResumeError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      setResumeError("Resume must be 5 MB or smaller.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const clearResume = () => {
    setResumeFile(null);
    setResumeError(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.year || !formData.graduatingYear || !formData.hoursPerWeek) {
      setError("Please select your year, graduating year, and hours per week.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your resume (PDF or Word).");
      return;
    }
    setSubmitting(true);

    try {
      const resumeBase64 = await readFileAsBase64(resumeFile);

      const res = await fetch("/api/luma-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantType: "student",
          ...formData,
          projectRankings: rankings,
          resumeFileName: resumeFile.name,
          resumeMimeType: resumeFile.type || "application/octet-stream",
          resumeBase64,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        universityEmail: "",
        major: "",
        year: "",
        graduatingYear: "",
        linkedin: "",
        github: "",
        hoursPerWeek: "",
        availableUntil: "",
        interest: "",
        skills: "",
        additionalNotes: "",
      });
      clearResume();
      setRankings([...lumaProjectIds]);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 bg-section-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-osu-gray-dark-80 mb-4">
            Student Application
          </h2>
          <p className="text-lg text-osu-gray-dark-40 max-w-2xl mx-auto">
            One application for all open projects. Read each brief, fill out your
            info, then rank your preferences at the bottom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-osu-gray-light-40 border-t-4 border-t-osu-scarlet overflow-hidden"
        >
          {submitted ? (
            <div className="text-center py-16 px-8">
              <CheckCircle className="w-20 h-20 text-osu-scarlet mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-osu-gray-dark-80 mb-3">Application submitted</h3>
              <p className="text-osu-gray-dark-40">We&apos;ll review your application and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="divide-y divide-osu-gray-light-40">
              {error && (
                <div className="flex items-center gap-2 p-4 m-6 mb-0 bg-osu-scarlet/5 border border-osu-scarlet/20 rounded-xl text-osu-scarlet-dark-40">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Project briefs */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-osu-gray-dark-80 mb-1">Project briefs</h3>
                <p className="text-sm text-osu-gray-dark-40 mb-5">
                  Review each project before you apply — content matches our live openings.
                </p>
                <div className="space-y-3">
                  {lumaProjects.map((project) => {
                    const isOpen = expandedBrief === project.id;
                    return (
                      <div
                        key={project.id}
                        className={`rounded-xl border transition-colors ${
                          isOpen ? "border-osu-scarlet/40 bg-osu-scarlet/5" : "border-osu-gray-light-40"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedBrief(isOpen ? null : project.id)}
                          className="w-full flex items-center gap-4 p-4 text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-osu-scarlet text-white flex items-center justify-center flex-shrink-0">
                            {projectIcon(project.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-osu-gray-dark-80">{project.title}</p>
                            <p className="text-xs text-osu-gray-dark-40">{project.client}</p>
                          </div>
                          {project.partner.logo && (
                            <Image
                              src={project.partner.logo}
                              alt=""
                              width={72}
                              height={24}
                              className="h-5 w-auto object-contain hidden sm:block"
                            />
                          )}
                          <ChevronDown className={`w-5 h-5 text-osu-gray flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 space-y-3 text-sm text-osu-gray-dark-40 leading-relaxed">
                            <p>{project.application.intro}</p>
                            <ul className="space-y-1">
                              {project.application.highlights.map((h) => (
                                <li key={h} className="flex gap-2">
                                  <span className="text-osu-scarlet">—</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-3 text-xs font-medium">
                              {project.application.deadline && (
                                <span className="inline-flex items-center gap-1 text-osu-gray-dark-60">
                                  <Calendar className="w-3.5 h-3.5 text-osu-scarlet" />
                                  Deadline: {project.application.deadline}
                                </span>
                              )}
                              {project.application.startDate && (
                                <span className="inline-flex items-center gap-1 text-osu-gray-dark-60">
                                  <Rocket className="w-3.5 h-3.5 text-osu-scarlet" />
                                  Start: {project.application.startDate}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Your info */}
              <div className="p-6 md:p-8 space-y-5">
                <h3 className="text-lg font-bold text-osu-gray-dark-80">Your information</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">First & last name *</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">University email *</label>
                    <input type="email" required value={formData.universityEmail} onChange={(e) => setFormData({ ...formData, universityEmail: e.target.value })} className={inputClass} placeholder="name@osu.edu" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Major *</label>
                    <input required value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Year *</label>
                    <SimpleDropdown value={formData.year} onChange={(v) => setFormData({ ...formData, year: v })} options={YEAR_OPTIONS} placeholder="Select year" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Graduating year *</label>
                    <SimpleDropdown value={formData.graduatingYear} onChange={(v) => setFormData({ ...formData, graduatingYear: v })} options={GRAD_YEAR_OPTIONS} placeholder="Select year" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Hours per week *</label>
                    <SimpleDropdown value={formData.hoursPerWeek} onChange={(v) => setFormData({ ...formData, hoursPerWeek: v })} options={HOURS_OPTIONS} placeholder="Select hours" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Available until *</label>
                    <input type="date" required value={formData.availableUntil} onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">LinkedIn</label>
                    <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className={inputClass} placeholder="https://linkedin.com/in/... (optional)" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">GitHub or portfolio</label>
                    <input type="url" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className={inputClass} placeholder="https://github.com/..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Resume *</label>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept={ACCEPTED_RESUME_EXTENSIONS}
                      onChange={handleResumeChange}
                      className="sr-only"
                      id="resume-upload"
                    />
                    {resumeFile ? (
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-osu-scarlet/30 bg-osu-scarlet/5">
                        <FileText className="w-5 h-5 text-osu-scarlet flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-osu-gray-dark-80 truncate">{resumeFile.name}</p>
                          <p className="text-xs text-osu-gray-dark-40">
                            {(resumeFile.size / 1024).toFixed(0)} KB — PDF or Word
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearResume}
                          className="p-2 rounded-lg hover:bg-white text-osu-gray-dark-40 hover:text-osu-scarlet transition-colors"
                          aria-label="Remove resume"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="resume-upload"
                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-osu-gray-light-40 bg-white cursor-pointer hover:border-osu-scarlet/40 hover:bg-osu-scarlet/5 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-osu-scarlet" />
                        <span className="text-sm font-semibold text-osu-gray-dark-80">Upload resume</span>
                        <span className="text-xs text-osu-gray-dark-40 text-center">
                          PDF or Word (.doc, .docx) · max 5 MB
                        </span>
                      </label>
                    )}
                    {resumeError && (
                      <p className="text-xs text-osu-scarlet mt-1.5">{resumeError}</p>
                    )}
                    <p className="text-xs text-osu-gray-dark-40 mt-1.5">
                      Saved to our Google Drive — PDFs preview in-browser; Word files open in Google Docs viewer.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Why are you interested? *</label>
                  <textarea required rows={4} value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Relevant experience, coursework & skills *</label>
                  <textarea required rows={4} value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Anything else?</label>
                  <textarea rows={3} value={formData.additionalNotes} onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })} className={`${inputClass} resize-none`} />
                </div>
              </div>

              {/* Rankings */}
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-osu-gray-dark-80">Rank your project preferences *</h3>
                <p className="text-sm text-osu-gray-dark-40">
                  Put your top choice first. We use this to place you on the best-fit team.
                </p>
                <ProjectRanking order={rankings} onChange={setRankings} />
              </div>

              <div className="p-6 md:p-8 pt-0 space-y-4">
                <p className="text-xs text-osu-gray-dark-40 text-center leading-relaxed">
                  By submitting, you agree we may contact you about this application and future Luma
                  projects — no need to re-apply when new teams open.
                </p>
                <button
                  type="submit"
                  disabled={submitting || !formData.year || !formData.graduatingYear || !formData.hoursPerWeek || !resumeFile}
                  className="w-full px-8 py-4 bg-osu-scarlet text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-osu-scarlet-dark-40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit application"}
                  {!submitting && <Send className="w-5 h-5" />}
                </button>
                <p className="text-xs text-osu-gray-dark-40 text-center mt-3">
                  Questions? Email{" "}
                  <a href="mailto:ohiostatemtc@gmail.com" className="text-osu-scarlet hover:underline">
                    ohiostatemtc@gmail.com
                  </a>
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
