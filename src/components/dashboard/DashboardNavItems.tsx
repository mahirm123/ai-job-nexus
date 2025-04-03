
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare,
  Star,
  Users,
  Building,
  BarChart3,
  Shield,
  Settings
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

// Navigation items based on user role
export const candidateNavItems: NavItem[] = [
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

export const recruiterNavItems: NavItem[] = [
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

export const adminNavItems: NavItem[] = [
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

export const getNavItemsByRole = (role?: string): NavItem[] => {
  if (role === "admin") return adminNavItems;
  if (role === "employer") return recruiterNavItems;
  return candidateNavItems;
};
