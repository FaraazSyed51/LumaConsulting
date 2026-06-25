import SiteNavigation from "@/components/site/SiteNavigation";
import SiteFooter from "@/components/site/SiteFooter";
import HomeHero from "@/components/home/HomeHero";
import Mission from "@/components/home/Mission";
import CommunityGallery from "@/components/home/CommunityGallery";
import Pillars from "@/components/home/Pillars";
import MemberBenefits from "@/components/home/MemberBenefits";
import GetInvolved from "@/components/home/GetInvolved";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteNavigation transparent />
      <HomeHero />
      <Mission />
      <CommunityGallery />
      <Pillars />
      <MemberBenefits />
      <GetInvolved />
      <SiteFooter />
    </main>
  );
}
