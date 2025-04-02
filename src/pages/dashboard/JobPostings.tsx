
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Briefcase, 
  MoreVertical, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash, 
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for job postings
const jobPostings = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    location: "Remote",
    department: "Engineering",
    postedDate: "2023-05-15",
    expiryDate: "2023-06-15",
    applicants: 34,
    status: "active",
  },
  {
    id: "job-2",
    title: "UI/UX Designer",
    location: "New York, NY",
    department: "Design",
    postedDate: "2023-05-12",
    expiryDate: "2023-06-12",
    applicants: 28,
    status: "active",
  },
  {
    id: "job-3",
    title: "Product Manager",
    location: "San Francisco, CA",
    department: "Product",
    postedDate: "2023-05-10",
    expiryDate: "2023-06-10",
    applicants: 42,
    status: "active",
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    location: "Remote",
    department: "Engineering",
    postedDate: "2023-05-08",
    expiryDate: "2023-05-25",
    applicants: 15,
    status: "closed",
  },
  {
    id: "job-5",
    title: "Backend Developer",
    location: "Austin, TX",
    department: "Engineering",
    postedDate: "2023-05-05",
    expiryDate: "2023-06-05",
    applicants: 31,
    status: "active",
  },
];

const JobPostings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredJobs = jobPostings.filter(job => {
    // Filter by search query
    if (searchQuery) {
      return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.department.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by tab
    if (activeTab === "active") {
      return job.status === "active";
    } else if (activeTab === "closed") {
      return job.status === "closed";
    }
    
    // "all" tab or default
    return true;
  });
  
  const handleCreateJob = () => {
    navigate("/post-job");
  };
  
  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };
  
  const handleEditJob = (jobId: string) => {
    toast({
      title: "Edit Job",
      description: `Editing job ${jobId} (Feature coming soon)`,
    });
  };
  
  const handleDeleteJob = (jobId: string) => {
    toast({
      title: "Delete Job",
      description: `Are you sure you want to delete this job? This action cannot be undone.`,
      variant: "destructive",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <Button onClick={handleCreateJob}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Job
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Manage Job Listings</CardTitle>
            <CardDescription>View and manage all your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Jobs</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.postedDate}</TableCell>
                        <TableCell>{job.expiryDate}</TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell>
                          <Badge
                            variant={job.status === "active" ? "default" : "secondary"}
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewJob(job.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteJob(job.id)} className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No job postings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JobPostings;
