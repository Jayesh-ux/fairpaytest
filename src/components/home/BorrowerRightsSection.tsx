import { motion } from "framer-motion";
import { Shield, Clock, MessageSquare, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Right {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    details: string[];
}

const borrowerRights: Right[] = [
    {
        id: "call-hours",
        title: "Recovery Calls Only During Permitted Hours",
        description: "Lenders can only contact you during specific hours as per RBI guidelines",
        icon: Clock,
        gradient: "from-blue-500 to-cyan-500",
        details: [
            "Calls allowed only between 7 AM to 7 PM",
            "No calls on Sundays and public holidays",
            "Maximum 3 calls per week per loan",
            "Violation can be reported to RBI Ombudsman",
        ],
    },
    {
        id: "no-harassment",
        title: "No Abuse, Threats, or Intimidation",
        description: "Recovery agents cannot use abusive language or threaten you",
        icon: Shield,
        gradient: "from-emerald-500 to-teal-500",
        details: [
            "No abusive or threatening language",
            "No visits to workplace without permission",
            "Cannot contact family/friends repeatedly",
            "Physical threats are criminal offenses",
        ],
    },
    {
        id: "written-communication",
        title: "Right to Written Communication",
        description: "You have the right to request all communications in writing",
        icon: FileText,
        gradient: "from-purple-500 to-pink-500",
        details: [
            "Request written notice for all claims",
            "Demand detailed loan statements",
            "Get settlement offers in writing",
            "Maintain records of all correspondence",
        ],
    },
    {
        id: "grievance",
        title: "Right to Grievance Escalation",
        description: "You can escalate complaints as per RBI norms",
        icon: MessageSquare,
        gradient: "from-amber-500 to-orange-500",
        details: [
            "First escalate to lender's grievance cell",
            "Then approach Banking Ombudsman",
            "File complaint with RBI if unresolved",
            "Legal recourse available for violations",
        ],
    },
];

export function BorrowerRightsSection() {
    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
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
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Know Your Rights</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Your Rights as a{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Borrower
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Understanding your legal rights is the first step to protecting yourself from harassment and unfair practices
                    </p>
                </motion.div>

                {/* Rights Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {borrowerRights.map((right, index) => {
                        const Icon = right.icon;
                        return (
                            <motion.div
                                key={right.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card-strong p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all h-full relative overflow-hidden"
                                >
                                    {/* Gradient Overlay */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity",
                                            right.gradient
                                        )}
                                    />

                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg relative z-10",
                                            right.gradient
                                        )}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                            {right.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {right.description}
                                        </p>

                                        {/* Details List */}
                                        <div className="space-y-3">
                                            {right.details.map((detail, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <span className="text-sm text-foreground">{detail}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card-strong p-8 rounded-3xl shadow-xl border-2 border-primary/20"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-foreground">
                                Important: Document Everything
                            </h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                Keep detailed records of all communications with lenders and recovery agents. This includes:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                {[
                                    "Call recordings (if legally permitted)",
                                    "SMS and WhatsApp messages",
                                    "Email correspondence",
                                    "Written notices and letters",
                                    "Dates, times, and names of callers",
                                    "Details of any threats or harassment",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-sm text-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-4 italic">
                                These records will be crucial if you need to file a complaint with the RBI Ombudsman or take legal action.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">
                            Need help understanding your rights? Consult with our experts today
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
