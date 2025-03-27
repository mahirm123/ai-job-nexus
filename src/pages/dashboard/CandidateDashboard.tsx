
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, 
  FileText, 
  BriefcaseBusiness, 
  Calendar as CalendarIcon,
  MessageSquare, 
  ThumbsUp, 
} from "lucide-react";

// Mock data for candidate dashboard
const applicationData = [
  {
    id: "app1",
    company: "Tech Solutions Inc.",
    position: "Frontend Developer",
    appliedDate: "2023-05-12",
    status: "In Review",
  },
  {
    id: "app2",
    company: "Global Innovations",
    position: "UI/UX Designer",
    appliedDate: "2023-05-10",
    status: "Interview Scheduled",
  },
  {
    id: "app3",
    company: "Digital Dynamics",
    position: "React Developer",
    appliedDate: "2023-05-05",
    status: "Application Submitted",
  },
  {
    id: "app4",
    company: "Nexus Software",
    position: "Full Stack Developer",
    appliedDate: "2023-05-01",
    status: "Assessment",
  },
  {
    id: "app5",
    company: "EcoTech Systems",
    position: "Senior Frontend Engineer",
    appliedDate: "2023-04-28",
    status: "Rejected",
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
  },
  {
    id: "job2",
    company: "DevStream Inc.",
    position: "UI/UX Designer",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    savedDate: "2023-05-14",
  },
  {
    id: "job3",
    company: "Zenith Digital",
    position: "Frontend Team Lead",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    savedDate: "2023-05-13",
  },
  {
    id: "job4",
    company: "Cloud Systems Pro",
    position: "JavaScript Developer",
    location: "Remote",
    salary: "$100,000 - $125,000",
    savedDate: "2023-05-12",
  },
];

const upcomingInterviews = [
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
    preview: "We'd like to schedule your interview for the UI/UX Designer role.",
    read: true,
  },
  {
    id: "msg2",
    from: "Michael Johnson",
    company: "Nexus Software",
    date: "2023-05-15",
    preview: "Regarding your application for the Full Stack Developer position.",
    read: false,
  },
  {
    id: "msg3",
    from: "Sarah Williams",
    company: "Tech Solutions Inc.",
    date: "2023-05-14",
    preview: "Thank you for your application. We're currently reviewing your qualifications.",
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
  
  const viewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };
  
  const applyJob = (jobId: string) => {
    navigate(`/jobs/${jobId}/apply`);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your job search today.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {profileCompletion < 100 && (
              <div className="flex items-center gap-2 rounded-md bg-amber-50 px-3 py-1 text-sm text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                <AlertCircle size={16} />
                Complete your profile
              </div>
            )}
            <Button onClick={() => navigate("/jobs/search")}>Find Jobs</Button>
          </div>
        </div>
        
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
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applicationData.slice(0, 3).map((application) => (
                          <TableRow key={application.id}>
                            <TableCell className="font-medium">
                              {application.position}
                            </TableCell>
                            <TableCell>{application.company}</TableCell>
                            <TableCell>{application.appliedDate}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  application.status === "Rejected"
                                    ? "destructive"
                                    : application.status === "Interview Scheduled"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {application.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("applications")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View All Applications
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Your scheduled interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    <div className="mt-4 space-y-4">
                      {upcomingInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="rounded-md border p-3"
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">
                              {interview.position}
                            </div>
                            <Badge>{interview.medium}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {interview.company}
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {interview.date} at {interview.time}
                            </div>
                          </div>
                          {interview.link && (
                            <Button
                              variant="link"
                              size="sm"
                              className="mt-2 h-auto p-0"
                              asChild
                            >
                              <a
                                href={interview.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Interview
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                      {upcomingInterviews.length === 0 && (
                        <div className="rounded-md border border-dashed p-6 text-center">
                          <BriefcaseBusiness className="mx-auto h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-2 text-lg font-semibold">
                            No interviews scheduled
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            When you have interviews scheduled, they will appear
                            here.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-md border p-4 ${
                        !message.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">
                            {message.from}
                            {!message.read && (
                              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                New
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {message.company} • {message.date}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm">{message.preview}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View All Messages
                  </Button>
                </div>
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
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicationData.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">
                            {application.position}
                          </TableCell>
                          <TableCell>{application.company}</TableCell>
                          <TableCell>{application.appliedDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                application.status === "Rejected"
                                  ? "destructive"
                                  : application.status === "Interview Scheduled"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="sr-only">Follow Up</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-md border p-4"
                    >
                      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-y-0">
                        <div>
                          <div className="font-medium">{job.position}</div>
                          <div className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </div>
                          <div className="mt-1 text-sm">
                            Salary: {job.salary}
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col sm:space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 sm:mr-0"
                            onClick={() => viewJob(job.id)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => applyJob(job.id)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-md border p-4 ${
                        !message.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">
                            {message.from}
                            {!message.read && (
                              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                New
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {message.company} • {message.date}
                          </div>
                        </div>
                        <div className="flex">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                          >
                            Mark as {message.read ? "Unread" : "Read"}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{message.preview}</p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View Full Conversation
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
