
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight text-gradient"
          >
            AI Job Nexus
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                to="/jobs"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                to="/employers"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                For Employers
              </Link>
              <Link
                to="/about"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 glass-card my-2 mx-4 rounded-xl">
          <Link
            to="/jobs"
            className="py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            to="/employers"
            className="py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            For Employers
          </Link>
          <Link
            to="/about"
            className="py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          <hr className="border-border" />
          
          <div className="flex items-center justify-between">
            <LanguageSwitcher />
            <div className="space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
