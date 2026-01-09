import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CallbackPopup } from "@/components/CallbackPopup";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Show popup on page load after 3 seconds (only once per session)
  useEffect(() => {
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsCallbackOpen(true);
        setHasShownPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenCallback={() => setIsCallbackOpen(true)} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CallbackPopup 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />
    </div>
  );
}
