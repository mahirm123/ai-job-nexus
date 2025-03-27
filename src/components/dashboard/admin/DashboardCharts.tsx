
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3, PieChart } from "lucide-react";

export const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Growth</CardTitle>
          <CardDescription>New users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-md">
            <BarChart3 size={48} className="text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">User Growth Chart</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Distribution</CardTitle>
          <CardDescription>Jobs by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-md">
            <PieChart size={48} className="text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Job Categories Chart</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
