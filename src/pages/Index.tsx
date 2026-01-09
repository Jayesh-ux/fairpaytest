import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { CallbackPopup } from "@/components/CallbackPopup";

const Index = () => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const openCallback = () => setIsCallbackOpen(true);

  return (
    <Layout>
      <HeroSection onOpenCallback={openCallback} />
      <ServicesSection />
      <StatsSection />
      <HowItWorksSection onOpenCallback={openCallback} />
      <TestimonialsSection />
      <FAQSection />
      <CTASection onOpenCallback={openCallback} />
      <CallbackPopup 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />
    </Layout>
  );
};

export default Index;
