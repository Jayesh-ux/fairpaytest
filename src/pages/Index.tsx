import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { CoreServicesHighlight } from "@/components/home/CoreServicesHighlight";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { InteractiveProcessSection } from "@/components/home/InteractiveProcessSection";
import { TrustMediaSection } from "@/components/home/TrustMediaSection";
import { BorrowerRightsSection } from "@/components/home/BorrowerRightsSection";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { EnhancedFAQSection } from "@/components/home/EnhancedFAQSection";
import { SubmitReviewForm } from "@/components/home/SubmitReviewForm";
import { AutoRotatingTestimonials, initialTestimonials, Testimonial } from "@/components/home/AutoRotatingTestimonials";
import { CTASection } from "@/components/home/CTASection";
import { CallbackPopup } from "@/components/CallbackPopup";

const REVIEWS_CACHE_KEY = 'fairpay_reviews_cache';

// Helper to load cached reviews from localStorage (fallback)
const loadCachedReviews = (): Testimonial[] => {
    try {
        const cached = localStorage.getItem(REVIEWS_CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        console.error('Error loading cached reviews:', error);
    }
    return [];
};

// Helper to cache reviews to localStorage
const cacheReviews = (reviews: Testimonial[]) => {
    try {
        localStorage.setItem(REVIEWS_CACHE_KEY, JSON.stringify(reviews));
    } catch (error) {
        console.error('Error caching reviews:', error);
    }
};

// Fetch reviews from Google Sheets
const fetchReviewsFromSheet = async (): Promise<Testimonial[]> => {
    try {
        const scriptUrl = import.meta.env.VITE_REVIEWS_SHEETS_URL;
        if (!scriptUrl) return [];

        // Fetch reviews with action=getReviews
        const response = await fetch(`${scriptUrl}?action=getReviews`);
        if (response.ok) {
            const data = await response.json();
            if (data.reviews && Array.isArray(data.reviews)) {
                return data.reviews.map((r: any, index: number) => ({
                    id: r.id || Date.now() + index,
                    name: r.name || 'Anonymous',
                    location: r.location || 'India',
                    review: r.review || '',
                    rating: parseInt(r.rating) || 5,
                    image: (r.name || 'A').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
                    loanType: "Verified Review"
                }));
            }
        }
    } catch (error) {
        console.error('Error fetching reviews from sheet:', error);
    }
    return [];
};

// Save review to Google Sheets
const saveReviewToSheet = async (reviewData: { name: string; location: string; review: string; rating: number }) => {
    try {
        const scriptUrl = import.meta.env.VITE_REVIEWS_SHEETS_URL;
        if (!scriptUrl) return;

        const formData = new FormData();
        formData.append('formType', 'review');
        formData.append('name', reviewData.name);
        formData.append('location', reviewData.location);
        formData.append('review', reviewData.review);
        formData.append('rating', reviewData.rating.toString());
        formData.append('timestamp', new Date().toISOString());

        await fetch(scriptUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
    } catch (error) {
        console.error('Error saving review to sheet:', error);
    }
};

const Index = () => {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    const [userSubmittedReviews, setUserSubmittedReviews] = useState<Testimonial[]>([]);
    const [sheetReviews, setSheetReviews] = useState<Testimonial[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

    // Load reviews on mount - try Google Sheets first, fallback to cache
    useEffect(() => {
        const loadReviews = async () => {
            // First, load cached reviews for immediate display
            const cached = loadCachedReviews();
            if (cached.length > 0) {
                setSheetReviews(cached);
                setTestimonials([...cached, ...initialTestimonials]);
            }

            // Then try to fetch fresh reviews from Google Sheets
            const freshReviews = await fetchReviewsFromSheet();
            if (freshReviews.length > 0) {
                setSheetReviews(freshReviews);
                cacheReviews(freshReviews);
                setTestimonials([...userSubmittedReviews, ...freshReviews, ...initialTestimonials]);
            }
        };

        loadReviews();
    }, []);

    const openCallback = () => setIsCallbackOpen(true);

    const handleNewReview = async (reviewData: { name: string; location: string; review: string; rating: number }) => {
        const newReview: Testimonial = {
            id: Date.now(),
            name: reviewData.name,
            location: reviewData.location,
            review: reviewData.review,
            rating: reviewData.rating,
            image: reviewData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            loanType: "Recent Review"
        };

        // Immediately update UI with the new review
        const updatedUserReviews = [newReview, ...userSubmittedReviews];
        setUserSubmittedReviews(updatedUserReviews);
        setTestimonials([...updatedUserReviews, ...sheetReviews, ...initialTestimonials]);

        // Save to Google Sheets in the background (for other users to see)
        await saveReviewToSheet(reviewData);

        // Update local cache
        const allUserReviews = [...updatedUserReviews, ...sheetReviews];
        cacheReviews(allUserReviews);
    };

    return (
        <Layout>
            <EnhancedHeroSection onOpenCallback={openCallback} />
            <CoreServicesHighlight />
            <WhyChooseUs />
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
