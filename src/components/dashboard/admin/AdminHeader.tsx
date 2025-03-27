
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export const AdminHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500">System Online</Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock size={12} />
          Last updated: Just now
        </Badge>
      </div>
    </div>
  );
};
