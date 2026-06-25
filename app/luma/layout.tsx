import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luma Consulting",
  description:
    "Luma Consulting connects OSU students with local businesses and nonprofits for real project experience. A Muslim Tech Collaborative initiative.",
};

export default function LumaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
