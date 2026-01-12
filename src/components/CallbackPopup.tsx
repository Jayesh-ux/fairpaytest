import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CallbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackPopup({ isOpen, onClose }: CallbackPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    loanAmount: "",
    loanType: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: "", phone: "", email: "", loanAmount: "", loanType: "", consent: false });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Form Section */}
              <div className="flex-1 p-6 lg:p-8">
                {/* Header */}
                <div className="bg-primary rounded-xl p-4 mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-primary-foreground text-center">
                    Get a Callback
                  </h2>
                </div>

                <p className="text-muted-foreground text-center mb-6">
                  Please fill your details below
                </p>

                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Our expert will call you within 30 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="8449653755"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-12"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanAmount" className="text-foreground">Loan Amount *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="loanAmount"
                          type="text"
                          placeholder="5,00,000"
                          value={formData.loanAmount}
                          onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanType" className="text-foreground">Loan Type *</Label>
                      <select
                        id="loanType"
                        value={formData.loanType}
                        onChange={(e) => handleInputChange("loanType", e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select loan type</option>
                        <option value="personal">Personal Loan (Unsecured)</option>
                        <option value="credit-card">Credit Card Dues</option>
                        <option value="digital-app">Digital App Loans</option>
                        <option value="nbfc">NBFC Unsecured Loans</option>
                      </select>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          checked={formData.consent}
                          onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                          className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
                          required
                        />
                        <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          I understand that FairPay Solution provides consultancy services only and does not guarantee loan settlement or credit score protection. *
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit
                          <span className="ml-1">→</span>
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Image Section - Desktop Only */}
              <div className="hidden lg:block w-80 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
                <img
                  src="/images/advisor.png"
                  alt="Professional Debt Advisor"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="font-display font-bold text-lg mb-2">
                      Expert Support
                    </h3>
                    <p className="text-sm text-white/90">
                      Our debt relief specialists are ready to help you achieve financial freedom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
