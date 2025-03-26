
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Zap, Globe, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold">15k+</h3>
                <p className="text-muted-foreground">AI & Tech Jobs</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold">5k+</h3>
                <p className="text-muted-foreground">Companies</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold">30k+</h3>
                <p className="text-muted-foreground">Job Seekers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold">85%</h3>
                <p className="text-muted-foreground">Placement Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedJobs />
        
        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose AI Job Nexus</h2>
              <p className="text-muted-foreground">
                We connect talented professionals with innovative companies through a platform designed for the unique needs of the AI and tech industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card rounded-xl p-6 text-center md:text-left animate-slide-up">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Matching</h3>
                <p className="text-muted-foreground">
                  Our advanced algorithms analyze your skills and preferences to find the perfect job opportunities for you.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center md:text-left animate-slide-up [animation-delay:100ms]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Globe size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Access opportunities from leading tech companies around the world, with full support for remote positions.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center md:text-left animate-slide-up [animation-delay:200ms]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <BarChart2 size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Salary Insights</h3>
                <p className="text-muted-foreground">
                  Get accurate salary information for different roles and locations to help you negotiate better offers.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center md:text-left animate-slide-up [animation-delay:300ms]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Lock size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your data is secure with our privacy-focused approach. Control who sees your profile and application details.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <a href="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to Advance Your AI Career?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who found their dream jobs through AI Job Nexus. 
                  Create your profile today and let opportunities come to you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild>
                    <a href="/register">Create Your Profile</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/employers">For Employers</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
