
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userInitials = user 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` 
    : "U";

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
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profileImage} alt={`${user?.firstName} ${user?.lastName}`} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
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
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="mr-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImage} alt={`${user?.firstName} ${user?.lastName}`} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <Link 
                    to="/dashboard" 
                    className="text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start px-0 text-sm text-destructive"
                  >
                    Log out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
