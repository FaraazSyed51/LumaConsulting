"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef as useSectionRef } from "react";
import { Send, CheckCircle, AlertCircle, ChevronDown, GraduationCap, Building2, Heart, User } from "lucide-react";

// Formspree: replace with your form ID from https://formspree.io (e.g. xyzabcde)
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "";

const ROLE_OPTIONS = [
  { value: "student", label: "Student (OSU)", icon: GraduationCap },
  { value: "business", label: "Business Representative", icon: Building2 },
  { value: "nonprofit", label: "Nonprofit Representative", icon: Heart },
  { value: "other", label: "Other", icon: User },
] as const;

function RoleDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
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

  const selected = ROLE_OPTIONS.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name="role" value={value} readOnly />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 rounded-xl border border-osu-gray-light-40 bg-white text-left transition-all duration-200 hover:border-osu-gray-dark-20 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-500"}>
          {selected ? (
            <span className="flex items-center gap-2">
              <selected.icon className="w-4 h-4 text-osu-scarlet" />
              {selected.label}
            </span>
          ) : (
            "Select your role"
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            {ROLE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = value === opt.value;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors duration-150 hover:bg-osu-gray-light-80 ${
                      isSelected ? "bg-osu-gray-light-80 text-osu-scarlet font-medium" : "text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-osu-scarlet flex-shrink-0" />
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InterestForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.role) {
      setError("Please select your role (student, business, nonprofit, or other).");
      return;
    }
    setSubmitting(true);

    try {
      if (FORMSPREE_FORM_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _replyto: formData.email,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            organization: formData.organization,
            message: formData.message,
          }),
        });
        if (!res.ok) throw new Error("Something went wrong. Please try again.");
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", role: "", organization: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 bg-gradient-to-b from-osu-gray-light-80 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Your Journey
          </h2>
          <p className="text-xl text-gray-600">
            Ready to illuminate new possibilities? Complete the form below and our team will connect 
            with you to discuss how Luma Consulting can transform your organization or accelerate your career.
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
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-gray-600">
                We've received your interest form. Our team will be in touch with you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent transition-all shadow-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  I am a... *
                </label>
                <RoleDropdown
                  value={formData.role}
                  onChange={(value) => {
                    setFormData({ ...formData, role: value });
                    setError(null);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Organization / Company (if applicable)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent transition-all shadow-sm"
                  placeholder="Company or organization name"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tell us about yourself / your organization *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-osu-gray-light-40 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-osu-scarlet focus:border-transparent transition-all resize-none shadow-sm"
                  placeholder="Share your background, interests, or what you're looking for..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={!submitting ? { scale: 1.02 } : {}}
                whileTap={!submitting ? { scale: 0.98 } : {}}
                className="w-full px-8 py-4 bg-osu-scarlet text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{submitting ? "Sending..." : "Submit Interest Form"}</span>
                {!submitting && <Send className="w-5 h-5" />}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
