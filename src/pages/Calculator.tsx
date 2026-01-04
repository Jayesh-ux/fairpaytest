import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calculator as CalcIcon, 
  DollarSign, 
  Percent, 
  Clock, 
  Wallet,
  TrendingDown,
  ArrowRight,
  Info
} from "lucide-react";

interface CalculatorInputs {
  totalDebt: number;
  apr: number;
  monthlyIncome: number;
  debtAge: number;
}

function calculateSettlement(inputs: CalculatorInputs): number {
  const { totalDebt, apr, monthlyIncome, debtAge } = inputs;
  
  // Debt age factor (0-1, older = better for settlement)
  const debtAgeFactor = Math.min(debtAge / 48, 1);
  
  // Income ratio (lower income = better for settlement)
  const incomeRatio = Math.min((monthlyIncome * 12) / totalDebt, 1);
  
  // Base settlement: 40% + up to 20% based on age - 10% based on income
  const settlementRate = 0.4 + (0.2 * debtAgeFactor) - (0.1 * incomeRatio);
  
  // APR bonus (higher APR = more leverage)
  const aprBonus = Math.min(apr / 100, 0.1);
  
  const finalRate = Math.min(Math.max(settlementRate + aprBonus, 0.35), 0.65);
  
  return totalDebt * finalRate;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    totalDebt: 25000,
    apr: 22,
    monthlyIncome: 4500,
    debtAge: 18,
  });
  
  const [settlement, setSettlement] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setSettlement(null);
    
    setTimeout(() => {
      const result = calculateSettlement(inputs);
      setSettlement(result);
      setIsCalculating(false);
    }, 1500);
  };

  const savings = settlement ? inputs.totalDebt - settlement : 0;
  const savingsPercent = settlement ? ((savings / inputs.totalDebt) * 100).toFixed(0) : 0;

  return (
    <Layout>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <CalcIcon className="w-4 h-4" />
              AI-Powered Estimation
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Settlement <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get an instant estimate of your potential savings based on your unique financial situation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card-strong rounded-2xl p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Enter Your Details
              </h2>

              <div className="space-y-6">
                {/* Total Debt */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <DollarSign className="w-4 h-4 text-accent" />
                    Total Debt Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={inputs.totalDebt}
                      onChange={(e) => setInputs({ ...inputs, totalDebt: Number(e.target.value) })}
                      className="w-full h-12 pl-8 pr-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    />
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="1000"
                    value={inputs.totalDebt}
                    onChange={(e) => setInputs({ ...inputs, totalDebt: Number(e.target.value) })}
                    className="w-full mt-3 accent-accent"
                  />
                </div>

                {/* APR */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Percent className="w-4 h-4 text-accent" />
                    Current APR (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.apr}
                      onChange={(e) => setInputs({ ...inputs, apr: Number(e.target.value) })}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="0.5"
                    value={inputs.apr}
                    onChange={(e) => setInputs({ ...inputs, apr: Number(e.target.value) })}
                    className="w-full mt-3 accent-accent"
                  />
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Wallet className="w-4 h-4 text-accent" />
                    Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={inputs.monthlyIncome}
                      onChange={(e) => setInputs({ ...inputs, monthlyIncome: Number(e.target.value) })}
                      className="w-full h-12 pl-8 pr-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    />
                  </div>
                </div>

                {/* Debt Age */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Clock className="w-4 h-4 text-accent" />
                    Debt Age (months)
                  </label>
                  <input
                    type="number"
                    value={inputs.debtAge}
                    onChange={(e) => setInputs({ ...inputs, debtAge: Number(e.target.value) })}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                  />
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={inputs.debtAge}
                    onChange={(e) => setInputs({ ...inputs, debtAge: Number(e.target.value) })}
                    className="w-full mt-3 accent-accent"
                  />
                </div>

                <Button
                  variant="accent"
                  size="xl"
                  className="w-full"
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
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Result Card */}
              <div className="glass-card-strong rounded-2xl p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Your Estimated Settlement
                </h2>

                <AnimatePresence mode="wait">
                  {settlement ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-6"
                    >
                      {/* Original vs Settlement */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="text-sm text-muted-foreground mb-1">Original Debt</div>
                          <div className="font-display text-2xl font-bold text-foreground">
                            ${inputs.totalDebt.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/10">
                          <div className="text-sm text-accent mb-1">Settlement Amount</div>
                          <div className="font-display text-2xl font-bold text-accent">
                            ${Math.round(settlement).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Savings Highlight */}
                      <div className="p-6 rounded-xl hero-gradient text-center">
                        <TrendingDown className="w-10 h-10 text-accent mx-auto mb-3" />
                        <div className="text-sm text-primary-foreground/80 mb-1">Potential Savings</div>
                        <div className="font-display text-4xl font-bold text-primary-foreground mb-1">
                          ${Math.round(savings).toLocaleString()}
                        </div>
                        <div className="text-accent font-semibold">
                          {savingsPercent}% Reduction
                        </div>
                      </div>

                      {/* CTA */}
                      <Button variant="hero" size="xl" className="w-full" asChild>
                        <Link to="/eligibility">
                          Start My Settlement
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <CalcIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Enter your details and click calculate to see your potential savings.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Disclaimer */}
              <div className="flex gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This estimate is based on industry averages and your provided information. 
                  Actual settlement amounts vary based on creditor policies and negotiation outcomes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
