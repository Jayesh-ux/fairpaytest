import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Building2,
  AlertCircle,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Shield
} from "lucide-react";

interface WizardStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const wizardSteps: WizardStep[] = [
  { id: 1, title: "Debt Age", subtitle: "How long have you had this debt?", icon: Clock },
  { id: 2, title: "Creditor Type", subtitle: "What type of creditor do you owe?", icon: Building2 },
  { id: 3, title: "Hardship", subtitle: "What's causing financial difficulty?", icon: AlertCircle },
  { id: 4, title: "Debt Amount", subtitle: "What's your total debt amount?", icon: DollarSign },
  { id: 5, title: "Results", subtitle: "Your personalized action plan", icon: CheckCircle2 },
];

const debtAgeOptions = [
  { value: "0-6", label: "Less than 6 months" },
  { value: "6-12", label: "6-12 months" },
  { value: "12-24", label: "1-2 years" },
  { value: "24-48", label: "2-4 years" },
  { value: "48+", label: "More than 4 years" },
];

const creditorOptions = [
  { value: "credit-card", label: "Credit Card Company" },
  { value: "bank", label: "Bank / Financial Institution" },
  { value: "medical", label: "Medical Provider / Hospital" },
  { value: "collection", label: "Collection Agency" },
  { value: "student", label: "Student Loan Servicer" },
  { value: "other", label: "Other" },
];

const hardshipOptions = [
  { value: "job-loss", label: "Job Loss / Unemployment" },
  { value: "medical", label: "Medical Emergency" },
  { value: "divorce", label: "Divorce / Separation" },
  { value: "income-reduction", label: "Reduced Income" },
  { value: "unexpected-expense", label: "Unexpected Major Expense" },
  { value: "other", label: "Other Circumstances" },
];

const debtAmountOptions = [
  { value: "50000-200000", label: "₹50,000 - ₹2,00,000" },
  { value: "200000-500000", label: "₹2,00,000 - ₹5,00,000" },
  { value: "500000-1000000", label: "₹5,00,000 - ₹10,00,000" },
  { value: "1000000-2500000", label: "₹10,00,000 - ₹25,00,000" },
  { value: "2500000+", label: "Over ₹25,00,000" },
];

export default function EligibilityPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (step: number, value: string) => {
    setAnswers({ ...answers, [step]: value });
    if (step < 4) {
      setTimeout(() => setCurrentStep(step + 1), 300);
    } else {
      setTimeout(() => setCurrentStep(5), 300);
    }
  };

  const getOptionsForStep = (step: number) => {
    switch (step) {
      case 1: return debtAgeOptions;
      case 2: return creditorOptions;
      case 3: return hardshipOptions;
      case 4: return debtAmountOptions;
      default: return [];
    }
  };

  const progress = ((currentStep - 1) / 4) * 100;

  return (
    <Layout>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 5
                </span>
                <span className="text-sm font-medium text-accent">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full accent-gradient rounded-full"
                />
              </div>
            </motion.div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-12">
              {wizardSteps.slice(0, 4).map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${step.id <= currentStep ? "text-accent" : "text-muted-foreground"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step.id < currentStep
                        ? "bg-accent text-accent-foreground"
                        : step.id === currentStep
                          ? "bg-accent/20 border-2 border-accent text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Wizard Content */}
            <AnimatePresence mode="wait">
              {currentStep < 5 ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card-strong rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {wizardSteps[currentStep - 1].subtitle}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Select the option that best describes your situation.
                  </p>

                  <div className="grid gap-3">
                    {getOptionsForStep(currentStep).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(currentStep, option.value)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${answers[currentStep] === option.value
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card hover:border-accent/50 hover:bg-muted/50 text-foreground"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers[currentStep] === option.value
                                ? "border-accent bg-accent"
                                : "border-border"
                              }`}
                          >
                            {answers[currentStep] === option.value && (
                              <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                      disabled={!answers[currentStep]}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Success Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                    className="w-20 h-20 rounded-full accent-gradient flex items-center justify-center mx-auto mb-6 shadow-glow"
                  >
                    <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
                  </motion.div>

                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Great News! You Qualify
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Based on your responses, you're eligible for our debt settlement program
                    with potential savings of 40-60%.
                  </p>

                  {/* Summary Card */}
                  <div className="glass-card-strong rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent" />
                      Your Profile Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Debt Age:</span>
                        <p className="font-medium text-foreground">
                          {debtAgeOptions.find(o => o.value === answers[1])?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Creditor Type:</span>
                        <p className="font-medium text-foreground">
                          {creditorOptions.find(o => o.value === answers[2])?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hardship:</span>
                        <p className="font-medium text-foreground">
                          {hardshipOptions.find(o => o.value === answers[3])?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Debt Amount:</span>
                        <p className="font-medium text-foreground">
                          {debtAmountOptions.find(o => o.value === answers[4])?.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="xl" asChild>
                      <Link to="/calculator">
                        Calculate My Savings
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="xl" asChild>
                      <a href="tel:1-800-555-0123">
                        Speak to an Advisor
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}
