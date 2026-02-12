import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luma Consulting | Muslim Tech Collaborative at OSU",
  description: "Empowering businesses and nonprofits through student consulting. Join Luma Consulting to connect with talented OSU students.",
  keywords: "consulting, OSU, Muslim Tech Collaborative, MTC, student consulting, business consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
