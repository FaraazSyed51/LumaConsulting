import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Us",
  description: "Meet the executive board leading Muslim Tech Collaborative at Ohio State.",
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
