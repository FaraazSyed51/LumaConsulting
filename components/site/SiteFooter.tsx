"use client";

import Link from "next/link";
import { NATIONAL_MTC_URL, NATIONAL_MTC_LABEL, MTC_OSU_DISCORD_URL, MTC_OSU_LINKEDIN_URL } from "@/data/site";
import ImageSlot from "@/components/ui/ImageSlot";
import { Mail, Instagram, Linkedin, ExternalLink } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative py-16 border-t-4 border-t-osu-scarlet overflow-hidden gradient-gray">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <ImageSlot
                slot="logo"
                alt="MTC OSU Logo"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-osu-scarlet/40 object-cover"
                showLabel={false}
              />
              <div>
                <span className="text-2xl font-bold text-white block">
                  MTC at Ohio State
                </span>
                <span className="text-sm text-osu-gray-light-40">
                  Muslim Tech Collaborative
                </span>
              </div>
            </div>
            <p className="text-osu-gray-light-40 max-w-md leading-relaxed">
              Building a home for Muslims in tech at OSU — solving real problems,
              developing technical skills, and accelerating careers together.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-osu-gray-light-40">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Luma Consulting", href: "/luma" },
                { label: "Meet Us", href: "/board" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3 text-osu-gray-light-40">
              <a
                href="mailto:ohiostatemtc@gmail.com"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-osu-gray" />
                <span>ohiostatemtc@gmail.com</span>
              </a>
              <a
                href={MTC_OSU_DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-osu-gray" />
                <span>MTC@OSU Discord</span>
              </a>
              <a
                href={NATIONAL_MTC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-osu-gray" />
                <span>{NATIONAL_MTC_LABEL}</span>
              </a>
              <div className="flex space-x-3 pt-2">
                <a
                  href={MTC_OSU_DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-osu-gray-dark-60 rounded-lg flex items-center justify-center text-osu-gray-light-20 hover:bg-osu-scarlet hover:text-white transition-colors"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.319 13.58.099 18.057a.082.082 0 0 0 .031.057c2.053 1.508 4.041 2.423 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.128 12.301 12.301 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.607 3.95-1.522 6.002-3.029a.077.077 0 0 0 .031-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/mtcohiostate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-osu-gray-dark-60 rounded-lg flex items-center justify-center text-osu-gray-light-20 hover:bg-osu-scarlet hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={MTC_OSU_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-osu-gray-dark-60 rounded-lg flex items-center justify-center text-osu-gray-light-20 hover:bg-osu-scarlet hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-osu-gray-dark-60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-osu-gray text-sm">
          <p>© {new Date().getFullYear()} Muslim Tech Collaborative at Ohio State. All rights reserved.</p>
          <p className="text-osu-gray-light-20">
            A chapter of the{" "}
            <a
              href={NATIONAL_MTC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-2"
            >
              Muslim Tech Collaborative
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
