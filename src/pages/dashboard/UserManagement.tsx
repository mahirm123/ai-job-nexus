
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { UserManagement as UserManagementComponent } from "@/components/dashboard/admin/UserManagement";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { users } from "@/components/dashboard/admin/MockData";

const UserManagement = () => {
  const [userFilter, setUserFilter] = useState("");
  
  const filteredUsers = React.useMemo(() => {
    if (!userFilter) return users;
    
    const lowerCaseFilter = userFilter.toLowerCase();
    return users.filter(
      user => 
        user.name.toLowerCase().includes(lowerCaseFilter) ||
        user.email.toLowerCase().includes(lowerCaseFilter) ||
        (user.company && user.company.toLowerCase().includes(lowerCaseFilter))
    );
  }, [userFilter]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <AdminHeader 
          title="User Management" 
          subtitle="Manage and monitor all users on the platform" 
        />
        <UserManagementComponent 
          users={users} 
          userFilter={userFilter} 
          setUserFilter={setUserFilter} 
          filteredUsers={filteredUsers} 
        />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
