
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  MessageSquare,
  Star,
  Users,
  Building,
  BarChart3,
  Shield,
  ChevronRight,
  Home
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Footer } from "@/components/layout/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Navigation items based on user role
const candidateNavItems = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    name: "My Profile", 
    href: "/dashboard/profile", 
    icon: User 
  },
  { 
    name: "Applications", 
    href: "/dashboard/applications", 
    icon: FileText 
  },
  { 
    name: "Saved Jobs", 
    href: "/dashboard/saved", 
    icon: Star 
  },
  { 
    name: "Messages", 
    href: "/dashboard/messages", 
    icon: MessageSquare 
  },
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings 
  },
];

const recruiterNavItems = [
  { 
    name: "Dashboard", 
    href: "/dashboard/recruiter", 
    icon: LayoutDashboard 
  },
  { 
    name: "Job Postings", 
    href: "/dashboard/jobs", 
    icon: Briefcase 
  },
  { 
    name: "Applicants", 
    href: "/dashboard/applicants", 
    icon: Users 
  },
  { 
    name: "Messages", 
    href: "/dashboard/messages", 
    icon: MessageSquare 
  },
  { 
    name: "Company Profile", 
    href: "/dashboard/company", 
    icon: Building 
  },
  { 
    name: "Analytics", 
    href: "/dashboard/analytics", 
    icon: BarChart3 
  },
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings 
  },
];

const adminNavItems = [
  { 
    name: "Dashboard", 
    href: "/dashboard/admin", 
    icon: LayoutDashboard 
  },
  { 
    name: "User Management", 
    href: "/dashboard/users", 
    icon: Users 
  },
  { 
    name: "Companies", 
    href: "/dashboard/companies", 
    icon: Building 
  },
  { 
    name: "Job Management", 
    href: "/dashboard/jobs/manage", 
    icon: Briefcase 
  },
  { 
    name: "Analytics", 
    href: "/dashboard/analytics", 
    icon: BarChart3 
  },
  { 
    name: "System Settings", 
    href: "/dashboard/system", 
    icon: Shield 
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Determine navigation items based on user role
  const navItems = user?.role === "admin" 
    ? adminNavItems
    : user?.role === "employer" 
      ? recruiterNavItems
      : candidateNavItems;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const userInitials = user 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` 
    : "U";
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-background px-4 py-4 shadow-sm md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold">AI Job Nexus</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-sm">
              <div className="flex flex-col h-full">
                <div className="py-4">
                  <Link to="/" className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="font-bold">AI Job Nexus</span>
                  </Link>
                </div>
                
                <Separator />
                
                <div className="flex-1 overflow-auto py-4">
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileSidebarOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary hover:text-secondary-foreground"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                <Separator />
                
                <div className="py-4">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                  <Link to="/" className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r md:block md:w-64 lg:w-72">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link to="/" className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-bold">AI Job Nexus</span>
              </Link>
            </div>
            
            <div className="flex-1 overflow-auto py-6 px-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <Link
                to="/"
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Footer is visible on mobile only */}
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
