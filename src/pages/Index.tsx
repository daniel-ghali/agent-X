
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import FeaturesSection from "@/components/FeaturesSection";
import AutomationSection from "@/components/AutomationSection";
import AIEvangelistSection from "@/components/AIEvangelistSection";
import PainPointsSection from "@/components/PainPointsSection";
import AgentDeploymentSection from "@/components/AgentDeploymentSection";

import ROIVisualizer from "@/components/ROIVisualizer";

import StepsSection from "@/components/StepsSection";
import DashboardSection from "@/components/DashboardSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoBar />
      <FeaturesSection />
      <DashboardSection />
      {/* <ROIVisualizer /> */}
      <PainPointsSection />
      <AIEvangelistSection />
      <AutomationSection />
      <AgentDeploymentSection />
      <StepsSection />



      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
