import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Calendar, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LoanCalculator() {
    const [creditCardDebt, setCreditCardDebt] = useState(500000);
    const [personalLoanDebt, setPersonalLoanDebt] = useState(300000);
    const [missedEMI, setMissedEMI] = useState<"yes" | "no">("no");

    // Calculate total debt
    const totalDebt = creditCardDebt + personalLoanDebt;

    // Calculate savings ( based on debt amount and missed EMI)
    const savingsPercentage = missedEMI === "yes" ? 0.55 : 0.50;
    const totalSavings = Math.round(totalDebt * savingsPercentage);

    // Calculate months to be debt free (12-24 months based on debt amount)
    const monthsToDebtFree = totalDebt > 1000000 ? 24 : totalDebt > 500000 ? 18 : 12;

    // Calculate monthly EMI (total debt - savings / months)
    const monthlyEMI = Math.round((totalDebt - totalSavings) / monthsToDebtFree);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                        Calculate Your Savings
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Debt Settlement
                        <br />
                        <span className="gradient-text">Calculator</span>
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        Explore potential savings through debt settlement guidance.
                        Get an instant estimate based on typical outcomes.
                    </p>
                </motion.div>

                {/* Calculator Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="glass-card-strong rounded-3xl p-6 md:p-10 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Left Side - Input Controls */}
                            <div className="space-y-8">
                                {/* Credit Card Debt */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                                            <IndianRupee className="w-5 h-5 text-primary" />
                                            Credit Card Debt
                                        </Label>
                                        <span className="text-lg font-bold text-primary">
                                            {formatCurrency(creditCardDebt)}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[creditCardDebt]}
                                        onValueChange={(value) => setCreditCardDebt(value[0])}
                                        min={0}
                                        max={5000000}
                                        step={50000}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>₹0</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>

                                {/* Personal Loan Debt */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                                            <IndianRupee className="w-5 h-5 text-primary" />
                                            Personal Loan Debt
                                        </Label>
                                        <span className="text-lg font-bold text-primary">
                                            {formatCurrency(personalLoanDebt)}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[personalLoanDebt]}
                                        onValueChange={(value) => setPersonalLoanDebt(value[0])}
                                        min={0}
                                        max={5000000}
                                        step={50000}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>₹0</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>

                                {/* Missed EMI Question */}
                                <div className="space-y-4">
                                    <Label className="text-base font-semibold text-foreground">
                                        Missed any EMI in the last 3 months?
                                    </Label>
                                    <RadioGroup
                                        value={missedEMI}
                                        onValueChange={(value) => setMissedEMI(value as "yes" | "no")}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes" />
                                            <Label htmlFor="yes" className="cursor-pointer font-normal">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no" />
                                            <Label htmlFor="no" className="cursor-pointer font-normal">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button variant="accent" size="lg" className="flex-1">
                                        <Calculator className="w-5 h-5 mr-2" />
                                        Show My Calculation
                                    </Button>
                                    <Button variant="outline" size="lg" className="flex-1">
                                        Contact Us
                                    </Button>
                                </div>
                            </div>

                            {/* Right Side - Results */}
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 flex flex-col justify-center">
                                <div className="space-y-6">
                                    {/* Total Debt */}
                                    <div className="text-center pb-6 border-b border-border/50">
                                        <p className="text-sm text-muted-foreground mb-2">Total Debt</p>
                                        <p className="text-3xl font-bold text-foreground">
                                            {formatCurrency(totalDebt)}
                                        </p>
                                    </div>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Total Est. Savings */}
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="bg-card rounded-xl p-6 text-center shadow-lg"
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <TrendingDown className="w-5 h-5 text-primary" />
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Total Est. Savings
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-primary">
                                                {formatCurrency(totalSavings)}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Potential reduction of ~{Math.round(savingsPercentage * 100)}%
                                            </p>
                                        </motion.div>

                                        {/* Debt Free In */}
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="bg-card rounded-xl p-6 text-center shadow-lg"
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <Calendar className="w-5 h-5 text-accent" />
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Estimated Timeline
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-accent">
                                                {monthsToDebtFree} Months
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Estimated settlement timeline
                                            </p>
                                        </motion.div>

                                        {/* Monthly EMI */}
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                            className="bg-card rounded-xl p-6 text-center shadow-lg"
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <IndianRupee className="w-5 h-5 text-foreground" />
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Monthly EMI
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-foreground">
                                                {formatCurrency(monthlyEMI)}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Affordable monthly payment
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Disclaimer */}
                                    <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
                                        *Please note that this is based on past trends and is merely a broad
                                        estimate. Actual savings may vary based on individual circumstances.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-4xl mx-auto mt-12 text-center"
                >
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>RBI Compliant Process</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>Legal Consultation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>10,000+ Happy Clients</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
