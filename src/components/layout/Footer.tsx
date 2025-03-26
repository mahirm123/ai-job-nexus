
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-gradient">
              AI Job Nexus
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs">
              Connecting talented professionals with innovative companies in the AI and tech industry.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} AI Job Nexus. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
