"use client";

import SiteNavigation, { LumaSubNav } from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";
import LumaHero from "@/components/luma/LumaHero";
import About from "@/components/luma/About";
import Process from "@/components/luma/Process";
import ForBusinesses from "@/components/luma/ForBusinesses";
import Faq from "@/components/luma/Faq";
import PartnerApplicationForm from "@/components/luma/PartnerApplicationForm";

export default function LumaPartnersPage() {
  return (
    <main className="min-h-screen">
      <SiteNavigation />
      <LumaSubNav variant="partner" />
      <LumaHero variant="partner" />
      <About />
      <Process />
      <ForBusinesses />
      <Faq variant="partner" />
      <PartnerApplicationForm />
      <SiteFooter />
    </main>
  );
}
