
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Building, 
  FileText, 
  Upload, 
  Briefcase, 
  MapPin, 
  DollarSign 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Using the same job data from Jobs.tsx and JobDetail.tsx
const jobsData = [
  {
    id: "1",
    title: "Senior Machine Learning Engineer",
    company: "TechCorp AI",
    logo: "",
    location: "San Francisco, CA (Remote)",
    salary: "$150k - $180k",
    tags: ["Machine Learning", "Python", "TensorFlow", "Full-time"],
    postedAt: "2 days ago",
    featured: true,
  },
  {
    id: "2",
    title: "AI Research Scientist",
    company: "Quantum Labs",
    logo: "",
    location: "New York, NY",
    salary: "$160k - $200k",
    tags: ["AI Research", "Ph.D.", "PyTorch", "Full-time"],
    postedAt: "3 days ago",
    featured: true,
  },
];

// Application form schema
const applicationSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  resume: z.any().optional(),
  coverLetter: z.string().min(100, { message: "Cover letter should be at least 100 characters" }),
  portfolio: z.string().url({ message: "Please enter a valid URL" }).optional(),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional(),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const job = jobsData.find(job => job.id === id);
  
  // Initialize form with react-hook-form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user ? user.email : "",
      phone: "",
      coverLetter: "",
      portfolio: "",
      linkedin: "",
      experience: "",
      agreeToTerms: false,
    },
  });
  
  // Form submission handler
  const onSubmit = (data: ApplicationFormValues) => {
    console.log("Application submitted:", data);
    
    // Simulate successful application
    toast.success("Application submitted successfully!", {
      description: "We'll notify you about the next steps soon."
    });
    
    // Redirect to job details page after successful submission
    setTimeout(() => {
      navigate(`/jobs/${id}`);
    }, 2000);
  };
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for jobs", {
        description: "You'll be redirected to the login page."
      });
      
      // Redirect to login with return URL
      setTimeout(() => {
        navigate(`/login?returnUrl=/jobs/${id}/apply`);
      }, 2000);
    }
  }, [isAuthenticated, navigate, id]);
  
  // Redirect if job not found
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="mb-6">The job you're trying to apply for doesn't exist.</p>
            <Button asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 animate-fade-in">
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/jobs/${id}`} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Job Details
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Apply for {job.title}</h1>
            
            <Card className="p-6 mb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input placeholder="5" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourportfolio.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Optional: Link to your personal website or portfolio
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Optional: Link to your LinkedIn profile
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Resume</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-sm font-medium mb-1">Drag and drop your resume here</p>
                            <p className="text-xs text-muted-foreground mb-4">PDF, DOCX or TXT formats (Max 5MB)</p>
                            <Button type="button" size="sm">
                              Browse Files
                            </Button>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.docx,.doc,.txt"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Handle file upload
                                  field.onChange(file);
                                }
                              }} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us why you're a good fit for this position..."
                            className="min-h-[200px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Explain why you're interested in this role and what makes you a strong candidate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the privacy policy and terms of service
                          </FormLabel>
                          <FormDescription>
                            Your personal information will be processed in accordance with our privacy policy.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </Form>
            </Card>
          </div>
          
          {/* Job Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Job Summary</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary flex items-center justify-center shrink-0">
                  {job.logo ? (
                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                  ) : (
                    <Building size={24} className="text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase size={16} className="text-muted-foreground" />
                  <span>{job.tags.find(tag => tag.includes("time")) || "Full-time"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-muted-foreground" />
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyJob;
