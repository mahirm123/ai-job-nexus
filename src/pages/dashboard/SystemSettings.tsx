
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { SystemStatus } from "@/components/dashboard/admin/SystemStatus";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SystemSettings = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <AdminHeader 
          title="System Settings" 
          subtitle="Configure system-wide settings and monitor performance" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Configuration</CardTitle>
              <CardDescription>Manage core system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable to put the site into maintenance mode
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registration">User Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register
                  </p>
                </div>
                <Switch id="registration" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="job-posting">Job Posting</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow employers to post new jobs
                  </p>
                </div>
                <Switch id="job-posting" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Configuration</CardTitle>
              <CardDescription>Configure email settings and templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="welcome-email">Welcome Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send welcome emails to new users
                  </p>
                </div>
                <Switch id="welcome-email" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="job-notifications">Job Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send job match notifications to candidates
                  </p>
                </div>
                <Switch id="job-notifications" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="application-alerts">Application Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send alerts about new applications to employers
                  </p>
                </div>
                <Switch id="application-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <SystemStatus />
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
