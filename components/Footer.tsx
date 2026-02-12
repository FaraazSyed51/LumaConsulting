"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t-4 border-t-osu-scarlet overflow-hidden bg-gradient-to-b from-osu-gray-dark-80 via-osu-gray-dark-60 to-osu-scarlet-dark-60">
      {/* OSU accent: scarlet line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-osu-scarlet opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/mtc-logo.png"
                alt="MTC OSU Logo"
                width={40}
                height={40}
                className="rounded-full ring-2 ring-osu-scarlet/30"
              />
              <span className="text-2xl font-bold text-white">Luma Consulting</span>
            </div>
            <p className="text-osu-gray-light-40 mb-2">
              Empowering businesses and nonprofits through student consulting.
              A Muslim Tech Collaborative initiative at Ohio State University.
            </p>
            <p className="text-sm text-osu-gray">
              Part of the Muslim Tech Collaborative at OSU
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-osu-gray-light-40">
              <li>
                <a href="#about" className="hover:text-osu-scarlet transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-osu-scarlet transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-osu-scarlet transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#businesses" className="hover:text-osu-scarlet transition-colors">
                  For Businesses
                </a>
              </li>
              <li>
                <a href="#students" className="hover:text-osu-scarlet transition-colors">
                  For Students
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3 text-osu-gray-light-40">
              <a
                href="mailto:ohiostatemtc@gmail.com"
                className="flex items-center space-x-2 hover:text-osu-scarlet transition-colors"
              >
                <Mail className="w-5 h-5 text-osu-gray" />
                <span>ohiostatemtc@gmail.com</span>
              </a>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.instagram.com/mtcohiostate/"
                  className="w-10 h-10 bg-osu-gray-dark-60 rounded-lg flex items-center justify-center text-osu-gray hover:bg-osu-scarlet hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/mtc-at-ohio-state/"
                  className="w-10 h-10 bg-osu-gray-dark-60 rounded-lg flex items-center justify-center text-osu-gray hover:bg-osu-scarlet hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-osu-gray-dark-60 pt-8 text-center text-osu-gray">
          <p>© {new Date().getFullYear()} Luma Consulting. All rights reserved.</p>
          <p className="mt-2 text-sm text-osu-gray-dark-20">
            Muslim Tech Collaborative at The Ohio State University
          </p>
        </div>
      </div>
    </footer>
  );
}
