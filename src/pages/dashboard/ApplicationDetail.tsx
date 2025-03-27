
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { ApplicationData } from "@/components/dashboard/candidate/ApplicationTracker";
import { Interview } from "@/components/dashboard/candidate/InterviewSchedule";
import { Message } from "@/components/dashboard/candidate/MessageCenter";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Edit,
  Send,
  Plus,
  Upload,
  Download,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockApplication: ApplicationData = {
  id: "app2",
  company: "Global Innovations",
  position: "UI/UX Designer",
  appliedDate: "2023-05-10",
  status: "Interview Scheduled",
  progress: 80
};

const mockTimeline = [
  {
    id: "1",
    date: "2023-05-10",
    time: "14:30",
    title: "Application Submitted",
    description: "Your application was successfully submitted.",
    status: "completed"
  },
  {
    id: "2",
    date: "2023-05-12",
    time: "09:15",
    title: "Application Reviewed",
    description: "Your application has been reviewed by the hiring team.",
    status: "completed"
  },
  {
    id: "3", 
    date: "2023-05-15",
    time: "11:00",
    title: "Skills Assessment",
    description: "You've been invited to complete a skills assessment.",
    status: "completed"
  },
  {
    id: "4",
    date: "2023-05-22",
    time: "10:00",
    title: "Interview Scheduled",
    description: "Your interview has been scheduled with the hiring manager.",
    status: "current"
  },
  {
    id: "5",
    date: "2023-05-29",
    time: null,
    title: "Final Decision",
    description: "The hiring team will make a final decision.",
    status: "pending"
  }
];

const mockDocuments = [
  {
    id: "doc1",
    name: "Resume.pdf",
    type: "Resume",
    uploadDate: "2023-05-10",
    size: "1.2 MB"
  },
  {
    id: "doc2",
    name: "CoverLetter.pdf",
    type: "Cover Letter",
    uploadDate: "2023-05-10",
    size: "450 KB"
  },
  {
    id: "doc3",
    name: "PortfolioSamples.zip",
    type: "Portfolio",
    uploadDate: "2023-05-10",
    size: "5.8 MB"
  }
];

const mockInterviews: Interview[] = [
  {
    id: "int1",
    company: "Global Innovations",
    position: "UI/UX Designer",
    date: "2023-05-22",
    time: "10:00 AM",
    medium: "Video Call",
    link: "https://meet.google.com/abc-defg-hij",
  }
];

