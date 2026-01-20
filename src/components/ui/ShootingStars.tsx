import { cn } from "@/lib/utils";

/**
 * Premium Meteor Beams Background
 * A polished, ScopeGuard-inspired shooting star effect with:
 * - Long, elegant diagonal beams
 * - Sparse density (3-6 visible at a time)
 * - Theme-aware colors
 * - Smooth, performant animation
 */
export function PremiumShootingStars({
    className,
}: {
    className?: string;
}) {
    // Sparse, intentional beams - only a few visible at a time
    const beams = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 50 + Math.random() * 50, // Start from right half
        top: -5 + Math.random() * 35, // Start from top area
        delay: i * 1.2 + Math.random() * 3, // Staggered appearance
        duration: 5 + Math.random() * 4, // Slow, elegant (5-9 seconds)
        width: 250 + Math.random() * 200, // Long beams (250-450px)
        opacity: 0.4 + Math.random() * 0.3, // Subtle but visible
    }));

    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            <style>
                {`
                    @keyframes meteorFall {
                        0% {
                            transform: translate(0, 0) rotate(215deg);
                            opacity: 0;
                        }
                        2% {
                            opacity: var(--beam-opacity);
                        }
                        85% {
                            opacity: calc(var(--beam-opacity) * 0.5);
                        }
                        100% {
                            transform: translate(-200vw, 200vh) rotate(215deg);
                            opacity: 0;
                        }
                    }
                    
                    .meteor-beam {
                        position: absolute;
                        height: 1px;
                        border-radius: 9999px;
                        animation: meteorFall var(--duration) linear infinite;
                        animation-delay: var(--delay);
                        will-change: transform, opacity;
                    }
                    
                    /* Light mode - subtle dark beams */
                    .meteor-beam {
                        background: linear-gradient(
                            90deg,
                            rgba(100, 100, 100, 0.6) 0%,
                            rgba(100, 100, 100, 0.3) 15%,
                            rgba(100, 100, 100, 0.1) 40%,
                            transparent 100%
                        );
                    }
                    
                    .meteor-beam::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 4px;
                        background: radial-gradient(circle, rgba(80, 80, 80, 0.8) 0%, transparent 70%);
                        border-radius: 50%;
                    }

                    /* Dark mode - glowing white beams */
                    .dark .meteor-beam {
                        background: linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0.9) 0%,
                            rgba(255, 255, 255, 0.5) 10%,
                            rgba(255, 255, 255, 0.2) 30%,
                            rgba(255, 255, 255, 0.05) 60%,
                            transparent 100%
                        );
                    }
                    
                    .dark .meteor-beam::before {
                        width: 6px;
                        height: 6px;
                        background: radial-gradient(circle, white 0%, rgba(255, 255, 255, 0.6) 40%, transparent 70%);
                        box-shadow: 
                            0 0 10px 3px rgba(255, 255, 255, 0.5),
                            0 0 25px 8px rgba(255, 255, 255, 0.2),
                            0 0 40px 15px rgba(255, 255, 255, 0.1);
                    }
                `}
            </style>

            {beams.map((beam) => (
                <div
                    key={beam.id}
                    className="meteor-beam"
                    style={{
                        left: `${beam.left}%`,
                        top: `${beam.top}%`,
                        width: `${beam.width}px`,
                        "--delay": `${beam.delay}s`,
                        "--duration": `${beam.duration}s`,
                        "--beam-opacity": beam.opacity,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

/**
 * Dot Grid Pattern
 * A subtle dot pattern overlay that adds texture
 */
export function DotGridPattern({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none",
                className
            )}
            style={{
                backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                opacity: 0.05,
            }}
        />
    );
}

/**
 * Ambient Glow Orbs
 * Large, blurry gradient orbs that add depth and atmosphere
 */
export function AmbientGlowOrbs({
    className,
    primaryColor = "rgba(236, 72, 153, 0.15)", // Pink
    secondaryColor = "rgba(34, 197, 94, 0.12)", // Green
}: {
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
}) {
    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Top-right glow */}
            <div
                className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
                style={{ background: primaryColor }}
            />
            {/* Bottom-left glow */}
            <div
                className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{ background: secondaryColor }}
            />
        </div>
    );
}

/**
 * Complete Hero Background
 * Combines all effects for a premium, polished look
 */
export function HeroBackground({
    className,
    showDotGrid = true,
    showAmbientGlow = true,
    showMeteors = true,
}: {
    className?: string;
    showDotGrid?: boolean;
    showAmbientGlow?: boolean;
    showMeteors?: boolean;
}) {
    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)}>
            {/* Layer 1: Ambient Glow Orbs (furthest back) */}
            {showAmbientGlow && <AmbientGlowOrbs />}

            {/* Layer 2: Dot Grid Pattern */}
            {showDotGrid && <DotGridPattern />}

            {/* Layer 3: Meteor Beams (on top) */}
            {showMeteors && <PremiumShootingStars />}
        </div>
    );
}

// Keep for backwards compatibility
export { PremiumShootingStars as ShootingStars };
