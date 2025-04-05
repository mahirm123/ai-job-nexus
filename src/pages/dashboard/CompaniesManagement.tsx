
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CompanyManagement } from "@/components/dashboard/admin/CompanyManagement";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { companies } from "@/components/dashboard/admin/MockData";

const CompaniesManagement = () => {
  const [companyFilter, setCompanyFilter] = useState("");
  
  const filteredCompanies = React.useMemo(() => {
    if (!companyFilter) return companies;
    
    const lowerCaseFilter = companyFilter.toLowerCase();
    return companies.filter(
      company => company.name.toLowerCase().includes(lowerCaseFilter)
    );
  }, [companyFilter]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <AdminHeader 
          title="Company Management" 
          subtitle="Manage and monitor all companies on the platform" 
        />
        <CompanyManagement 
          companies={companies} 
          companyFilter={companyFilter} 
          setCompanyFilter={setCompanyFilter} 
          filteredCompanies={filteredCompanies} 
        />
      </div>
    </DashboardLayout>
  );
};

export default CompaniesManagement;
