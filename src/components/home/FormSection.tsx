import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const loanTypes = [
  { value: "personal", label: "Personal Loan" },
  { value: "home", label: "Home Loan" },
  { value: "vehicle", label: "Vehicle Loan" },
  { value: "business", label: "Business Loan" },
  { value: "education", label: "Education Loan" },
  { value: "credit-card", label: "Credit Card" },
];

const lenders = [
  { value: "sbi", label: "State Bank of India" },
  { value: "hdfc", label: "HDFC Bank" },
  { value: "icici", label: "ICICI Bank" },
  { value: "axis", label: "Axis Bank" },
  { value: "kotak", label: "Kotak Mahindra Bank" },
  { value: "pnb", label: "Punjab National Bank" },
  { value: "other", label: "Other" },
];

export function FormSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    lender: "",
    accountNo: "",
    outstandingAmount: "",
    tenureLeft: "",
  });
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Our team will contact you within 24 hours.",
    });
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      loanType: "",
      lender: "",
      accountNo: "",
      outstandingAmount: "",
      tenureLeft: "",
    });
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email && formData.phone;
    if (step === 2) return formData.loanType && formData.lender;
    if (step === 3) return formData.outstandingAmount;
    return false;
  };

  return (
    <section className="py-20 lg:py-32 bg-background" id="get-started">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Get Started Free
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your Loan Closure
            </h2>
            <p className="text-muted-foreground">
              Fill in your details and our experts will guide you through the process.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Loan Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Loan Type</Label>
                      <Select value={formData.loanType} onValueChange={(v) => handleChange("loanType", v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Lender / Bank</Label>
                      <Select value={formData.lender} onValueChange={(v) => handleChange("lender", v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your lender" />
                        </SelectTrigger>
                        <SelectContent>
                          {lenders.map((lender) => (
                            <SelectItem key={lender.value} value={lender.value}>
                              {lender.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accountNo">Loan Account Number (Optional)</Label>
                      <Input
                        id="accountNo"
                        placeholder="Enter loan account number"
                        value={formData.accountNo}
                        onChange={(e) => handleChange("accountNo", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Financial Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Financial Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="outstandingAmount">Outstanding Amount (₹)</Label>
                      <Input
                        id="outstandingAmount"
                        type="number"
                        placeholder="Enter outstanding amount"
                        value={formData.outstandingAmount}
                        onChange={(e) => handleChange("outstandingAmount", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tenureLeft">Tenure Left (Months)</Label>
                      <Input
                        id="tenureLeft"
                        type="number"
                        placeholder="Remaining months"
                        value={formData.tenureLeft}
                        onChange={(e) => handleChange("tenureLeft", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Processing Fee Notice */}
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Processing Fee: <span className="font-semibold text-foreground">₹99 only</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Secure payment via Razorpay. 100% refundable if we can't help.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    variant="accent"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" variant="accent" disabled={!canProceed()}>
                    Submit Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
