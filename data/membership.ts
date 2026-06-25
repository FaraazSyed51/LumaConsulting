import { NATIONAL_MTC_URL } from "./site";

/** National MTC member application & member-only hub */
export const NATIONAL_MTC_MEMBERS_URL = `${NATIONAL_MTC_URL}/members`;

export type MemberPerk = {
  title: string;
  description: string;
};

export const memberPerks: MemberPerk[] = [
  {
    title: "Job Opportunities",
    description:
      "Access curated job postings, referrals, and offers shared with MTC members — from internships to full-time roles at Muslim-friendly employers and allies in tech.",
  },
  {
    title: "Exclusive Events",
    description:
      "Workshops, career fairs, speaker sessions, hackathons, and chapter events. Members hear about opportunities first and get priority access.",
  },
  {
    title: "Connections & Mentorship",
    description:
      "Tap into a nationwide network of Muslim students and professionals. Find mentors, build relationships, and connect with people who understand your path in tech.",
  },
  {
    title: "Real Projects",
    description:
      "Work on consulting and community projects through Luma — websites, platforms, research, and tools for mosques, nonprofits, and local organizations.",
  },
  {
    title: "Career Development",
    description:
      "Resume reviews, interview prep, networking with recruiters, and professional development programming to help Muslims grow in the tech industry.",
  },
  {
    title: "Member-Only Resources",
    description:
      "Early access to opportunities, member newsletters, chapter updates, and resources across the national MTC network through the member application.",
  },
];
