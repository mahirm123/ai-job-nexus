
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
          <div key={demoUser.role}>
            <Dialog>
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
                <DialogHeader>
                  <DialogTitle>Demo {demoUser.role} Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email: {demoUser.email}<br />
                      Password: {demoUser.password}
                    </p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Call onRoleSelect and then close dialog
                      onRoleSelect(demoUser.role);
                      // We don't need to manually close Dialog as it auto-closes on action
                    }}
                  >
                    Use these credentials
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoAccountSelector;
