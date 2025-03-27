
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, FileText } from "lucide-react";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { ApplicationTracker } from "@/components/dashboard/candidate/ApplicationTracker";
import { Interview, InterviewSchedule } from "@/components/dashboard/candidate/InterviewSchedule";
import { SavedJobs } from "@/components/dashboard/candidate/SavedJobs";
import { MessageCenter } from "@/components/dashboard/candidate/MessageCenter";

// Mock data for candidate dashboard
const applicationData = [
  {
    id: "app1",
    company: "Tech Solutions Inc.",
    position: "Frontend Developer",
    appliedDate: "2023-05-12",
    status: "In Review",
    progress: 40
  },
  {
    id: "app2",
    company: "Global Innovations",
    position: "UI/UX Designer",
    appliedDate: "2023-05-10",
    status: "Interview Scheduled",
    progress: 80
  },
  {
    id: "app3",
    company: "Digital Dynamics",
    position: "React Developer",
    appliedDate: "2023-05-05",
    status: "Application Submitted",
    progress: 20
  },
  {
    id: "app4",
    company: "Nexus Software",
    position: "Full Stack Developer",
    appliedDate: "2023-05-01",
    status: "Assessment",
    progress: 60
  },
  {
    id: "app5",
    company: "EcoTech Systems",
    position: "Senior Frontend Engineer",
    appliedDate: "2023-04-28",
    status: "Rejected",
    progress: 100
  },
];

const savedJobs = [
  {
    id: "job1",
    company: "Quantum Technologies",
    position: "Senior React Developer",
    location: "Remote",
    salary: "$120,000 - $150,000",
    savedDate: "2023-05-15",
    description: "We're looking for an experienced React developer to join our growing team and help build scalable web applications."
  },
  {
    id: "job2",
    company: "DevStream Inc.",
    position: "UI/UX Designer",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    savedDate: "2023-05-14",
    description: "Join our design team to create beautiful, intuitive user interfaces for our cutting-edge products."
  },
  {
    id: "job3",
    company: "Zenith Digital",
    position: "Frontend Team Lead",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    savedDate: "2023-05-13",
    description: "Lead our frontend development team and drive best practices across multiple projects."
  },
  {
    id: "job4",
    company: "Cloud Systems Pro",
    position: "JavaScript Developer",
    location: "Remote",
    salary: "$100,000 - $125,000",
    savedDate: "2023-05-12",
    description: "Work on cloud-based applications using modern JavaScript frameworks and libraries."
  },
];

const upcomingInterviews: Interview[] = [
  {
    id: "int1",
    company: "Global Innovations",
    position: "UI/UX Designer",
    date: "2023-05-22",
    time: "10:00 AM",
    medium: "Video Call",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "int2",
    company: "Nexus Software",
    position: "Full Stack Developer",
    date: "2023-05-25",
    time: "2:30 PM",
    medium: "Phone Call",
    link: null,
  },
];

const messages = [
  {
    id: "msg1",
    from: "Jane Smith",
    company: "Global Innovations",
    date: "2023-05-16",
    preview: "We'd like to schedule your interview for the UI/UX Designer role. Please let us know your availability for next week.",
    read: true,
  },
  {
    id: "msg2",
    from: "Michael Johnson",
    company: "Nexus Software",
    date: "2023-05-15",
    preview: "Regarding your application for the Full Stack Developer position, we're pleased to inform you that you've passed the initial screening.",
    read: false,
  },
  {
    id: "msg3",
    from: "Sarah Williams",
    company: "Tech Solutions Inc.",
    date: "2023-05-14",
    preview: "Thank you for your application. We're currently reviewing your qualifications and will get back to you soon.",
    read: false,
  },
];

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  
  const completedApplications = applicationData.length;
  const interviewsScheduled = upcomingInterviews.length;
  const profileCompletion = 85;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <AdminHeader 
          title={`Welcome back, ${user?.firstName}!`}
          subtitle="Here's what's happening with your job search today."
        />
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileCompletion}%</div>
              <Progress className="mt-2" value={profileCompletion} />
              {profileCompletion < 100 && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-2 text-xs"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  Complete your profile
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedApplications}</div>
              <p className="text-xs text-muted-foreground">
                +2 this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewsScheduled}</div>
              <p className="text-xs text-muted-foreground">
                Next: Global Innovations on May 22
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Saved Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savedJobs.length}</div>
              <p className="text-xs text-muted-foreground">
                Added 2 new jobs yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="savedJobs">Saved Jobs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Track the status of your job applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationTracker 
                    applications={applicationData}
                    onViewAll={() => setActiveTab("applications")}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Your scheduled interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <InterviewSchedule
                    interviews={upcomingInterviews}
                    selectedDate={date}
                    onDateChange={setDate}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>New Messages</CardTitle>
                <CardDescription>
                  Recent messages from recruiters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageCenter 
                  messages={messages}
                  showViewAll={true}
                  onViewAll={() => setActiveTab("messages")}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>
                  Track all your job applications in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationTracker 
                  applications={applicationData}
                  showAll={true}
                />
                <Separator className="my-4" />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                  <Button size="sm" onClick={() => navigate("/jobs")}>
                    Find More Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="savedJobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
                <CardDescription>
                  Jobs you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavedJobs jobs={savedJobs} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
                <CardDescription>
                  Communication with employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessageCenter 
                  messages={messages}
                  showViewAll={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
