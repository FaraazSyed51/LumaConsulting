import { Map, Landmark, UtensilsCrossed, type LucideIcon } from "lucide-react";
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
  /** Why this project matters */
  significance: string;
  /** What students will actually build / work on */
  howWeHelp: string[];
  /** Experience and benefits students gain on this team */
  experienceBenefits: string[];
  tags: string[];
  application: LumaApplicationDetails;
  /** Shown on the site but not open for applications yet */
  comingSoon?: boolean;
};

export const lumaProjects: LumaProject[] = [
  {
    id: "wahed",
    icon: Landmark,
    title: "Wahed",
    client: "Technology, Islamic finance & community investment",
    partner: {
      name: "Wahed",
      title: "Global Islamic fintech · Halal investing, Ventures & iWaqf",
      logo: "/images/partners/wahed-logo.svg",
      logoAlt: "Wahed logo",
    },
    summary:
      "Collaborate with Wahed across technology, finance, and marketing: build a full-stack app for a selected Wahed service, support iWaqf, research for Wahed Ventures, and selected outreach.",
    significance:
      "Wahed makes Shari'ah-compliant financial services easier to access and understand. This partnership strengthens the tech, research, and community support behind those products so Muslim investors, waqf founders, and values-aligned founders get better tools and clearer experiences.",
    howWeHelp: [
      "Design and build a full-stack application for a selected Wahed service (accounts, dashboards, onboarding, admin tools)",
      "Support and improve the iWaqf platform: onboarding, records, dashboards, usability, and accessibility",
      "Research and operational support for Wahed Ventures: market maps, company profiles, and due-diligence support",
      "Fintech and Islamic finance research: surveys, reports, product recommendations, and educational materials",
      "Selected marketing and community outreach for Wahed, iWaqf, or Wahed Ventures (with Wahed review before publish)",
    ],
    experienceBenefits: [
      "Work with a global Islamic fintech company across product, finance, research, and marketing",
      "Build experience in full-stack product development on a real Wahed need",
      "Learn about Islamic finance, venture capital, and financial technology",
      "Create portfolio-ready technical, research, or design work",
      "Contribute to services built for Muslim investors and communities",
      "Collaborate on a 6–8 person cross-functional MTC team with clear workstreams",
    ],
    tags: ["Fintech", "Full-stack", "iWaqf", "Research", "Islamic finance"],
    application: {
      intro:
        "Muslim Tech Collab at Ohio State will collaborate with Wahed on projects across technology, finance, and marketing. Priorities will be set with Wahed based on current needs and the skills of the student team. Workstreams include building a full-stack application for a selected Wahed service, supporting iWaqf, research for Wahed Ventures, Islamic finance research, and selected marketing or outreach. Student work is not financial, legal, tax, or religious advice; regulatory and Shari'ah decisions stay with Wahed and qualified professionals.",
      highlights: [
        "Work with a global Islamic fintech across tech, finance, and marketing",
        "Deliver a working full-stack application for a selected Wahed service",
        "Support iWaqf, Wahed Ventures research, and community outreach",
        "Roles for developers, designers, researchers, analysts, and marketers",
      ],
      experiencePreferred: [
        "Full-stack or frontend/backend development",
        "UI/UX design and product planning",
        "Islamic finance, market, or venture research",
        "Financial modeling or data analysis",
        "Content, graphic design, or community outreach",
      ],
      startDate: "Fall semester · Teams form after selection",
      contactEmail: "ohiostatemtc@gmail.com",
    },
  },
  {
    id: "shahed-amanullah",
    icon: Map,
    title: "Muslim Community Map",
    client: "Community tools & advocacy infrastructure across Ohio",
    partner: {
      name: "Shahed Amanullah",
      title: "Founder of zabhiah.com · Muslim tech entrepreneur",
    },
    summary:
      "Rebuild a private coordination platform for Muslim organizations and volunteers, and build a statewide organizing map of communities, orgs, and campaigns across Ohio.",
    significance:
      "Ohio Muslim communities coordinate help, events, and advocacy every day, often through group chats and public social media that aren't built for sensitive work. This project gives organizations a private place to coordinate and gives advocates a real picture of where communities are and what they're working on.",
    howWeHelp: [
      "Rebuild the Shahed Amanullah platform: org signup, volunteer matching, messaging, and secure event coordination",
      "Structure statewide data on communities, masajid, nonprofits, and campaigns across Ohio",
      "Build interactive maps and dashboards for organizing and meetings with officials",
      "Design access controls and data practices that keep sensitive community information protected",
    ],
    experienceBenefits: [
      "Work directly with Shahed Amanullah, founder of zabhiah.com and a leading Muslim tech entrepreneur",
      "Direct impact on masajid, nonprofits, and community organizations across Ohio",
      "Hands-on experience blending product, data, mapping, and research skills on civic tech",
      "Learn how to build responsibly when the data involved is sensitive",
      "Portfolio-ready work on organizing infrastructure used for real advocacy",
      "Direct exposure to stakeholders, organization leaders, and the communities your tools will serve",
    ],
    tags: ["Web platform", "Mapping", "Community", "Advocacy", "Security"],
    application: {
      intro:
        "Muslim Tech Collab at Ohio State will partner with Shahed Amanullah to rebuild community tools and advocacy infrastructure for Muslims across Ohio. The engagement centers on two connected efforts: rebuilding a private coordination space for Muslim organizations and volunteers, and building a statewide organizing map of communities, organizations, and campaigns. Expected team size is about 4–5 members working across platform, data, dashboards, and security.",
      highlights: [
        "Partner with Shahed Amanullah on civic tech for Ohio Muslim communities",
        "Rebuild a secure coordination platform for orgs and volunteers",
        "Build presentation-ready statewide maps and advocacy dashboards",
        "Strong fit for product, data, mapping, and security-minded students",
      ],
      experiencePreferred: [
        "Web development (React, Next.js)",
        "UI/UX design",
        "Data & research",
        "GIS / mapping tools",
        "Product thinking and access-control design",
      ],
      startDate: "Fall semester · Teams form after selection",
      contactEmail: "ohiostatemtc@gmail.com",
    },
  },
  {
    id: "halal-bites",
    icon: UtensilsCrossed,
    title: "Halal Bites",
    client: "Halal restaurant discovery platform",
    partner: {
      name: "Halal Bites",
      title: "Halal restaurant discovery for consumers & businesses",
    },
    summary:
      "Strengthen the Halal Bites platform for consumers, restaurant owners, and community partners: Business Dashboard, Public API, Backend API, and Web Platform improvements.",
    significance:
      "Halal Bites helps Muslim consumers discover halal restaurants and food options, while supporting restaurant owners and community organizations that need accurate, shareable dining information. Improving the platform makes halal discovery easier for users and more useful for mosques, MSAs, and partners.",
    howWeHelp: [
      "Build a Business Dashboard so restaurants can manage listings, photos, reviews, and multi-location presence",
      "Design and ship a Public API so mosques, MSAs, and developers can access selected restaurant information",
      "Strengthen the Backend API that connects the website, dashboard, and public integrations",
      "Improve the consumer Web Platform: discovery, search, profiles, photos, reviews, and usability",
      "Optional capacity: market analysis, community feedback, graphic design, and outreach",
    ],
    experienceBenefits: [
      "Hands-on experience on a live consumer platform serving Muslim diners and restaurants",
      "Work across product, APIs, dashboards, and web UX on connected workstreams",
      "Build portfolio pieces: Business Dashboard, Public API, backend, or web improvements",
      "Collaborate on a focused 4–5 person team with clear deliverables",
      "Optional marketing experience: research, design, and community outreach",
      "Real impact helping people find halal food and helping restaurants stay accurate online",
    ],
    tags: ["Web platform", "APIs", "Dashboard", "Product", "Consumer"],
    application: {
      intro:
        "Muslim Tech Collab at Ohio State will collaborate with Halal Bites to strengthen its platform for consumers, restaurant owners, and community partners. Primary focus areas are the Business Dashboard, Public API, Backend API, and Halal Bites Web Platform. The project is expected to involve about 4–5 members. If capacity allows, the collaboration may also include marketing support such as graphic design, market analysis, community research, and outreach.",
      highlights: [
        "Ship features for a real halal restaurant discovery platform",
        "Work across dashboard, APIs, and consumer web experience",
        "Help businesses manage listings and communities reuse restaurant data",
        "Optional marketing and outreach work if team capacity allows",
      ],
      experiencePreferred: [
        "Full-stack or frontend/backend development",
        "API design and implementation",
        "UI/UX design",
        "Product thinking",
        "Market research, design, or outreach (optional track)",
      ],
      startDate: "Fall semester · Teams form after selection",
      contactEmail: "ohiostatemtc@gmail.com",
    },
  },
];

export const lumaProjectIds = lumaProjects.map((p) => p.id);

export const lumaOpenProjects = lumaProjects.filter((p) => !p.comingSoon);

export const lumaOpenProjectIds = lumaOpenProjects.map((p) => p.id);

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
