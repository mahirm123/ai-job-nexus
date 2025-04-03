
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DemoUser {
  role: string;
  email: string;
  password: string;
}

interface DemoAccountSelectorProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
  demoUsers: DemoUser[];
}

const DemoAccountSelector: React.FC<DemoAccountSelectorProps> = ({
  selectedRole,
  onRoleSelect,
  demoUsers
}) => {
  return (
    <div className="space-y-2 animate-fade-up">
      <Label htmlFor="demo-select">Quick access with demo accounts</Label>
      <Select value={selectedRole} onValueChange={onRoleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a demo account" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="candidate">Job Seeker (Candidate)</SelectItem>
          <SelectItem value="employer">Recruiter (Employer)</SelectItem>
          <SelectItem value="admin">Administrator</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">
        Select a role to auto-fill demo credentials
      </p>
    </div>
  );
};

export default DemoAccountSelector;
