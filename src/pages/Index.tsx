import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { GlassmorphismServicesGrid } from "@/components/home/GlassmorphismServicesGrid";
import { InteractiveProcessSection } from "@/components/home/InteractiveProcessSection";
import { TrustMediaSection } from "@/components/home/TrustMediaSection";
import { BorrowerRightsSection } from "@/components/home/BorrowerRightsSection";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { EnhancedFAQSection } from "@/components/home/EnhancedFAQSection";
import { SubmitReviewForm } from "@/components/home/SubmitReviewForm";
import { AutoRotatingTestimonials, initialTestimonials, Testimonial } from "@/components/home/AutoRotatingTestimonials";
import { CTASection } from "@/components/home/CTASection";
import { CallbackPopup } from "@/components/CallbackPopup";

const Index = () => {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

    const openCallback = () => setIsCallbackOpen(true);

    const handleNewReview = (reviewData: { name: string; location: string; review: string; rating: number }) => {
        const newReview: Testimonial = {
            id: Date.now(),
            name: reviewData.name,
            location: reviewData.location,
            review: reviewData.review,
            rating: reviewData.rating,
            image: reviewData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            loanType: "Recent Review"
        };

        // Add to the beginning of the list so it shows up immediately
        setTestimonials(prev => [newReview, ...prev]);
    };

    return (
        <Layout>
            <EnhancedHeroSection onOpenCallback={openCallback} />
            <GlassmorphismServicesGrid />
            <InteractiveProcessSection onOpenCallback={openCallback} />
            <TrustMediaSection />
            <AboutUsSection />
            <BorrowerRightsSection />
            <AutoRotatingTestimonials testimonials={testimonials} key={testimonials.length} />
            <SubmitReviewForm onSuccess={handleNewReview} />
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
