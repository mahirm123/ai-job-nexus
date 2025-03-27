
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, Briefcase, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  change: string;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <Card>
    <CardContent className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-green-500">{change} from last month</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon size={24} className="text-primary" />
      </div>
    </CardContent>
  </Card>
);

// Mock data for platform statistics
const platformStats = [
  {
    title: "Total Users",
    value: 2548,
    change: "+15%",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: 182,
    change: "+8%",
    icon: Briefcase,
  },
  {
    title: "Companies",
    value: 85,
    change: "+12%",
    icon: Building,
  },
  {
    title: "Applications",
    value: 6721,
    change: "+23%",
    icon: ArrowUpRight,
  },
];

export const PlatformStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {platformStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
