
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  showNotifications?: boolean;
}

export const AdminHeader = ({
  title = "Admin Dashboard",
  subtitle = "Manage your platform",
  showNotifications = true,
}: AdminHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500">System Online</Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock size={12} />
          Last updated: Just now
        </Badge>
        {showNotifications && (
          <Button variant="outline" size="icon">
            <BellRing size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
