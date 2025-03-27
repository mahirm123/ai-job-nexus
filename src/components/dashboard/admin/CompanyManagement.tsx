
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Company {
  id: string;
  name: string;
  jobs: number;
  employees: number;
  status: string;
  dateJoined: string;
}

interface CompanyManagementProps {
  companies: Company[];
  companyFilter: string;
  setCompanyFilter: (filter: string) => void;
  filteredCompanies: Company[];
}

export const CompanyManagement = ({ 
  companies, 
  companyFilter, 
  setCompanyFilter, 
  filteredCompanies 
}: CompanyManagementProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Company Management</CardTitle>
          <CardDescription>Manage all companies on the platform</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search companies..." 
              className="pl-10"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)} 
            />
          </div>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Company
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Jobs</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employees</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date Joined</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{company.name}</td>
                    <td className="p-4 align-middle">{company.jobs}</td>
                    <td className="p-4 align-middle">{company.employees}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={company.status === "Verified" ? "default" : "secondary"}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{company.dateJoined}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                        {company.status === "Pending" && (
                          <Button variant="outline" size="sm" className="text-green-600">Verify</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
