
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data for jobs
const jobs = [
  { 
    id: "1", 
    title: "Senior Frontend Developer", 
    company: "TechCorp", 
    location: "Remote",
    status: "Active",
    applicants: 24,
    datePosted: "2025-03-12"
  },
  { 
    id: "2", 
    title: "UX Designer", 
    company: "DesignHub", 
    location: "New York, NY",
    status: "Active",
    applicants: 18,
    datePosted: "2025-03-15"
  },
  { 
    id: "3", 
    title: "Data Scientist", 
    company: "DataMind", 
    location: "San Francisco, CA",
    status: "Paused",
    applicants: 32,
    datePosted: "2025-03-08"
  },
  { 
    id: "4", 
    title: "Backend Engineer", 
    company: "ServerPro", 
    location: "Remote",
    status: "Closed",
    applicants: 45,
    datePosted: "2025-02-25"
  }
];

const JobManagement = () => {
  const [jobFilter, setJobFilter] = React.useState("");
  
  const filteredJobs = React.useMemo(() => {
    if (!jobFilter) return jobs;
    
    const lowerCaseFilter = jobFilter.toLowerCase();
    return jobs.filter(
      job => 
        job.title.toLowerCase().includes(lowerCaseFilter) ||
        job.company.toLowerCase().includes(lowerCaseFilter) ||
        job.location.toLowerCase().includes(lowerCaseFilter)
    );
  }, [jobFilter]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <AdminHeader 
          title="Job Management" 
          subtitle="Manage and monitor all job listings" 
        />
        <Card className="mt-6">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Job Listings</CardTitle>
              <CardDescription>Manage all jobs posted on the platform</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs..." 
                  className="pl-10"
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)} 
                />
              </div>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Add Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Applicants</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Posted</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle font-medium">{job.title}</td>
                        <td className="p-4 align-middle">{job.company}</td>
                        <td className="p-4 align-middle">{job.location}</td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={
                              job.status === "Active" ? "default" : 
                              job.status === "Paused" ? "secondary" : "outline"
                            }
                          >
                            {job.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{job.applicants}</td>
                        <td className="p-4 align-middle">{job.datePosted}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
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
      </div>
    </DashboardLayout>
  );
};

export default JobManagement;
