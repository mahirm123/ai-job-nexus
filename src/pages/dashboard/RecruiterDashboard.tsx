
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  BarChart3,
  Users,
  Briefcase,
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for job postings
const jobPostings = [
  {
    id: "job1",
    title: "Senior Machine Learning Engineer",
    location: "San Francisco, CA (Remote)",
    department: "AI Research",
    postedDate: "June 1, 2023",
    status: "Active",
    applicants: 24,
    newApplicants: 5,
    views: 342,
  },
  {
    id: "job2",
    title: "AI Research Scientist",
    location: "New York, NY",
    department: "Research",
    postedDate: "May 15, 2023",
    status: "Active",
    applicants: 18,
    newApplicants: 2,
    views: 275,
  },
  {
    id: "job3",
    title: "Data Engineer",
    location: "Remote",
    department: "Engineering",
    postedDate: "April 20, 2023",
    status: "Closed",
    applicants: 42,
    newApplicants: 0,
    views: 520,
  },
];

// Mock data for applicants
const applicants = [
  {
    id: "app1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Senior Machine Learning Engineer",
    status: "Interview",
    appliedDate: "June 10, 2023",
    matchScore: 92,
  },
  {
    id: "app2",
    name: "David Chen",
    email: "david.chen@example.com",
    role: "Senior Machine Learning Engineer",
    status: "Review",
    appliedDate: "June 12, 2023",
    matchScore: 85,
  },
  {
    id: "app3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    role: "AI Research Scientist",
    status: "New",
    appliedDate: "June 15, 2023",
    matchScore: 78,
  },
  {
    id: "app4",
    name: "Michael Park",
    email: "michael.p@example.com",
    role: "Senior Machine Learning Engineer",
    status: "Rejected",
    appliedDate: "June 8, 2023",
    matchScore: 65,
  },
  {
    id: "app5",
    name: "Aisha Khan",
    email: "aisha.k@example.com",
    role: "AI Research Scientist",
    status: "Offer",
    appliedDate: "June 5, 2023",
    matchScore: 95,
  },
];

// Mock data for upcoming interviews
const interviews = [
  {
    id: "int1",
    candidateName: "Sarah Johnson",
    role: "Senior Machine Learning Engineer",
    date: "June 22, 2023",
    time: "10:00 AM - 11:00 AM",
    interviewers: ["John Smith", "Maria Garcia"],
    type: "Technical Interview",
  },
  {
    id: "int2",
    candidateName: "Aisha Khan",
    role: "AI Research Scientist",
    date: "June 23, 2023",
    time: "2:00 PM - 3:00 PM",
    interviewers: ["Alex Wong", "Laura Peters"],
    type: "Final Interview",
  },
];

// Dashboard statistics
const dashboardStats = [
  {
    title: "Total Applicants",
    value: 84,
    change: "+12%",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: 8,
    change: "+2",
    icon: Briefcase,
  },
  {
    title: "Interviews This Week",
    value: 6,
    change: "-1",
    icon: Calendar,
  },
  {
    title: "Avg. Time to Hire",
    value: "18 days",
    change: "-2 days",
    icon: Clock,
  },
];

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Filter state for applicants
  const [applicantFilter, setApplicantFilter] = React.useState("");
  
  // Filtered applicants based on search
  const filteredApplicants = React.useMemo(() => {
    if (!applicantFilter) return applicants;
    
    const lowerCaseFilter = applicantFilter.toLowerCase();
    return applicants.filter(
      applicant => 
        applicant.name.toLowerCase().includes(lowerCaseFilter) ||
        applicant.email.toLowerCase().includes(lowerCaseFilter) ||
        applicant.role.toLowerCase().includes(lowerCaseFilter)
    );
  }, [applicantFilter, applicants]);
  
  // Redirect if not authenticated or not a recruiter
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?returnUrl=/dashboard/recruiter");
    } else if (user?.role !== "employer" && user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user]);
  
  if (!isAuthenticated || !user || (user.role !== "employer" && user.role !== "admin")) {
    return null; // Prevent flash of content before redirect
  }
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <Button className="whitespace-nowrap">
            <Plus size={16} className="mr-2" />
            Post New Job
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon size={24} className="text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Job Posting Performance Chart Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Job Posting Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center bg-secondary/50 rounded-md">
                <BarChart3 size={48} className="text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Job Performance Chart</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Interviews Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {interviews.length > 0 ? (
                <div className="space-y-4">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{interview.candidateName}</h3>
                        <Badge>{interview.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{interview.role}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>{interview.time}</span>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">View All Interviews</Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">No upcoming interviews</p>
                  <p className="text-xs text-muted-foreground">Schedule interviews with your candidates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="jobs" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
          </TabsList>
          
          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-4">
              {jobPostings.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{job.title}</h3>
                          <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Briefcase size={14} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Posted on {job.postedDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{job.applicants}</p>
                          <p className="text-xs text-muted-foreground">Applicants</p>
                          {job.newApplicants > 0 && (
                            <Badge variant="outline" className="text-xs bg-green-100 border-green-200 text-green-800 mt-1">
                              +{job.newApplicants} new
                            </Badge>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{job.views}</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {job.applicants > 0 ? Math.round((job.views / job.applicants) * 100) / 100 : 0}
                          </p>
                          <p className="text-xs text-muted-foreground">View/Apply</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant={job.status === "Active" ? "destructive" : "default"} 
                        size="sm"
                      >
                        {job.status === "Active" ? "Close Job" : "Reopen Job"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Applicants Tab */}
          <TabsContent value="applicants">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search applicants..." 
                  className="pl-10"
                  value={applicantFilter}
                  onChange={(e) => setApplicantFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <Card key={applicant.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={24} className="text-primary" />
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{applicant.name}</h3>
                            <p className="text-sm text-muted-foreground">{applicant.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {applicant.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Applied on {applicant.appliedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center p-1 rounded-full bg-primary/10">
                              <span className="text-sm font-bold px-2">{applicant.matchScore}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Match</p>
                          </div>
                          
                          <Badge
                            className={
                              applicant.status === "New" ? "bg-blue-500" :
                              applicant.status === "Review" ? "bg-amber-500" :
                              applicant.status === "Interview" ? "bg-purple-500" :
                              applicant.status === "Offer" ? "bg-green-500" :
                              "bg-destructive"
                            }
                          >
                            {applicant.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">Review Resume</Button>
                        
                        {applicant.status === "New" && (
                          <Button size="sm">Screen Candidate</Button>
                        )}
                        
                        {applicant.status === "Review" && (
                          <Button size="sm">Schedule Interview</Button>
                        )}
                        
                        {applicant.status === "Interview" && (
                          <Button size="sm">Send Offer</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No applicants found</h3>
                    <p className="text-sm text-muted-foreground">
                      {applicantFilter 
                        ? "Try adjusting your search terms" 
                        : "You don't have any applicants yet"
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={14} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Offer sent to <span className="font-semibold">Aisha Khan</span> for AI Research Scientist position</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <User size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium"><span className="font-semibold">Emily Rodriguez</span> applied for AI Research Scientist position</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle size={14} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium"><span className="font-semibold">Michael Park</span> was rejected for Senior Machine Learning Engineer position</p>
                  <p className="text-xs text-muted-foreground">4 days ago</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle size={14} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Interview scheduled with <span className="font-semibold">Sarah Johnson</span> for Senior Machine Learning Engineer</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
