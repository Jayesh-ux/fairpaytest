import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CallbackPopup } from "@/components/CallbackPopup";
import { toast } from "sonner";
import { Phone } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);

  // Show toast notification after 2 seconds (only once per session)
  useEffect(() => {
    if (!hasShownToast) {
      const timer = setTimeout(() => {
        toast("Need help with debt settlement?", {
          description: "Get a free callback from our experts",
          action: {
            label: "Get Callback",
            onClick: () => setIsCallbackOpen(true),
          },
          icon: <Phone className="w-5 h-5" />,
          duration: 8000, // Show for 8 seconds
        });
        setHasShownToast(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasShownToast]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header onOpenCallback={() => setIsCallbackOpen(true)} />
      <main className="flex-1 overflow-x-hidden">
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

