
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, useLanguage } from "@/components/ui/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";

// Import the existing Navbar component and modify it to include ThemeSwitcher
export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  // Check if the current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-gradient">TechJobs</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors ${
                isActive("/jobs") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("nav.jobs")}
            </Link>
            <Link
              to="/employers"
              className={`text-sm font-medium transition-colors ${
                isActive("/employers") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("nav.employers")}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("nav.about")}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <Button asChild variant="default" className="btn-gradient">
              <Link to="/dashboard">{t("nav.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild className="btn-gradient">
                <Link to="/register">{t("nav.register")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
