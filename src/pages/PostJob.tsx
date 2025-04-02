
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PostJobForm from "@/components/jobs/PostJobForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PostJob = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is not authenticated or is not an employer/admin
  if (!isAuthenticated || (user?.role !== 'employer' && user?.role !== 'admin')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Post a New Job</h1>
          <PostJobForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;
