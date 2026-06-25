"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";

const ORG_TYPE_OPTIONS = [
  { value: "business", label: "Business" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "masjid", label: "Masjid / Islamic org" },
  { value: "other", label: "Other" },
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
            className="absolute z-20 w-full mt-2 py-2 bg-white rounded-xl border border-osu-gray-light-40 shadow-lg"
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

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-osu-gray focus:outline-none focus:ring-2 focus:ring-osu-scarlet shadow-sm";

export default function PartnerApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    orgType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/luma-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantType: "partner", ...formData }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setSubmitted(true);
      setFormData({ name: "", email: "", organization: "", orgType: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

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
            Partner inquiry
          </h2>
          <p className="text-lg text-osu-gray-dark-40">
            Tell us what you need built. We&apos;ll scope it with you and match a student team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-8 md:p-10 border border-osu-gray-light-40 border-t-4 border-t-osu-scarlet"
        >
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-osu-scarlet mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-osu-gray-dark-80 mb-3">Inquiry received</h3>
              <p className="text-osu-gray-dark-40">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-osu-scarlet/5 border border-osu-scarlet/20 rounded-xl text-osu-scarlet-dark-40">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Contact name *</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Organization *</label>
                  <input required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">Organization type</label>
                  <SimpleDropdown value={formData.orgType} onChange={(v) => setFormData({ ...formData, orgType: v })} options={ORG_TYPE_OPTIONS} placeholder="Select type" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-osu-gray-dark-60 mb-2">What do you need built? *</label>
                <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Describe your project, timeline, and what success looks like..." />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-osu-scarlet text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-osu-scarlet-dark-40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Submit inquiry"}
                {!submitting && <Send className="w-5 h-5" />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
