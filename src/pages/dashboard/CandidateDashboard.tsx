
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseBusiness,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Star,
  ThumbsUp,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for applications
const applications = [
  {
    id: "app1",
    jobTitle: "Senior Machine Learning Engineer",
    company: "TechCorp AI",
    status: "In Review",
    date: "June 15, 2023",
    stage: "Technical Interview",
    progress: 60,
  },
  {
    id: "app2",
    jobTitle: "AI Research Scientist",
    company: "Quantum Labs",
    status: "Applied",
    date: "June 10, 2023",
    stage: "Application Submitted",
    progress: 20,
  },
  {
    id: "app3",
    jobTitle: "Data Scientist",
    company: "DataWorks Inc.",
    status: "Rejected",
    date: "May 28, 2023",
    stage: "Final Decision",
    progress: 100,
  },
  {
    id: "app4",
    jobTitle: "Computer Vision Engineer",
    company: "VisualTech",
    status: "Offer",
    date: "May 20, 2023",
    stage: "Offer Received",
    progress: 100,
  },
];

// Mock data for saved jobs
const savedJobs = [
  {
    id: "job1",
    title: "NLP Engineer",
    company: "Language AI",
    location: "Remote",
    salary: "$140k - $170k",
    date: "3 days ago",
  },
  {
    id: "job2",
    title: "Machine Learning Ops Engineer",
    company: "CloudScale AI",
    location: "San Francisco, CA",
    salary: "$160k - $190k",
    date: "1 week ago",
  },
  {
    id: "job3",
    title: "Deep Learning Researcher",
    company: "Neural Systems",
    location: "Boston, MA",
    salary: "$150k - $180k",
    date: "2 days ago",
  },
];

// Mock data for upcoming interviews
const interviews = [
  {
    id: "int1",
    jobTitle: "Senior Machine Learning Engineer",
    company: "TechCorp AI",
    type: "Technical Interview",
    date: "June 22, 2023",
    time: "10:00 AM PDT",
    interviewers: ["Jane Smith (CTO)", "Michael Brown (ML Lead)"],
    notes: "Prepare to discuss previous ML projects and be ready for coding exercises."
  },
];

// Mock data for profile completion
const profileCompletion = {
  totalItems: 12,
  completedItems: 9,
  percentage: 75,
  missingItems: ["Add portfolio link", "Upload more work samples", "Complete skill assessment"]
};

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?returnUrl=/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Prevent flash of content before redirect
  }
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
        
        {/* Profile Completion Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {profileCompletion.completedItems} of {profileCompletion.totalItems} items completed
              </span>
              <span className="font-bold">{profileCompletion.percentage}%</span>
            </div>
            <Progress value={profileCompletion.percentage} className="h-2 mb-4" />
            
            {profileCompletion.missingItems.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">To improve your profile:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {profileCompletion.missingItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Tabs defaultValue="applications" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="interviews">Upcoming Interviews</TabsTrigger>
          </TabsList>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="grid gap-4">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{application.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Applied on {application.date}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge 
                            className={
                              application.status === "Rejected" ? "bg-destructive" : 
                              application.status === "Offer" ? "bg-green-500" : 
                              application.status === "In Review" ? "bg-amber-500" : 
                              "bg-blue-500"
                            }
                          >
                            {application.status}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{application.stage}</span>
                          </div>
                          <Progress value={application.progress} className="h-1" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {application.status === "In Review" && (
                          <Button size="sm">Prepare for Interview</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No applications yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't applied to any jobs yet. Browse open positions and start applying.
                    </p>
                    <Button onClick={() => navigate("/jobs")}>Browse Jobs</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Saved Jobs Tab */}
          <TabsContent value="saved">
            <div className="grid gap-4">
              {savedJobs.length > 0 ? (
                savedJobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <BriefcaseBusiness size={14} className="text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Posted {job.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium">{job.salary}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No saved jobs</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Save jobs you're interested in to apply to them later.
                    </p>
                    <Button onClick={() => navigate("/jobs")}>Browse Jobs</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Upcoming Interviews Tab */}
          <TabsContent value="interviews">
            <div className="grid gap-4">
              {interviews.length > 0 ? (
                interviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="font-medium">{interview.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground">{interview.company}</p>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-muted-foreground" />
                              <span className="text-sm">{interview.type} on {interview.date} at {interview.time}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MessageSquare size={16} className="text-muted-foreground mt-1" />
                              <div>
                                <p className="text-sm font-medium">With:</p>
                                <ul className="text-sm text-muted-foreground">
                                  {interview.interviewers.map((interviewer, index) => (
                                    <li key={index}>{interviewer}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          {interview.notes && (
                            <div className="mt-4 p-3 bg-secondary rounded-md">
                              <p className="text-sm font-medium mb-1">Preparation Notes:</p>
                              <p className="text-sm">{interview.notes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button size="sm">Prepare</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No upcoming interviews</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't have any interviews scheduled yet. Keep applying!
                    </p>
                    <Button onClick={() => navigate("/jobs")}>Browse Jobs</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ThumbsUp size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Your application for <span className="font-semibold">Senior Machine Learning Engineer</span> has moved to the technical interview stage.</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">You applied for <span className="font-semibold">AI Research Scientist</span> at Quantum Labs.</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Star size={14} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">You saved <span className="font-semibold">NLP Engineer</span> at Language AI to your favorites.</p>
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

export default CandidateDashboard;
