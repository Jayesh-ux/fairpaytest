import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { LoansWeWorkOnSection } from "@/components/home/LoansWeWorkOnSection";
import { GlassmorphismServicesGrid } from "@/components/home/GlassmorphismServicesGrid";
import { InteractiveProcessSection } from "@/components/home/InteractiveProcessSection";
import { TrustMediaSection } from "@/components/home/TrustMediaSection";
import { BorrowerRightsSection } from "@/components/home/BorrowerRightsSection";
import { AutoRotatingTestimonials } from "@/components/home/AutoRotatingTestimonials";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { EnhancedFAQSection } from "@/components/home/EnhancedFAQSection";
import { CTASection } from "@/components/home/CTASection";
import { CallbackPopup } from "@/components/CallbackPopup";

const Index = () => {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    const openCallback = () => setIsCallbackOpen(true);

    return (
        <Layout>
            <EnhancedHeroSection onOpenCallback={openCallback} />
            <LoansWeWorkOnSection />
            <GlassmorphismServicesGrid />
            <InteractiveProcessSection onOpenCallback={openCallback} />
            <TrustMediaSection />
            <AboutUsSection />
            <BorrowerRightsSection />
            <AutoRotatingTestimonials />
            <EnhancedFAQSection />
            <CTASection onOpenCallback={openCallback} />
            <CallbackPopup
                isOpen={isCallbackOpen}
                onClose={() => setIsCallbackOpen(false)}
            />
        </Layout>
    );
};

export default Index;
