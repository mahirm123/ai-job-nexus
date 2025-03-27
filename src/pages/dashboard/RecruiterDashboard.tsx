
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
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
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  FileText, 
  Users, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Download 
} from "lucide-react";

// Mock data for the recruiter dashboard
const jobPostings = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    location: "Remote",
    department: "Engineering",
    postedDate: "2023-05-15",
    applicants: 34,
    status: "active",
  },
  {
    id: "job-2",
    title: "UI/UX Designer",
    location: "New York, NY",
    department: "Design",
    postedDate: "2023-05-12",
    applicants: 28,
    status: "active",
  },
  {
    id: "job-3",
    title: "Product Manager",
    location: "San Francisco, CA",
    department: "Product",
    postedDate: "2023-05-10",
    applicants: 42,
    status: "active",
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    location: "Remote",
    department: "Engineering",
    postedDate: "2023-05-08",
    applicants: 15,
    status: "closed",
  },
  {
    id: "job-5",
    title: "Backend Developer",
    location: "Austin, TX",
    department: "Engineering",
    postedDate: "2023-05-05",
    applicants: 31,
    status: "active",
  },
];

const recentApplicants = [
  {
    id: "app-1",
    name: "Sophie Martinez",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-20",
    experience: "5 years",
    status: "pending",
  },
  {
    id: "app-2",
    name: "James Wilson",
    position: "UI/UX Designer",
    appliedDate: "2023-05-19",
    experience: "7 years",
    status: "accepted",
  },
  {
    id: "app-3",
    name: "Emma Johnson",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-18",
    experience: "6 years",
    status: "rejected",
  },
  {
    id: "app-4",
    name: "Alex Thompson",
    position: "Product Manager",
    appliedDate: "2023-05-17",
    experience: "8 years",
    status: "pending",
  },
  {
    id: "app-5",
    name: "Michael Brown",
    position: "Backend Developer",
    appliedDate: "2023-05-16",
    experience: "4 years",
    status: "accepted",
  },
];

const recruitmentMetrics = {
  activeJobs: 8,
  totalApplicants: 156,
  hiredThisMonth: 5,
  avgTimeToHire: "18 days",
  interviewsScheduled: 12,
  offerAcceptanceRate: "75%",
};

const upcomingInterviews = [
  {
    id: "int-1",
    candidate: "David Clark",
    position: "Senior Frontend Developer",
    date: "2023-05-22",
    time: "10:00 AM",
  },
  {
    id: "int-2",
    candidate: "Linda Harris",
    position: "UI/UX Designer",
    date: "2023-05-22",
    time: "2:30 PM",
  },
  {
    id: "int-3",
    candidate: "Robert Lewis",
    position: "Backend Developer",
    date: "2023-05-23",
    time: "11:15 AM",
  },
  {
    id: "int-4",
    candidate: "Jennifer Adams",
    position: "Product Manager",
    date: "2023-05-24",
    time: "1:00 PM",
  },
];

const RecentlyCreatedJobCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recently Created Jobs</CardTitle>
      <CardDescription>View and manage your job postings</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPostings.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.postedDate}</TableCell>
                <TableCell>{job.applicants}</TableCell>
                <TableCell>
                  <Badge
                    variant={job.status === "active" ? "default" : "secondary"}
                  >
                    {job.status === "active" ? "Active" : "Closed"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" className="mr-2">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </CardContent>
  </Card>
);

const RecentApplicantsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Applicants</CardTitle>
      <CardDescription>Latest candidates for your job postings</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.position}</TableCell>
                <TableCell>{applicant.appliedDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      applicant.status === "accepted"
                        ? "default"
                        : applicant.status === "rejected"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {applicant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

const RecruitmentMetricsCard = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.activeJobs}</div>
          <Briefcase className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.totalApplicants}</div>
          <Users className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Hired this Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.hiredThisMonth}</div>
          <CheckCircle className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.avgTimeToHire}</div>
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.interviewsScheduled}</div>
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Offer Acceptance Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{recruitmentMetrics.offerAcceptanceRate}</div>
          <BarChart className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const UpcomingInterviewsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Interviews</CardTitle>
      <CardDescription>Scheduled interviews for the next few days</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {upcomingInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex flex-col space-y-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
          >
            <div>
              <h3 className="font-medium">{interview.candidate}</h3>
              <p className="text-sm text-muted-foreground">
                {interview.position}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {interview.date}, {interview.time}
              </div>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handlePostNewJob = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon!",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <Button onClick={handlePostNewJob}>
            <Briefcase className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <RecruitmentMetricsCard />
            <RecentlyCreatedJobCard />
            <RecentApplicantsCard />
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Job Postings</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
                <Button size="sm" onClick={handlePostNewJob}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </div>
            <RecentlyCreatedJobCard />
          </TabsContent>
          
          <TabsContent value="applicants" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Applicants</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
              </div>
            </div>
            <RecentApplicantsCard />
          </TabsContent>
          
          <TabsContent value="interviews" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Interview Schedule</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </div>
            <UpcomingInterviewsCard />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
