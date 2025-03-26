
import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".header-animation", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate sections when scrolled into view
      const sections = document.querySelectorAll(".section-animation");
      sections.forEach((section, index) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        });
      });

      // Team members animation
      gsap.from(".team-member", {
        scrollTrigger: {
          trigger: ".team-container",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen" ref={aboutRef}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 header-animation">About AI Job Nexus</h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto header-animation">
            Connecting talented professionals with innovative companies in the AI and tech industry
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 md:px-6 bg-secondary">
          <div className="container mx-auto max-w-4xl section-animation">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-lg mb-6">
              At AI Job Nexus, we're on a mission to revolutionize how talented professionals connect with 
              forward-thinking companies in the AI and technology sectors. We believe that the right job match 
              can transform careers and drive innovation.
            </p>
            <p className="text-lg">
              Our platform is designed to simplify the job search process while providing employers access to 
              the brightest minds in AI and tech. We leverage cutting-edge technology to create meaningful 
              connections that benefit both job seekers and employers.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl section-animation">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p>We embrace new technologies and ideas to continuously improve our platform and services.</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                <p>We operate with honesty and transparency in all our interactions with users and partners.</p>
              </div>
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Inclusivity</h3>
                <p>We believe in creating opportunities for everyone, regardless of background or experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 md:px-6 bg-secondary">
          <div className="container mx-auto max-w-4xl section-animation">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 team-container">
              <div className="text-center team-member">
                <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-semibold">Jane Doe</h3>
                <p className="text-foreground/70">CEO & Founder</p>
              </div>
              <div className="text-center team-member">
                <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold">John Smith</h3>
                <p className="text-foreground/70">CTO</p>
              </div>
              <div className="text-center team-member">
                <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">MC</span>
                </div>
                <h3 className="text-xl font-semibold">Maria Chen</h3>
                <p className="text-foreground/70">Head of Operations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
