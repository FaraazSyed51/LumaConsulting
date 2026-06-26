"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";

const lumaLinks = [
  { label: "For Students", href: "/luma/students", description: "Join a project team" },
  { label: "For Business", href: "/luma/partners", description: "Start a project with us" },
] as const;

function LumaNavDropdown({
  pathname,
  textClass,
  activeClass,
}: {
  pathname: string;
  textClass: string;
  activeClass: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLumaActive = pathname.startsWith("/luma");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
          isLumaActive ? activeClass : textClass
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Luma
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-56 py-2 bg-white rounded-xl border border-osu-gray-light-40 shadow-lg z-50"
            role="menu"
          >
            {lumaLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className={`block px-4 py-3 transition-colors hover:bg-osu-gray-light-80 ${
                    isActive ? "bg-osu-gray-light-80" : ""
                  }`}
                >
                  <span className={`block font-semibold text-sm ${isActive ? "text-osu-scarlet" : "text-osu-gray-dark-80"}`}>
                    {link.label}
                  </span>
                  <span className="block text-xs text-osu-gray-dark-40 mt-0.5">
                    {link.description}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LUMA_SCROLL_OFFSET = 132; // fixed nav (80px) + sticky sub-nav (~52px)

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - LUMA_SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function SiteNavigation({
  transparent = false,
}: {
  transparent?: boolean;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const useTransparent = transparent && isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const textClass = useTransparent
    ? "text-white hover:text-white/80"
    : "text-osu-gray-dark-60 hover:text-osu-scarlet";

  const activeClass = useTransparent
    ? "text-white font-semibold"
    : "text-osu-scarlet font-semibold";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-osu-gray-light-40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ scale: 1.05 }} className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <ImageSlot
                slot="logo"
                alt="MTC OSU Logo"
                width={44}
                height={44}
                className="rounded-full ring-2 ring-transparent group-hover:ring-osu-scarlet/30 transition-all object-cover"
                showLabel={false}
              />
            </motion.div>
            <div className="flex flex-col">
              <span
                className={`font-display text-xl font-bold leading-none tracking-tight ${
                  useTransparent ? "text-white" : "text-osu-scarlet"
                }`}
              >
                MTC
              </span>
              <span
                className={`font-display text-[0.7rem] font-medium uppercase tracking-[0.2em] mt-0.5 ${
                  useTransparent ? "text-white/70" : "text-osu-gray-dark-40"
                }`}
              >
                Ohio State
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === "/" ? activeClass : textClass
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname.startsWith("/about") ? activeClass : textClass
              }`}
            >
              About
            </Link>
            <LumaNavDropdown
              pathname={pathname}
              textClass={textClass}
              activeClass={activeClass}
            />
            <Link
              href="/board"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname.startsWith("/board") ? activeClass : textClass
              }`}
            >
              Meet Us
            </Link>
            <Link
              href="/#why-join"
              className="ml-4 px-6 py-2.5 bg-osu-scarlet text-white rounded-lg font-semibold hover:bg-osu-scarlet-dark-40 transition-colors shadow-md hover:shadow-lg"
            >
              Join MTC
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg ${
              isMobileMenuOpen
                ? "text-osu-gray-dark-60"
                : useTransparent
                  ? "text-white"
                  : "text-osu-gray-dark-60"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-osu-gray-light-40 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg font-medium ${
                  pathname === "/"
                    ? "bg-osu-gray-light-80 text-osu-scarlet"
                    : "text-osu-gray-dark-60 hover:bg-osu-gray-light-90"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 rounded-lg font-medium ${
                  pathname.startsWith("/about")
                    ? "bg-osu-gray-light-80 text-osu-scarlet"
                    : "text-osu-gray-dark-60 hover:bg-osu-gray-light-90"
                }`}
              >
                About
              </Link>
              <div className="pt-1 pb-1">
                <p className="px-4 py-2 text-xs font-semibold text-osu-gray uppercase tracking-wider">
                  Luma
                </p>
                {lumaLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 ml-2 rounded-lg ${
                        isActive
                          ? "bg-osu-gray-light-80 text-osu-scarlet font-medium"
                          : "text-osu-gray-dark-60 hover:bg-osu-gray-light-90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/board"
                className={`block px-4 py-3 rounded-lg font-medium ${
                  pathname.startsWith("/board")
                    ? "bg-osu-gray-light-80 text-osu-scarlet"
                    : "text-osu-gray-dark-60 hover:bg-osu-gray-light-90"
                }`}
              >
                Meet Us
              </Link>
              <Link
                href="/#why-join"
                className="block w-full mt-2 px-6 py-3 bg-osu-scarlet text-white rounded-lg font-semibold text-center"
              >
                Join MTC
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const LUMA_STUDENT_SECTIONS = [
  { label: "Projects", href: "#projects" },
  { label: "Why Join", href: "#students" },
  { label: "FAQ", href: "#faq" },
  { label: "Apply", href: "#form" },
] as const;

const LUMA_PARTNER_SECTIONS = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Partner", href: "#businesses" },
  { label: "FAQ", href: "#faq" },
  { label: "Apply", href: "#form" },
] as const;

export function LumaSubNav({ variant = "student" }: { variant?: "student" | "partner" }) {
  const sections = variant === "partner" ? LUMA_PARTNER_SECTIONS : LUMA_STUDENT_SECTIONS;
  const otherPath = variant === "partner" ? "/luma/students" : "/luma/partners";
  const otherLabel = variant === "partner" ? "Students" : "Business";
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(href);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (href: string) => {
    scrollToSection(href);
  };

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-osu-gray-light-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-2 sm:py-3">
          <div className="flex items-center justify-between sm:hidden">
            <span className="text-sm font-bold text-osu-scarlet">
              Luma {variant === "partner" ? "Business" : "Students"}
            </span>
            <Link
              href={otherPath}
              className="px-3 py-2 min-h-[44px] flex items-center text-sm font-medium text-osu-gray-dark-40 hover:text-osu-scarlet hover:bg-osu-gray-light-80 rounded-lg whitespace-nowrap transition-colors"
            >
              {otherLabel} →
            </Link>
          </div>
          <div className="flex items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-1 min-w-0 flex-1 overflow-x-auto scrollbar-hide">
              <span className="hidden sm:inline text-sm font-bold text-osu-scarlet whitespace-nowrap mr-3 flex-shrink-0">
                Luma for {variant === "partner" ? "Business" : "Students"}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                {sections.map((section) => (
                  <button
                    key={section.href}
                    onClick={() => scrollTo(section.href)}
                    className={`px-3 py-2.5 sm:px-4 min-h-[44px] text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      activeSection === section.href
                        ? "bg-osu-scarlet text-white"
                        : "text-osu-gray-dark-40 hover:text-osu-scarlet hover:bg-osu-gray-light-80"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href={otherPath}
              className="hidden sm:flex flex-shrink-0 px-3 py-2.5 sm:px-4 min-h-[44px] items-center text-sm font-medium text-osu-gray-dark-40 hover:text-osu-scarlet hover:bg-osu-gray-light-80 rounded-lg whitespace-nowrap transition-colors"
            >
              {otherLabel} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
