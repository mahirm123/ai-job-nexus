
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

// Import refactored components
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { PlatformStats } from "@/components/dashboard/admin/PlatformStats";
import { DashboardCharts } from "@/components/dashboard/admin/DashboardCharts";
import { AdminTabs } from "@/components/dashboard/admin/AdminTabs";
import { users, companies } from "@/components/dashboard/admin/MockData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Filter state
  const [userFilter, setUserFilter] = React.useState("");
  const [companyFilter, setCompanyFilter] = React.useState("");
  
  // Filtered users based on search
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
  
  // Filtered companies based on search
  const filteredCompanies = React.useMemo(() => {
    if (!companyFilter) return companies;
    
    const lowerCaseFilter = companyFilter.toLowerCase();
    return companies.filter(
      company => company.name.toLowerCase().includes(lowerCaseFilter)
    );
  }, [companyFilter]);
  
  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?returnUrl=/dashboard/admin");
    } else if (user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user]);
  
  if (!isAuthenticated || !user || user.role !== "admin") {
    return null; // Prevent flash of content before redirect
  }
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <AdminHeader />
        <PlatformStats />
        <DashboardCharts />
        <AdminTabs 
          users={users}
          companies={companies}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          filteredUsers={filteredUsers}
          filteredCompanies={filteredCompanies}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
