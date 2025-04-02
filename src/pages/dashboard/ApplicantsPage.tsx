
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  MessageSquare, 
  Download,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for applicants
const applicants = [
  {
    id: "app-1",
    name: "Sophie Martinez",
    position: "Senior Frontend Developer",
    jobId: "job-1",
    appliedDate: "2023-05-20",
    experience: "5 years",
    status: "pending",
    email: "sophie.martinez@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-2",
    name: "James Wilson",
    position: "UI/UX Designer",
    jobId: "job-2",
    appliedDate: "2023-05-19",
    experience: "7 years",
    status: "accepted",
    email: "james.wilson@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-3",
    name: "Emma Johnson",
    position: "Senior Frontend Developer",
    jobId: "job-1",
    appliedDate: "2023-05-18",
    experience: "6 years",
    status: "rejected",
    email: "emma.johnson@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-4",
    name: "Alex Thompson",
    position: "Product Manager",
    jobId: "job-3",
    appliedDate: "2023-05-17",
    experience: "8 years",
    status: "pending",
    email: "alex.thompson@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-5",
    name: "Michael Brown",
    position: "Backend Developer",
    jobId: "job-5",
    appliedDate: "2023-05-16",
    experience: "4 years",
    status: "accepted",
    email: "michael.brown@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-6",
    name: "Olivia Davis",
    position: "DevOps Engineer",
    jobId: "job-4",
    appliedDate: "2023-05-15",
    experience: "6 years",
    status: "rejected",
    email: "olivia.davis@example.com",
    resumeUrl: "#",
  },
  {
    id: "app-7",
    name: "Daniel White",
    position: "Backend Developer",
    jobId: "job-5",
    appliedDate: "2023-05-14",
    experience: "3 years",
    status: "pending",
    email: "daniel.white@example.com",
    resumeUrl: "#",
  },
];

const ApplicantsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  
  const filteredApplicants = applicants.filter(applicant => {
    // Filter by search query
    if (searchQuery && 
        !applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !applicant.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && applicant.status !== statusFilter) {
      return false;
    }
    
    // Filter by position
    if (positionFilter !== "all" && applicant.position !== positionFilter) {
      return false;
    }
    
    return true;
  });
  
  const positions = [...new Set(applicants.map(a => a.position))];
  
  const handleViewApplicant = (id: string) => {
    toast({
      title: "View Applicant",
      description: `Viewing applicant ${id}`,
    });
  };
  
  const handleMessageApplicant = (id: string) => {
    toast({
      title: "Message Applicant",
      description: `Opening message thread with applicant ${id}`,
    });
  };
  
  const handleUpdateStatus = (id: string, status: string) => {
    toast({
      title: "Status Updated",
      description: `Applicant status updated to ${status}`,
    });
  };
  
  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Applicants</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Manage Applicants</CardTitle>
            <CardDescription>View and track all applicants for your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applicants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={positionFilter}
                  onValueChange={setPositionFilter}
                >
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Filter by position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map(position => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="ml-auto">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Additional filters</span>
                </Button>
              </div>
            </div>
            
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">{applicant.name}</TableCell>
                        <TableCell>{applicant.position}</TableCell>
                        <TableCell>{applicant.appliedDate}</TableCell>
                        <TableCell>{applicant.experience}</TableCell>
                        <TableCell>
                          {renderStatusBadge(applicant.status)}
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
                              <DropdownMenuItem onClick={() => handleViewApplicant(applicant.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMessageApplicant(applicant.id)}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(applicant.id, "accepted")} disabled={applicant.status === "accepted"}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(applicant.id, "rejected")} disabled={applicant.status === "rejected"}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(applicant.id, "pending")} disabled={applicant.status === "pending"}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark as Pending
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No applicants found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicantsPage;
