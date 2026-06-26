import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#BA0C2F",
};

export const metadata: Metadata = {
  title: {
    default: "MTC at Ohio State | Muslim Tech Collaborative",
    template: "%s | MTC at Ohio State",
  },
  description:
    "Muslim Tech Collaborative at Ohio State: building a home for Muslims in tech through project-based learning, technical education, and professional development.",
  keywords: [
    "MTC",
    "Muslim Tech Collaborative",
    "Ohio State",
    "OSU",
    "Luma Consulting",
    "Muslim tech",
    "student consulting",
  ],
  openGraph: {
    title: "MTC at Ohio State",
    description:
      "A home for Muslims in tech at Ohio State. Solve real problems, build skills, accelerate careers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