const mockMessages: Message[] = [
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
    from: "Jane Smith",
    company: "Global Innovations",
    date: "2023-05-17",
    preview: "Thank you for confirming your availability. We've scheduled your interview for May 22 at 10:00 AM. You'll receive a calendar invite shortly.",
    read: true,
  }
];

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [followUpMessage, setFollowUpMessage] = useState("");
  
  // In a real app, you would fetch the application details based on the ID
  const application = mockApplication;
  
  const handleBackClick = () => {
    navigate("/dashboard/applications");
  };
  
  const handleFollowUp = () => {
    if (!followUpMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Follow-up Sent",
      description: "Your message has been sent to the hiring team.",
    });
    
    setFollowUpMessage("");
  };
  
  const handleWithdraw = () => {
    // In a real app, you would call an API to withdraw the application
    toast({
      title: "Application Withdrawn",
      description: "Your application has been withdrawn.",
    });
    navigate("/dashboard/applications");
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <AdminHeader 
            title={application.position}
            subtitle={application.company}
            showNotifications={false}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Application Status</CardTitle>
                    <CardDescription>Current progress of your application</CardDescription>
                  </div>
                  <Badge>{application.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>
                
                <div className="mt-6 space-y-6">
                  <h3 className="text-sm font-medium">Application Timeline</h3>
                  <ol className="relative border-l border-muted">
                    {mockTimeline.map((item) => (
                      <li key={item.id} className="mb-6 ml-6">
                        <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-background ${
                          item.status === "completed" ? "bg-green-500" : 
                          item.status === "current" ? "bg-blue-500" : "bg-muted"
                        }`}>
                          {item.status === "completed" ? (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          ) : item.status === "current" ? (
                            <Clock className="w-3 h-3 text-white" />
                          ) : (
                            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                          )}
                        </span>
                        <h3 className="flex items-center text-sm font-semibold">
                          {item.title}
                          {item.status === "current" && (
                            <span className="ml-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Current
                            </span>
                          )}
                        </h3>
                        <time className="block text-xs font-normal text-muted-foreground">
                          {item.date} {item.time && `at ${item.time}`}
                        </time>
                        <p className="text-sm mt-1">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={() => setActiveTab("messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Recruiter
                </Button>
                <Button variant="destructive" onClick={handleWithdraw}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Withdraw Application
                </Button>
              </CardFooter>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Position</dt>
                        <dd className="font-medium">{application.position}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Company</dt>
                        <dd className="font-medium flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          {application.company}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Applied Date</dt>
                        <dd className="font-medium flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {application.appliedDate}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Status</dt>
                        <dd>
                          <Badge>{application.status}</Badge>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Follow Up</CardTitle>
                    <CardDescription>
                      Send a message to the hiring team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Write a follow-up message..."
                        value={followUpMessage}
                        onChange={(e) => setFollowUpMessage(e.target.value)}
                      />
                      <Button onClick={handleFollowUp}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Follow-up
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Application Documents</CardTitle>
                        <CardDescription>
                          Documents submitted with your application
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {mockDocuments.map((doc) => (
                        <div key={doc.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <div className="w-full">
                      <Label htmlFor="file-upload">Upload New Document</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Button className="flex-1" variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                        <Button className="flex-1">
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="interviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Interviews</CardTitle>
                    <CardDescription>
                      Your upcoming interviews for this position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockInterviews.length > 0 ? (
                      <div className="space-y-4">
                        {mockInterviews.map((interview) => (
                          <Card key={interview.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">{interview.position}</h3>
                                  <p className="text-sm text-muted-foreground">{interview.company}</p>
                                </div>
                                <Badge>{interview.medium}</Badge>
                              </div>
                              <div className="mt-4 text-sm flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>
                                  {interview.date} at {interview.time}
                                </span>
                              </div>
                              {interview.link && (
                                <Button
                                  className="mt-4 w-full"
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
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="mx-auto h-8 w-8 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">No interviews scheduled yet</h3>
                        <p className="text-sm text-muted-foreground">
                          When interviews are scheduled, they will appear here.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication History</CardTitle>
                    <CardDescription>
                      Messages exchanged with the hiring team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMessages.map((message, index) => (
                        <div key={message.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between">
                            <div className="font-medium">{message.from}</div>
                            <div className="text-sm text-muted-foreground">{message.date}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{message.company}</div>
                          <p className="mt-2 text-sm">{message.preview}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-4 border-t pt-6">
                    <Label htmlFor="new-message">New Message</Label>
                    <Textarea
                      id="new-message"
                      placeholder="Write a message to the hiring team..."
                      value={followUpMessage}
                      onChange={(e) => setFollowUpMessage(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleFollowUp}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted rounded-md p-2">
                    <Building className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-medium">{application.company}</h3>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full">
                  View Company Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium">Prepare for Interview</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="px-6 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FileText className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium">Review Company Info</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Edit className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium">Update Resume</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4">
                    <h3 className="font-medium">Senior UX Designer</h3>
                    <p className="text-sm text-muted-foreground">Creative Tech Solutions</p>
                    <Button variant="link" className="px-0 h-auto mt-1" size="sm">
                      View Job
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">UI/UX Designer</h3>
                    <p className="text-sm text-muted-foreground">Digital Frontiers</p>
                    <Button variant="link" className="px-0 h-auto mt-1" size="sm">
                      View Job
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Product Designer</h3>
                    <p className="text-sm text-muted-foreground">Innovation Labs</p>
                    <Button variant="link" className="px-0 h-auto mt-1" size="sm">
                      View Job
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetail;
