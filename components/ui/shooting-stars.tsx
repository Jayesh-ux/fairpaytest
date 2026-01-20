"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    scale: number;
    opacity: number;
    distance: number;
}

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    starWidth?: number;
    starHeight?: number;
    className?: string;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
    minSpeed = 10,
    maxSpeed = 30,
    minDelay = 1200,
    maxDelay = 4200,
    starColor = "#FFFFFF",
    trailColor = "#FFFFFF",
    starWidth = 100,
    starHeight = 1,
    className,
}) => {
    const [stars, setStars] = useState<ShootingStar[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);

    const createStar = useCallback(() => {
        const x = Math.random() * 100 + 20; // Start mostly from top-right
        const y = Math.random() * 50 - 20;
        const angle = 135; // Shooting down-left

        const newStar: ShootingStar = {
            id: Date.now() + Math.random(),
            x,
            y,
            angle,
            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            scale: 1,
            opacity: 1,
            distance: 0,
        };

        setStars((prev) => [...prev, newStar]);

        const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        setTimeout(createStar, randomDelay);
    }, [minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        createStar();
    }, [createStar]);

    useEffect(() => {
        const moveStars = () => {
            setStars((prevStars) =>
                prevStars
                    .map((star) => {
                        const newX =
                            star.x +
                            (star.speed * Math.cos((star.angle * Math.PI) / 180)) / 10;
                        const newY =
                            star.y +
                            (star.speed * Math.sin((star.angle * Math.PI) / 180)) / 10;
                        const newDistance = star.distance + star.speed / 10;
                        const newOpacity = Math.max(0, 1 - newDistance / 100);

                        return {
                            ...star,
                            x: newX,
                            y: newY,
                            distance: newDistance,
                            opacity: newOpacity,
                        };
                    })
                    .filter((star) => star.opacity > 0 && star.x > -20 && star.y < 120)
            );
        };

        const animationFrame = requestAnimationFrame(moveStars);
        return () => cancelAnimationFrame(animationFrame);
    }, [stars]);

    return (
        <svg
            ref={svgRef}
            className={cn("w-full h-full absolute inset-0 pointer-events-none", className)}
        >
            {stars.map((star) => (
                <rect
                    key={star.id}
                    x={`${star.x}%`}
                    y={`${star.y}%`}
                    width={starWidth}
                    height={starHeight}
                    fill="url(#star-gradient)"
                    style={{
                        opacity: star.opacity,
                        transform: `rotate(${star.angle}deg)`,
                        transformOrigin: `${star.x}% ${star.y}%`,
                    }}
                />
            ))}
            <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
                    <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );
};
