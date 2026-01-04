import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  Building2, 
  Stethoscope, 
  CreditCard, 
  GraduationCap,
  ArrowRight,
  TrendingDown,
  FileText,
  Users,
  CheckCircle2
} from "lucide-react";

const sectorData: Record<string, {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  avgReduction: string;
  strategies: string[];
  gradient: string;
}> = {
  "personal-loans": {
    icon: Wallet,
    title: "Personal Loans",
    subtitle: "High-Interest Debt Settlement",
    description: "Personal loan debt can accumulate quickly due to high interest rates. Our approach focuses on hardship documentation and negotiating reduced principal amounts.",
    avgReduction: "52%",
    strategies: [
      "Hardship letter preparation",
      "Interest rate reduction negotiation",
      "Lump-sum settlement offers",
      "Extended payment plan options"
    ],
    gradient: "from-accent to-teal-light",
  },
  "business-loans": {
    icon: Building2,
    title: "Business Loans",
    subtitle: "Cash Flow Restructuring",
    description: "Small business debt requires specialized handling. We work with creditors to restructure payments based on your business's actual cash flow.",
    avgReduction: "48%",
    strategies: [
      "Cash flow analysis documentation",
      "Business asset evaluation",
      "Revenue-based payment plans",
      "SBA loan modification guidance"
    ],
    gradient: "from-navy to-primary",
  },
  "medical-debt": {
    icon: Stethoscope,
    title: "Medical Debt",
    subtitle: "Billing Error & Insurance Advocacy",
    description: "Medical debt often contains billing errors. Our team reviews every charge and advocates with insurance companies to reduce your total owed.",
    avgReduction: "55%",
    strategies: [
      "Itemized bill review",
      "Insurance claim appeals",
      "Charity care applications",
      "Hospital financial assistance"
    ],
    gradient: "from-accent to-teal-light",
  },
  "credit-cards": {
    icon: CreditCard,
    title: "Credit Card Debt",
    subtitle: "Interest Freeze & Settlement",
    description: "Credit card companies are often willing to negotiate, especially on aged accounts. We secure interest freezes and lump-sum settlement offers.",
    avgReduction: "50%",
    strategies: [
      "Interest freeze requests",
      "Balance reduction offers",
      "Payment plan negotiation",
      "Multiple card consolidation"
    ],
    gradient: "from-navy to-primary",
  },
  "student-loans": {
    icon: GraduationCap,
    title: "Student Loans",
    subtitle: "Income-Based Repayment",
    description: "Federal and private student loans have different options. We help you navigate income-driven repayment plans and forgiveness programs.",
    avgReduction: "Various",
    strategies: [
      "Income-driven repayment enrollment",
      "Public Service Loan Forgiveness",
      "Private loan negotiation",
      "Consolidation guidance"
    ],
    gradient: "from-accent to-teal-light",
  },
};

const sectorList = Object.keys(sectorData);

export default function DashboardPage() {
  const { sector } = useParams<{ sector?: string }>();

  // If no sector specified, show sector selection
  if (!sector) {
    return (
      <Layout>
        <section className="pt-28 lg:pt-36 pb-20 lg:pb-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Select Your <span className="gradient-text">Debt Type</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the type of debt you need help with to see sector-specific strategies and resources.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sectorList.map((sectorKey, index) => {
                const data = sectorData[sectorKey];
                return (
                  <motion.div
                    key={sectorKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/dashboard/${sectorKey}`} className="group block h-full">
                      <div className="glass-card rounded-2xl p-8 h-full hover-lift group-hover:border-accent/50 transition-all">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <data.icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          {data.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {data.subtitle}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                          Avg. {data.avgReduction} reduction
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Validate sector
  if (!sectorData[sector]) {
    return <Navigate to="/dashboard" replace />;
  }

  const data = sectorData[sector];

  return (
    <Layout>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="glass-card-strong rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${data.gradient} flex items-center justify-center shrink-0`}>
                  <data.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <span className="text-accent text-sm font-medium uppercase tracking-wider">
                    Debt Settlement
                  </span>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                    {data.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    {data.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="accent" size="lg" asChild>
                      <Link to="/eligibility">
                        Start Settlement
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/calculator">
                        Calculate Savings
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Strategies */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <TrendingDown className="w-10 h-10 text-accent mx-auto mb-4" />
              <div className="font-display text-4xl font-bold text-foreground mb-2">
                {data.avgReduction}
              </div>
              <div className="text-sm text-muted-foreground">
                Average Debt Reduction
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <FileText className="w-10 h-10 text-accent mx-auto mb-4" />
              <div className="font-display text-4xl font-bold text-foreground mb-2">
                24-48
              </div>
              <div className="text-sm text-muted-foreground">
                Months to Freedom
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <Users className="w-10 h-10 text-accent mx-auto mb-4" />
              <div className="font-display text-4xl font-bold text-foreground mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                Client Success Rate
              </div>
            </motion.div>
          </div>

          {/* Strategies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-8 max-w-4xl mx-auto mt-6"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Our {data.title} Settlement Strategies
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.strategies.map((strategy, index) => (
                <div
                  key={strategy}
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/30"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{strategy}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sector Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Explore Other Sectors
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {sectorList.filter(s => s !== sector).map((sectorKey) => {
                const d = sectorData[sectorKey];
                return (
                  <Link
                    key={sectorKey}
                    to={`/dashboard/${sectorKey}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors"
                  >
                    <d.icon className="w-4 h-4" />
                    {d.title}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
