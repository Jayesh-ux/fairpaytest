import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages-react-router/Index";
import Calculator from "./pages-react-router/Calculator";
import HowItWorks from "./pages-react-router/HowItWorks";
import Eligibility from "./pages-react-router/Eligibility";
import Dashboard from "./pages-react-router/Dashboard";
import Vault from "./pages-react-router/Vault";
import NotFound from "./pages-react-router/NotFound";
import PrivacyPolicy from "./pages-react-router/PrivacyPolicy";
import TermsConditions from "./pages-react-router/TermsConditions";
import Disclaimer from "./pages-react-router/Disclaimer";
import LoanPolicy from "./pages-react-router/LoanPolicy";
import NoGuarantee from "./pages-react-router/NoGuarantee";
import FeesRefund from "./pages-react-router/FeesRefund";
import Contact from "./pages-react-router/Contact";
import Media from "./pages-react-router/Media";

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
