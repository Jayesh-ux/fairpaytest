import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    FileSearch,
    MessageSquare,
    Lightbulb,
    HandshakeIcon,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProcessStep {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    details: string[];
    color: string;
}

const processSteps: ProcessStep[] = [
    {
        id: 1,
        title: "Free Initial Consultation",
        description: "Book your appointment and speak with our expert advisors",
        icon: Phone,
        details: [
            "Schedule a confidential consultation",
            "Discuss your loan situation",
            "No obligation, completely free",
            "Expert guidance from day one",
        ],
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        title: "Case Review & Eligibility Check",
        description: "We analyze your case and determine the best path forward",
        icon: FileSearch,
        details: [
            "Comprehensive loan analysis",
            "Eligibility assessment",
            "Document verification",
            "Customized approach planning",
        ],
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 3,
        title: "Borrower Rights & Options Explanation",
        description: "Understand your legal rights and available options",
        icon: Lightbulb,
        details: [
            "RBI guidelines education",
            "Legal rights awareness",
            "Recovery harassment protection",
            "Settlement vs restructuring options",
        ],
        color: "from-amber-500 to-orange-500",
    },
    {
        id: 4,
        title: "Structured Repayment / Settlement Guidance",
        description: "Strategic planning for your debt resolution",
        icon: HandshakeIcon,
        details: [
            "Negotiation strategy development",
            "Repayment plan structuring",
            "Communication with lenders",
            "Documentation assistance",
        ],
        color: "from-emerald-500 to-teal-500",
    },
    {
        id: 5,
        title: "Ongoing Advisory Support",
        description: "Continuous support until your debt is resolved",
        icon: MessageSquare,
        details: [
            "Regular progress updates",
            "Ongoing legal guidance",
            "Lender communication support",
            "Post-settlement advice",
        ],
        color: "from-primary to-secondary",
    },
];

interface InteractiveProcessSectionProps {
    onOpenCallback: () => void;
}

export function InteractiveProcessSection({ onOpenCallback }: InteractiveProcessSectionProps) {
    const [activeStep, setActiveStep] = useState(1);
    const currentStep = processSteps.find((step) => step.id === activeStep) || processSteps[0];

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">How It Works</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Your Journey to{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Debt Resolution
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our transparent, step-by-step process ensures you're informed and supported at every stage
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Step Navigator */}
                    <div className="space-y-4">
                        {processSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === step.id;
                            const isCompleted = activeStep > step.id;

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => setActiveStep(step.id)}
                                        className={cn(
                                            "w-full text-left p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                            isActive
                                                ? "glass-card-strong shadow-xl scale-105"
                                                : "glass-card hover:shadow-lg hover:scale-102"
                                        )}
                                    >
                                        {/* Progress Line */}
                                        {index < processSteps.length - 1 && (
                                            <div className="absolute left-[52px] top-[80px] w-0.5 h-12 bg-border" />
                                        )}

                                        <div className="flex items-start gap-4 relative z-10">
                                            {/* Icon */}
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                                                    isActive
                                                        ? `bg-gradient-to-br ${step.color} shadow-lg`
                                                        : isCompleted
                                                            ? "bg-primary/20"
                                                            : "bg-muted"
                                                )}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                                ) : (
                                                    <Icon
                                                        className={cn(
                                                            "w-6 h-6 transition-colors",
                                                            isActive ? "text-white" : "text-muted-foreground"
                                                        )}
                                                    />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={cn(
                                                            "text-xs font-bold px-2 py-1 rounded-full",
                                                            isActive
                                                                ? "bg-primary text-primary-foreground"
                                                                : "bg-muted text-muted-foreground"
                                                        )}
                                                    >
                                                        STEP {step.id}
                                                    </span>
                                                </div>
                                                <h3
                                                    className={cn(
                                                        "text-lg font-bold mb-1 transition-colors",
                                                        isActive ? "text-foreground" : "text-muted-foreground"
                                                    )}
                                                >
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <ArrowRight
                                                className={cn(
                                                    "w-5 h-5 transition-all flex-shrink-0",
                                                    isActive
                                                        ? "text-primary opacity-100 translate-x-0"
                                                        : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                                )}
                                            />
                                        </div>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Step Details */}
                    <div className="lg:sticky lg:top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card-strong p-4 xs:p-6 md:p-8 rounded-3xl shadow-2xl"
                            >
                                {/* Header */}
                                <div className="mb-8">
                                    <div
                                        className={cn(
                                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg",
                                            currentStep.color
                                        )}
                                    >
                                        <currentStep.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                                        STEP {currentStep.id} OF {processSteps.length}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3">{currentStep.title}</h3>
                                    <p className="text-lg text-muted-foreground">{currentStep.description}</p>
                                </div>

                                {/* Details List */}
                                <div className="space-y-3 mb-8">
                                    {currentStep.details.map((detail, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm text-foreground">{detail}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center gap-3">
                                    {activeStep < processSteps.length && (
                                        <Button
                                            onClick={() => setActiveStep(activeStep + 1)}
                                            className={cn("flex-1 bg-gradient-to-r", currentStep.color)}
                                            size="lg"
                                        >
                                            Next Step
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    )}
                                    {activeStep === processSteps.length && (
                                        <Button
                                            onClick={onOpenCallback}
                                            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-glow"
                                            size="lg"
                                        >
                                            Start Your Journey
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    )}
                                </div>

                                {/* Progress Indicator */}
                                <div className="mt-6 pt-6 border-t border-border">
                                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                        <span>Progress</span>
                                        <span className="font-semibold">
                                            {Math.round((activeStep / processSteps.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(activeStep / processSteps.length) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                            className={cn("h-full bg-gradient-to-r", currentStep.color)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
