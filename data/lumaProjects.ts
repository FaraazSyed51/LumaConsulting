import { Map, Landmark, type LucideIcon } from "lucide-react";
import { createElement, type ReactNode } from "react";

export type LumaPartner = {
  name: string;
  title?: string;
  logo?: string;
  logoAlt?: string;
};

export type LumaApplicationDetails = {
  intro: string;
  highlights: string[];
  experiencePreferred?: string[];
  deadline?: string;
  startDate?: string;
  contactEmail?: string;
};

export type LumaProject = {
  id: string;
  icon: LucideIcon;
  title: string;
  client: string;
  partner: LumaPartner;
  /** One-line hook */
  summary: string;
  /** Why this project matters — impact & significance */
  significance: string;
  /** What students will actually build / work on */
  howWeHelp: string[];
  tags: string[];
  application: LumaApplicationDetails;
};

export const lumaProjects: LumaProject[] = [
  {
    id: "iwaqf",
    icon: Landmark,
    title: "iWaqf × Wahed",
    client: "US launch · Partnership with Wahed Invest",
    partner: {
      name: "Wahed Invest",
      title: "Global Muslim fintech · Shariah-compliant investing",
      logo: "/images/partners/wahed-logo.svg",
      logoAlt: "Wahed logo",
    },
    summary:
      "Help launch iWaqf in the US: a waqf app that lets Muslim families set up a Shariah-compliant charitable endowment in minutes, built with Wahed Invest and rolling out to American users first.",
    significance:
      "Waqf has been a way for Muslims to leave lasting charity for over a thousand years, but setting one up today is still out of reach for most families. iWaqf is changing that, and this team is building the US launch. Students work directly with Wahed to ship a real product Americans can use, with contributions flowing through Wahed's US infrastructure.",
    howWeHelp: [
      "Build the create-a-waqf flow end to end, from account setup to first endowment in under 3 minutes",
      "Integrate Wahed's US payment rails so contributions reconcile cleanly and stay Shariah-compliant",
      "Design and ship the mobile/web UX for the US launch: account creation, contributions, and legacy features",
      "Instrument activation, contribution size, and repeat-use metrics for the first US cohort",
      "Support shareable features (legacy cards, gift-a-waqf) to help the product spread organically",
    ],
    tags: ["Fintech", "Waqf", "US launch", "Mobile app"],
    application: {
      intro:
        "Wahed Invest is one of the largest Muslim-owned fintech companies in the world. MTC students on this team help build iWaqf, a waqf app launching first in the US, so any Muslim family can create and manage a charitable endowment in minutes. The work covers the full user experience: account creation, contributions, and integration with Wahed's US financial infrastructure. The goal is a Shariah-compliant product live for American users, with the first waqf creatable in under three minutes.",
      highlights: [
        "Work directly with a global Muslim fintech company",
        "Hands-on app development with a real launch target",
        "Strong portfolio piece and potential recruitment pipeline",
        "Selected students collaborate on a team to ship a real product",
      ],
      experiencePreferred: [
        "App development",
        "UI/UX design",
        "Product development",
        "Full-stack engineering",
        "Financial technology (or willingness to learn)",
      ],
      deadline: "Tuesday, June 30",
      startDate: "Immediately after selection",
      contactEmail: "ohiostatemtc@gmail.com",
    },
  },
  {
    id: "community-platform",
    icon: Map,
    title: "Ohio Muslim Community Platform",
    client: "Community infrastructure & organizing",
    partner: {
      name: "Shahed Amanullah",
      title: "Founder of zabhiah.com · Muslim tech entrepreneur",
    },
    summary:
      "Community tools and advocacy infrastructure for Muslims across Ohio, rebuilding 40 Homes and a statewide organizing map.",
    significance:
      "Ohio Muslim communities coordinate help, events, and advocacy every day, often through group chats and public social media that aren't built for sensitive work. This project gives orgs a private place to coordinate and gives advocates a real picture of where communities are and what they're working on.",
    howWeHelp: [
      "Rebuild the 40 Homes platform: org signup, volunteer matching, messaging, and secure event coordination",
      "Structure data on communities, masajid, nonprofits, and campaigns across Ohio",
      "Build interactive maps and dashboards for organizing and meetings with officials",
      "Design access controls and data practices that keep sensitive community info protected",
    ],
    tags: ["Web platform", "Mapping", "Community", "Advocacy"],
    application: {
      intro:
        "Work with Shahed Amanullah on community infrastructure for Ohio Muslims, rebuilding the 40 Homes volunteer coordination platform and an internal mapping layer used for organizing and advocacy with officials.",
      highlights: [
        "Real impact on masajid, nonprofits, and community orgs across Ohio",
        "Mix of product work, data, and mapping. Good for varied skill sets",
        "Sensitive community data. You'll learn how to build responsibly",
      ],
      experiencePreferred: [
        "Web development (React, Next.js)",
        "UI/UX design",
        "Data & research",
        "GIS / mapping tools",
        "Product thinking",
      ],
      startDate: "Rolling. Teams form as projects kick off",
      contactEmail: "ohiostatemtc@gmail.com",
    },
  },
];

export const lumaProjectIds = lumaProjects.map((p) => p.id);

export function getProjectById(id: string) {
  return lumaProjects.find((p) => p.id === id);
}

export function formatProjectRankings(rankings: string[]) {
  return rankings
    .map((id, index) => {
      const project = getProjectById(id);
      return project ? `${index + 1}. ${project.title}` : null;
    })
    .filter(Boolean)
    .join(" → ");
}

export function projectIcon(icon: LucideIcon, className = "w-8 h-8"): ReactNode {
  return createElement(icon, { className });
}
