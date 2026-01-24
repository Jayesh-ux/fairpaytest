'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calculator as CalcIcon,
  IndianRupee,
  TrendingDown,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";

interface SimpleCalculatorInputs {
  totalDebt: number;
  monthlyIncome: number;
}

function calculateSimpleSettlement(inputs: SimpleCalculatorInputs): number {
  const { totalDebt, monthlyIncome } = inputs;

  // Simple calculation: settlement based on debt-to-income ratio
  const yearlyIncome = monthlyIncome * 12;
  const debtToIncomeRatio = totalDebt / yearlyIncome;

  // Higher debt-to-income ratio = better settlement percentage
  let settlementPercentage = 0.50; // Default 50%

  if (debtToIncomeRatio > 3) {
    settlementPercentage = 0.40; // Pay only 40% if debt is very high
  } else if (debtToIncomeRatio > 2) {
    settlementPercentage = 0.45; // Pay 45%
  } else if (debtToIncomeRatio > 1) {
    settlementPercentage = 0.50; // Pay 50%
  } else {
    settlementPercentage = 0.55; // Pay 55% if debt is manageable
  }

  return totalDebt * settlementPercentage;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<SimpleCalculatorInputs>({
    totalDebt: 500000,
    monthlyIncome: 50000,
  });

  const [settlement, setSettlement] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setSettlement(null);

    setTimeout(() => {
      const result = calculateSimpleSettlement(inputs);
      setSettlement(result);
      setIsCalculating(false);
    }, 1000);
  };

  const savings = settlement ? inputs.totalDebt - settlement : 0;
  const savingsPercent = settlement ? ((savings / inputs.totalDebt) * 100).toFixed(0) : 0;

  return (
    <>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CalcIcon className="w-4 h-4" />
              Simple & Easy Calculator
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Debt Settlement <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find out how much you can save on your debt in just 2 simple steps
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Simple Calculator Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card-strong rounded-2xl p-6 md:p-8 lg:p-10"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
                Enter Your Details
              </h2>

              <div className="space-y-8">
                {/* Total Debt */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-foreground mb-3">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Total Debt Amount
                  </label>
                  <p className="text-sm text-muted-foreground mb-3">
                    How much total debt do you have? (Personal loans, credit cards, etc.)
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
                    <input
                      type="number"
                      value={inputs.totalDebt}
                      onChange={(e) => setInputs({ ...inputs, totalDebt: Number(e.target.value) })}
                      className="w-full h-14 pl-10 pr-4 rounded-xl border-2 border-border bg-background text-foreground text-lg font-semibold focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="5,00,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={inputs.totalDebt}
                    onChange={(e) => setInputs({ ...inputs, totalDebt: Number(e.target.value) })}
                    className="w-full mt-4 accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹50,000</span>
                    <span className="font-semibold text-primary">₹{inputs.totalDebt.toLocaleString('en-IN')}</span>
                    <span>₹50,00,000</span>
                  </div>
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-foreground mb-3">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Monthly Income
                  </label>
                  <p className="text-sm text-muted-foreground mb-3">
                    What is your monthly salary or income?
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
                    <input
                      type="number"
                      value={inputs.monthlyIncome}
                      onChange={(e) => setInputs({ ...inputs, monthlyIncome: Number(e.target.value) })}
                      className="w-full h-14 pl-10 pr-4 rounded-xl border-2 border-border bg-background text-foreground text-lg font-semibold focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="50,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={inputs.monthlyIncome}
                    onChange={(e) => setInputs({ ...inputs, monthlyIncome: Number(e.target.value) })}
                    className="w-full mt-4 accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹10,000</span>
                    <span className="font-semibold text-primary">₹{inputs.monthlyIncome.toLocaleString('en-IN')}</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  variant="accent"
                  size="xl"
                  className="w-full h-14 text-lg"
                  onClick={handleCalculate}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full"
                      />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate My Savings
                      <CalcIcon className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {settlement ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-8 space-y-6"
                  >
                    {/* Divider */}
                    <div className="border-t-2 border-dashed border-border my-8"></div>

                    <h3 className="text-2xl font-bold text-center text-foreground mb-6">
                      Your Estimated Savings
                    </h3>

                    {/* Original vs Settlement */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-xl bg-muted/50 border-2 border-border">
                        <div className="text-sm text-muted-foreground mb-2">Original Debt</div>
                        <div className="font-display text-3xl font-bold text-foreground">
                          ₹{inputs.totalDebt.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/30">
                        <div className="text-sm text-primary mb-2">You Pay (Settlement)</div>
                        <div className="font-display text-3xl font-bold text-primary">
                          ₹{Math.round(settlement).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Savings Highlight */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-600 text-center shadow-xl">
                      <TrendingDown className="w-12 h-12 text-white mx-auto mb-3" />
                      <div className="text-sm text-white mb-2 font-medium">Your Total Savings</div>
                      <div className="font-display text-5xl font-bold text-white mb-2">
                        ₹{Math.round(savings).toLocaleString('en-IN')}
                      </div>
                      <div className="text-2xl font-semibold text-white">
                        {savingsPercent}% Discount
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-semibold text-foreground mb-1">How does this work?</p>
                          <p>Based on your income and debt amount, you may be able to settle your debt by paying only <strong className="text-foreground">{(100 - Number(savingsPercent))}%</strong> of the total amount and get the remaining <strong className="text-foreground">{savingsPercent}%</strong> waived off. This is an estimated calculation based on typical settlement scenarios.</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="xl" className="flex-1" asChild>
                        <Link href="/contact">
                          Get Free Consultation
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="xl" className="flex-1" asChild>
                        <a href="tel:+919389815277">
                          📞 Call Now
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <CalcIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Enter your details above and click "Calculate My Savings" to see your potential savings
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex gap-3 p-6 rounded-xl bg-amber-500/10 border border-amber-500/20"
            >
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Important Note</p>
                <p>
                  This is an estimated calculation only. Actual settlement amounts depend on your specific situation, creditor policies, and negotiation outcomes. Contact us for a personalized assessment and accurate information about your debt settlement options.
                </p>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 grid md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <a href="tel:+919389815277" className="text-sm text-primary hover:underline">
                  +91 9389815277
                </a>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-3xl mb-2">✉️</div>
                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                <a href="mailto:support@fairpaysolution.com" className="text-sm text-primary hover:underline break-all">
                  support@fairpaysolution.com
                </a>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                <a href="https://wa.me/919389815277" className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Chat with us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
