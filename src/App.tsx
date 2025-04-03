
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/components/ui/LanguageSwitcher";
import { ThemeProvider } from "@/components/ui/ThemeSwitcher";
import AppRoutes from "@/components/routes/AppRoutes";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const queryClient = new QueryClient();

const App = () => {
  // GSAP setup inside the component function
  useEffect(() => {
    // Setup smooth scrolling for the entire page
    gsap.config({ nullTargetWarn: false });
    
    // Add a class to the body for GSAP animations
    document.body.classList.add("gsap-animation-ready");
    
    return () => {
      // Clean up
      document.body.classList.remove("gsap-animation-ready");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
