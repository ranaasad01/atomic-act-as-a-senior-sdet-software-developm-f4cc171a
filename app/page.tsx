export const dynamic = "force-dynamic";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import PipelineStepper from "@/components/PipelineStepper";
import FrameworksGrid from "@/components/FrameworksGrid";
import LiveTerminal from "@/components/LiveTerminal";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <NavBar />
      <HeroSection />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      <PipelineStepper />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      <FrameworksGrid />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      <LiveTerminal />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      <CaseStudies />

      <Footer />
    </main>
  );
}
