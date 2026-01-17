import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import HowItWorks from "./pages/HowItWorks";
import Eligibility from "./pages/Eligibility";
import Dashboard from "./pages/Dashboard";
import Vault from "./pages/Vault";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import LoanPolicy from "./pages/LoanPolicy";
import NoGuarantee from "./pages/NoGuarantee";
import FeesRefund from "./pages/FeesRefund";
import Contact from "./pages/Contact";
import Media from "./pages/Media";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:sector" element={<Dashboard />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/media" element={<Media />} />
          <Route path="/blog" element={<Media />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/loan-policy" element={<LoanPolicy />} />
          <Route path="/no-guarantee" element={<NoGuarantee />} />
          <Route path="/fees-refund" element={<FeesRefund />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
