import { HeroSection } from "@/widgets/home/hero-section";
import { LeadSection } from "@/widgets/home/lead-section";
import { ProcessSection } from "@/widgets/home/process-section";
import { ServicesSection } from "@/widgets/home/services-section";
import { SiteFooter } from "@/widgets/home/site-footer";
import { SiteHeader } from "@/widgets/home/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <LeadSection />
      </main>
      <SiteFooter />
    </>
  );
}
