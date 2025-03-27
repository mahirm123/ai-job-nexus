
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Shield, BarChart4, Briefcase, Users, Building } from "lucide-react";

interface SystemStatusItemProps {
  name: string;
  status: string;
  icon: React.ElementType;
  color: string;
}

// System status data
const systemStatus = [
  {
    name: "Database",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "API Services",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "Search Engine",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "Email Service",
    status: "Degraded",
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  {
    name: "Background Jobs",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
];

// Recent activity data
const recentActivity = [
  {
    id: "act1",
    action: "New user registered",
    details: "Alex Wong joined as a job seeker",
    time: "10 minutes ago",
    icon: Users,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "act2",
    action: "New job posted",
    details: "TechCorp AI posted 'Senior AI Engineer'",
    time: "2 hours ago",
    icon: Briefcase,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: "act3",
    action: "Company verification",
    details: "Neural Systems verification requested",
    time: "1 day ago",
    icon: Building,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: "act4",
    action: "User role changed",
    details: "Robert Kim promoted to Admin",
    time: "2 days ago",
    icon: Shield,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
];

export const SystemStatus = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Status</CardTitle>
          <CardDescription>Current status of all systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full bg-${system.status === 'Operational' ? 'green' : 'amber'}-100 flex items-center justify-center`}>
                    <system.icon size={16} className={system.color} />
                  </div>
                  <span className="font-medium">{system.name}</span>
                </div>
                <Badge
                  variant={system.status === "Operational" ? "default" : "outline"}
                  className={system.status === "Operational" ? "bg-green-500" : "text-amber-500 border-amber-200 bg-amber-100"}
                >
                  {system.status}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">System Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CPU Usage</span>
                  <span>28%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "28%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Memory Usage</span>
                  <span>42%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Disk Usage</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Latest system and administrative actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
                  <activity.icon size={14} className={activity.iconColor} />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">View All Activity</Button>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Platform Management</CardTitle>
          <CardDescription>System-wide settings and controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span>User Management</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Building className="h-6 w-6 mb-2" />
              <span>Organization Settings</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Shield className="h-6 w-6 mb-2" />
              <span>Permissions</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <BarChart4 className="h-6 w-6 mb-2" />
              <span>Analytics</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Briefcase className="h-6 w-6 mb-2" />
              <span>Job Board Settings</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span>Reported Content</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
