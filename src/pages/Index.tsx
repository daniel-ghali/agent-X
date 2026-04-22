
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import FeaturesSection from "@/components/FeaturesSection";
import AutomationSection from "@/components/AutomationSection";
import AIEvangelistSection from "@/components/AIEvangelistSection";
import PainPointsSection from "@/components/PainPointsSection";
import AgentDeploymentSection from "@/components/AgentDeploymentSection";
import AIPowerSection from "@/components/AIPowerSection";
import ROIVisualizer from "@/components/ROIVisualizer";
import SolutionSection from "@/components/SolutionSection";
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
      <AutomationSection />
      <AIEvangelistSection />
      <PainPointsSection />
      <AgentDeploymentSection />
      <AIPowerSection />
      <ROIVisualizer />
      <SolutionSection />
      <StepsSection />
      <DashboardSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
