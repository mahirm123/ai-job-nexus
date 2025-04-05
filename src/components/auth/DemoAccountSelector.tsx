
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Laptop, UserRound, Building, ShieldCheck } from "lucide-react";

type DemoUser = {
  role: string;
  email: string;
  password: string;
};

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
  // Helper function to get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "candidate":
        return <UserRound className="h-5 w-5 mr-2" />;
      case "employer":
        return <Building className="h-5 w-5 mr-2" />;
      case "admin":
        return <ShieldCheck className="h-5 w-5 mr-2" />;
      default:
        return <Laptop className="h-5 w-5 mr-2" />;
    }
  };
  
  return (
    <div className="space-y-3 animate-fade-up">
      <p className="text-sm text-center text-muted-foreground">Select a demo account to try:</p>
      <div className="grid grid-cols-3 gap-2">
        {demoUsers.map((demoUser) => (
          <Dialog key={demoUser.role}>
            <DialogTrigger asChild>
              <Button
                variant={selectedRole === demoUser.role ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onRoleSelect(demoUser.role)}
              >
                {getRoleIcon(demoUser.role)}
                {demoUser.role.charAt(0).toUpperCase() + demoUser.role.slice(1)}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Demo {demoUser.role} Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: {demoUser.email}<br />
                    Password: {demoUser.password}
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => onRoleSelect(demoUser.role)}
                >
                  Use these credentials
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default DemoAccountSelector;
