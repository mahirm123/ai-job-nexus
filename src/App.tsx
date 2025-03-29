
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/components/ui/LanguageSwitcher";

// Pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import ApplyJob from "./pages/ApplyJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Employers from "./pages/Employers";
import SearchJobs from "./pages/SearchJobs";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ApplicationDetail from "./pages/dashboard/ApplicationDetail";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Role-based Protected Route
const RoleProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode, 
  allowedRoles: string[] 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return user && allowedRoles.includes(user.role) ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/jobs/:id/apply" element={
        <ProtectedRoute>
          <ApplyJob />
        </ProtectedRoute>
      } />
      <Route path="/search" element={<SearchJobs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/employers" element={<Employers />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <CandidateDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/applications/:id" element={
        <ProtectedRoute>
          <ApplicationDetail />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/recruiter" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <RecruiterDashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleProtectedRoute>
      } />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
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
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
