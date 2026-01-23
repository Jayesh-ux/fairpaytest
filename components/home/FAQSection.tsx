import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much can I save through debt settlement?",
    answer: "Typically, clients save  on their outstanding debt amount. The exact savings depend on factors like the type of loan, outstanding amount, and your lender. Our experts analyze your case to maximize your savings.",
  },
  {
    question: "Is debt settlement legal in India?",
    answer: "Yes, debt settlement is completely legal in India. It's a negotiation process between you (through us) and your lender. We follow all RBI guidelines and work within the legal framework to help you settle your debts.",
  },
  {
    question: "How long does the debt settlement process take?",
    answer: "The average timeline is 12-24 months, depending on the complexity of your case and the number of creditors. Some simpler cases can be resolved in as little as 6 months.",
  },
  {
    question: "Will debt settlement affect my CIBIL score?",
    answer: "There may be a temporary dip in your credit score during the settlement process. However, once settled, you can start rebuilding your credit. Many clients see significant score improvements within 12 months of settlement.",
  },
  {
    question: "Can you handle multiple loans from different banks?",
    answer: "Absolutely! We specialize in handling multiple debts across different lenders. Our team negotiates with each creditor individually to get you the best possible settlement on all your outstanding loans.",
  },
  {
    question: "Do I need to appear in court?",
    answer: "No, court appearances are typically not required for debt settlement. Our legal team handles all negotiations and documentation on your behalf. You simply provide the required documents and we take care of the rest.",
  },
  {
    question: "How are payments handled securely?",
    answer: "All settlement payments are processed through secure escrow accounts. This protects both you and the lender, ensuring transparent and safe transactions. You'll receive detailed receipts for every payment.",
  },
  {
    question: "What happens to the harassing collection calls?",
    answer: "Once you enroll in our program, we provide immediate relief from harassment. We communicate with your creditors on your behalf and ensure they direct all communication through us, not you.",
  },
  {
    question: "Can I start the process with a free consultation?",
    answer: "Yes! We offer a completely free, no-obligation consultation. Our experts will analyze your debt situation, explain your options, and recommend the best path forward. There's no pressure to enroll.",
  },
  {
    question: "What types of loans do you help settle?",
    answer: "We help with all types of unsecured and secured loans including personal loans, credit card debt, business loans, vehicle loans, home loans, and education loans. Each case is handled by specialists in that loan category.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked
            <br />
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Get answers to common questions about our debt relief services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
