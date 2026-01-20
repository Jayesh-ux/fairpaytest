import { Stage } from '@prisma/client';

/**
 * Calculate overall progress percentage based on stage and stage percent
 * 
 * Formula: overallPercent = (stageIndex × 20) + (stagePercent / 5)
 * 
 * Each stage is worth 20% of the total journey:
 * - ASSESSMENT:   0-20%
 * - REVIEW:      20-40%
 * - STRATEGY:    40-60%
 * - NEGOTIATION: 60-80%
 * - SETTLEMENT:  80-100%
 */

// Stage order for calculation
const STAGE_ORDER: Stage[] = [
    'ASSESSMENT',
    'REVIEW',
    'STRATEGY',
    'NEGOTIATION',
    'SETTLEMENT',
    'CLOSED',
    'REJECTED',
];

// Human-readable stage names
export const STAGE_NAMES: Record<Stage, string> = {
    ASSESSMENT: 'Assessment',
    REVIEW: 'Review',
    STRATEGY: 'Strategy',
    NEGOTIATION: 'Negotiation',
    SETTLEMENT: 'Settlement',
    CLOSED: 'Closed',
    REJECTED: 'Rejected',
};

// Stage descriptions for users
export const STAGE_DESCRIPTIONS: Record<Stage, string> = {
    ASSESSMENT: 'Free initial consultation, gathering your information and documents.',
    REVIEW: 'Reviewing your case, checking eligibility and lender options.',
    STRATEGY: 'Designing your personalized repayment or settlement strategy.',
    NEGOTIATION: 'Actively negotiating with lenders on your behalf.',
    SETTLEMENT: 'Final settlement guidance and post-settlement support.',
    CLOSED: 'Your case has been successfully closed.',
    REJECTED: 'Your case has been rejected. Please contact us for details.',
};

// Get stage index (0-4)
export function getStageIndex(stage: Stage): number {
    return STAGE_ORDER.indexOf(stage);
}

// Calculate overall percent
export function calculateOverallPercent(stage: Stage, stagePercent: number): number {
    if (stage === 'CLOSED' || stage === 'REJECTED') return 100;

    const stageIndex = getStageIndex(stage);
    // Only calculate for the first 5 "active" stages (0 to 4)
    if (stageIndex >= 5) return 100;

    const overall = (stageIndex * 20) + (stagePercent / 5);
    return Math.min(100, Math.max(0, Math.round(overall)));
}

// Get next stage
export function getNextStage(currentStage: Stage): Stage | null {
    const currentIndex = getStageIndex(currentStage);
    if (currentIndex >= STAGE_ORDER.length - 1) {
        return null;
    }
    return STAGE_ORDER[currentIndex + 1];
}

// Get previous stage
export function getPreviousStage(currentStage: Stage): Stage | null {
    const currentIndex = getStageIndex(currentStage);
    if (currentIndex <= 0) {
        return null;
    }
    return STAGE_ORDER[currentIndex - 1];
}

// Generate stage change message
export function generateStageChangeMessage(oldStage: Stage, newStage: Stage): string {
    const newStageName = STAGE_NAMES[newStage];
    const description = STAGE_DESCRIPTIONS[newStage];
    return `Your case has moved to ${newStageName}. ${description}`;
}

// Generate status change message
export function generateStatusChangeMessage(
    oldStatus: string,
    newStatus: string
): string {
    const statusMessages: Record<string, string> = {
        OPEN: 'Your case is now active and being processed.',
        ON_HOLD: 'Your case has been placed on hold. We will contact you for more information.',
        COMPLETED: 'Congratulations! Your case has been successfully completed.',
        CANCELLED: 'Your case has been cancelled. Please contact us if you have any questions.',
    };

    return statusMessages[newStatus] || `Case status updated to ${newStatus}.`;
}

// Format currency
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

// Format date
export function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(d);
}

// Format datetime
export function formatDateTime(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);
}

// Format relative time
export function formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;

    return formatDate(date);
}
