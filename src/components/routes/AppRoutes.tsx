
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import JobDetail from "@/pages/JobDetail";
import ApplyJob from "@/pages/ApplyJob";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Employers from "@/pages/Employers";
import SearchJobs from "@/pages/SearchJobs";
import NotFound from "@/pages/NotFound";
import PostJob from "@/pages/PostJob";

// Dashboard Pages
import CandidateDashboard from "@/pages/dashboard/CandidateDashboard";
import RecruiterDashboard from "@/pages/dashboard/RecruiterDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import ApplicationDetail from "@/pages/dashboard/ApplicationDetail";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import SavedJobsPage from "@/pages/dashboard/SavedJobsPage";
import ApplicationsPage from "@/pages/dashboard/ApplicationsPage";

// Employer Dashboard Pages
import JobPostings from "@/pages/dashboard/JobPostings";
import ApplicantsPage from "@/pages/dashboard/ApplicantsPage";
import MessagesPage from "@/pages/dashboard/MessagesPage";
import CompanyProfile from "@/pages/dashboard/CompanyProfile";
import Analytics from "@/pages/dashboard/Analytics";
import Settings from "@/pages/dashboard/Settings";

// Admin Dashboard Pages
import UserManagement from "@/pages/dashboard/UserManagement";
import CompaniesManagement from "@/pages/dashboard/CompaniesManagement";
import JobManagement from "@/pages/dashboard/JobManagement";
import SystemSettings from "@/pages/dashboard/SystemSettings";

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
      
      <Route path="/post-job" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <PostJob />
        </RoleProtectedRoute>
      } />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <CandidateDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/saved" element={
        <ProtectedRoute>
          <SavedJobsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/applications" element={
        <ProtectedRoute>
          <ApplicationsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/applications/:id" element={
        <ProtectedRoute>
          <ApplicationDetail />
        </ProtectedRoute>
      } />
      
      {/* Employer Dashboard Routes */}
      <Route path="/dashboard/recruiter" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <RecruiterDashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/jobs" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <JobPostings />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/applicants" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <ApplicantsPage />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/messages" element={
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/company" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <CompanyProfile />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/analytics" element={
        <RoleProtectedRoute allowedRoles={['employer', 'admin']}>
          <Analytics />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      {/* Admin Dashboard Routes */}
      <Route path="/dashboard/admin" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/users" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <UserManagement />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/companies" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <CompaniesManagement />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/jobs/manage" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <JobManagement />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/system" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <SystemSettings />
        </RoleProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
