'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { CoreServicesHighlight } from '@/components/home/CoreServicesHighlight';
import {
    initialTestimonials,
    Testimonial,
} from '@/components/home/AutoRotatingTestimonials';

// Dynamic imports for below-the-fold components with loading fallbacks
const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs').then(mod => ({ default: mod.WhyChooseUs })), {
    loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const InteractiveProcessSection = dynamic(() => import('@/components/home/InteractiveProcessSection').then(mod => ({ default: mod.InteractiveProcessSection })), {
    loading: () => <div className="min-h-[500px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const TrustMediaSection = dynamic(() => import('@/components/home/TrustMediaSection').then(mod => ({ default: mod.TrustMediaSection })), {
    loading: () => <div className="min-h-[300px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const AboutUsSection = dynamic(() => import('@/components/home/AboutUsSection').then(mod => ({ default: mod.AboutUsSection })), {
    loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const BorrowerRightsSection = dynamic(() => import('@/components/home/BorrowerRightsSection').then(mod => ({ default: mod.BorrowerRightsSection })), {
    loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const AutoRotatingTestimonials = dynamic(() => import('@/components/home/AutoRotatingTestimonials').then(mod => ({ default: mod.AutoRotatingTestimonials })), {
    loading: () => <div className="min-h-[500px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading testimonials...</div></div>
});

const SubmitReviewForm = dynamic(() => import('@/components/home/SubmitReviewForm').then(mod => ({ default: mod.SubmitReviewForm })), {
    loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const EnhancedFAQSection = dynamic(() => import('@/components/home/EnhancedFAQSection').then(mod => ({ default: mod.EnhancedFAQSection })), {
    loading: () => <div className="min-h-[500px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading FAQs...</div></div>
});

const CTASection = dynamic(() => import('@/components/home/CTASection').then(mod => ({ default: mod.CTASection })), {
    loading: () => <div className="min-h-[300px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
});

const CallbackPopup = dynamic(() => import('@/components/CallbackPopup').then(mod => ({ default: mod.CallbackPopup })), {
    ssr: false
});

const EmergencyStickyBar = dynamic(() => import('@/components/home/EmergencyStickyBar').then(mod => ({ default: mod.EmergencyStickyBar })), {
    ssr: false
});

const REVIEWS_CACHE_KEY = 'fairpay_reviews_cache';

// Helper to load cached reviews from localStorage (fallback)
const loadCachedReviews = (): Testimonial[] => {
    if (typeof window === 'undefined') return [];
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
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(REVIEWS_CACHE_KEY, JSON.stringify(reviews));
    } catch (error) {
        console.error('Error caching reviews:', error);
    }
};

// Fetch reviews from API
const fetchReviewsFromAPI = async (): Promise<Testimonial[]> => {
    try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
            const data = await response.json();
            if (data.reviews && Array.isArray(data.reviews)) {
                return data.reviews.map((r: any, index: number) => ({
                    id: r.id || Date.now() + index,
                    name: r.name || 'Anonymous',
                    location: r.location || 'India',
                    review: r.text || '',
                    rating: parseInt(r.rating) || 5,
                    image: (r.name || 'A')
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2),
                    loanType: 'Verified Review',
                }));
            }
        }
    } catch (error) {
        console.error('Error fetching reviews from API:', error);
    }
    return [];
};

// Save review to API
const saveReviewToAPI = async (reviewData: {
    name: string;
    location: string;
    review: string;
    rating: number;
}) => {
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: reviewData.name,
                location: reviewData.location,
                text: reviewData.review,
                rating: reviewData.rating,
            }),
        });
        return response.ok;
    } catch (error) {
        console.error('Error saving review to API:', error);
        return false;
    }
};

export default function HomePage() {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    const [userSubmittedReviews, setUserSubmittedReviews] = useState<
        Testimonial[]
    >([]);
    const [apiReviews, setApiReviews] = useState<Testimonial[]>([]);
    const [testimonials, setTestimonials] =
        useState<Testimonial[]>(initialTestimonials);

    // Load reviews on mount - try API first, fallback to cache
    useEffect(() => {
        const loadReviews = async () => {
            // First, load cached reviews for immediate display
            const cached = loadCachedReviews();
            if (cached.length > 0) {
                setApiReviews(cached);
                setTestimonials([...cached, ...initialTestimonials]);
            }

            // Then try to fetch fresh reviews from API
            const freshReviews = await fetchReviewsFromAPI();
            if (freshReviews.length > 0) {
                setApiReviews(freshReviews);
                cacheReviews(freshReviews);
                setTestimonials([
                    ...userSubmittedReviews,
                    ...freshReviews,
                    ...initialTestimonials,
                ]);
            }
        };

        loadReviews();
    }, []);

    const openCallback = () => setIsCallbackOpen(true);

    const handleNewReview = async (reviewData: {
        name: string;
        location: string;
        review: string;
        rating: number;
    }) => {
        const newReview: Testimonial = {
            id: Date.now(),
            name: reviewData.name,
            location: reviewData.location,
            review: reviewData.review,
            rating: reviewData.rating,
            image: reviewData.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2),
            loanType: 'Recent Review',
        };

        // Immediately update UI with the new review
        const updatedUserReviews = [newReview, ...userSubmittedReviews];
        setUserSubmittedReviews(updatedUserReviews);
        setTestimonials([
            ...updatedUserReviews,
            ...apiReviews,
            ...initialTestimonials,
        ]);

        // Save to API in the background
        await saveReviewToAPI(reviewData);

        // Update local cache
        const allUserReviews = [...updatedUserReviews, ...apiReviews];
        cacheReviews(allUserReviews);
    };

    return (
        <>
            <EnhancedHeroSection onOpenCallback={openCallback} />
            <CoreServicesHighlight />
            <WhyChooseUs />
            <InteractiveProcessSection onOpenCallback={openCallback} />
            <TrustMediaSection />
            <AboutUsSection />
            <BorrowerRightsSection />
            <AutoRotatingTestimonials
                testimonials={testimonials}
                key={testimonials.length}
            />
            <SubmitReviewForm onSuccess={handleNewReview} />
            <EnhancedFAQSection />
            <CTASection onOpenCallback={openCallback} />
            <CallbackPopup
                isOpen={isCallbackOpen}
                onClose={() => setIsCallbackOpen(false)}
            />
            <EmergencyStickyBar />
        </>
    );
}
