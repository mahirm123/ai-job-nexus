
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserManagement } from "./UserManagement";
import { CompanyManagement } from "./CompanyManagement";
import { SystemStatus } from "./SystemStatus";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string | null;
  status: string;
  lastLogin: string;
}

interface Company {
  id: string;
  name: string;
  jobs: number;
  employees: number;
  status: string;
  dateJoined: string;
}

interface AdminTabsProps {
  users: User[];
  companies: Company[];
  userFilter: string;
  setUserFilter: (filter: string) => void;
  companyFilter: string;
  setCompanyFilter: (filter: string) => void;
  filteredUsers: User[];
  filteredCompanies: Company[];
}

export const AdminTabs = ({
  users,
  companies,
  userFilter,
  setUserFilter,
  companyFilter,
  setCompanyFilter,
  filteredUsers,
  filteredCompanies
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="users" className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
        <TabsTrigger value="system">System Status</TabsTrigger>
      </TabsList>
      
      {/* Users Tab */}
      <TabsContent value="users">
        <UserManagement 
          users={users} 
          userFilter={userFilter} 
          setUserFilter={setUserFilter} 
          filteredUsers={filteredUsers} 
        />
      </TabsContent>
      
      {/* Companies Tab */}
      <TabsContent value="companies">
        <CompanyManagement 
          companies={companies} 
          companyFilter={companyFilter} 
          setCompanyFilter={setCompanyFilter} 
          filteredCompanies={filteredCompanies} 
        />
      </TabsContent>
      
      {/* System Status Tab */}
      <TabsContent value="system">
        <SystemStatus />
      </TabsContent>
    </Tabs>
  );
};
