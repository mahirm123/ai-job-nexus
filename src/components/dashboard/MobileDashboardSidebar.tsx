
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Briefcase, LogOut, Home } from "lucide-react";
import { NavItem } from "./DashboardNavItems";

interface MobileDashboardSidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
  currentPath: string;
}

const MobileDashboardSidebar: React.FC<MobileDashboardSidebarProps> = ({
  navItems,
  isOpen,
  onOpenChange,
  onLogout,
  currentPath
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => onOpenChange(false)}
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
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={onLogout}>
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
  );
};

export default MobileDashboardSidebar;
