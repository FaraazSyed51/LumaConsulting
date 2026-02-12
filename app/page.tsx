"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CurrentProjects from "@/components/CurrentProjects";
import Process from "@/components/Process";
import ForBusinesses from "@/components/ForBusinesses";
import ForStudents from "@/components/ForStudents";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero opacity={opacity} />
      <About />
      <CurrentProjects />
      <Process />
      <ForBusinesses />
      <ForStudents />
      <InterestForm />
      <Footer />
    </main>
  );
}
