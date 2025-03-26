
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Employers = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Section animations
      const sections = document.querySelectorAll(".section-animate");
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // Card animations
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-container",
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power3.out"
      });

      // Stats counter animation
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.textContent || "0", 10);
        gsap.from(stat, {
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
          },
          innerText: 0,
          duration: 2,
          snap: { innerText: 1 },
          onUpdate: function() {
            stat.textContent = Math.ceil(this.targets()[0].innerText).toString();
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen" ref={pageRef}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-content">Hire Top AI Talent</h1>
                <p className="text-lg text-foreground/80 mb-8 hero-content">
                  Connect with the best AI engineers, data scientists, and machine learning experts to 
                  drive innovation at your company.
                </p>
                <div className="flex flex-wrap gap-4 hero-content">
                  <Button size="lg" asChild>
                    <Link to="/post-job">Post a Job</Link>
                  </Button>
                  <Button variant="outline" size="lg">Learn More</Button>
                </div>
              </div>
              <div className="hero-content">
                <div className="glass-card p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Why AI Job Nexus?</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Access to specialized AI talent pool</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>AI-powered candidate matching</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Enhanced company branding</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Streamlined hiring process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl stats-container section-animate">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary stat-number">5000</p>
                <p className="text-sm text-foreground/70">AI Professionals</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary stat-number">500</p>
                <p className="text-sm text-foreground/70">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary stat-number">1500</p>
                <p className="text-sm text-foreground/70">Jobs Posted</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary stat-number">95</p>
                <p className="text-sm text-foreground/70">Success Rate (%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl section-animate">
            <h2 className="text-3xl font-bold mb-12 text-center">Employer Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">AI Matching</h3>
                <p>Our advanced algorithms connect you with candidates who match your specific requirements and company culture.</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Company Showcase</h3>
                <p>Create a compelling company profile to attract top talent and showcase your unique culture and benefits.</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Applicant Tracking</h3>
                <p>Streamline your recruitment process with our intuitive applicant tracking and management system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl section-animate">
            <h2 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 pricing-container">
              <Card className="pricing-card">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-6">$99<span className="text-sm font-normal text-foreground/70">/month</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>3 active job postings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Basic company profile</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              
              <Card className="pricing-card border-primary">
                <CardHeader className="bg-primary/10">
                  <CardTitle>Professional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-6">$199<span className="text-sm font-normal text-foreground/70">/month</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>10 active job postings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Enhanced company profile</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Priority candidate matching</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              
              <Card className="pricing-card">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-6">Custom</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Unlimited job postings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Premium company profile</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">✓</div>
                      <span>Custom integration options</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-secondary">
          <div className="container mx-auto max-w-3xl text-center section-animate">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next AI Expert?</h2>
            <p className="text-lg mb-8 text-foreground/80">
              Join hundreds of companies already hiring through AI Job Nexus
            </p>
            <Button size="lg" asChild>
              <Link to="/post-job">Post a Job Today</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Employers;
