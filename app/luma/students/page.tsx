"use client";

import SiteNavigation, { LumaSubNav } from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";
import LumaHero from "@/components/luma/LumaHero";
import ProjectShowcase from "@/components/luma/ProjectShowcase";
import ForStudents from "@/components/luma/ForStudents";
import Faq from "@/components/luma/Faq";
import StudentApplicationForm from "@/components/luma/StudentApplicationForm";

export default function LumaStudentsPage() {
  return (
    <main className="min-h-screen luma-page page-shell pt-20">
      <SiteNavigation />
      <LumaSubNav variant="student" />
      <LumaHero variant="student" />
      <ProjectShowcase />
      <ForStudents />
      <Faq variant="student" />
      <StudentApplicationForm />
      <SiteFooter />
    </main>
  );
}
