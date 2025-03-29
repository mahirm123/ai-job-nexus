import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  Clock, 
  ArrowLeft, 
  Bookmark,
  Share,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { JobCardProps } from "@/components/jobs/JobCard";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

const jobsData: JobCardProps[] = [
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

const jobDetails: Record<string, {
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyDescription: string;
}> = {
  "1": {
    description: "We are looking for a Senior Machine Learning Engineer to join our AI team. You will be responsible for designing and implementing machine learning models, improving existing systems, and working with cross-functional teams to integrate ML solutions.",
    responsibilities: [
      "Design, develop and implement machine learning models to solve complex problems",
      "Improve existing machine learning systems and processes",
      "Work with product managers and engineers to understand requirements and implement solutions",
      "Mentor junior engineers and data scientists",
      "Research and implement best practices in machine learning and AI"
    ],
    requirements: [
      "5+ years of experience in machine learning engineering",
      "Strong programming skills in Python",
      "Experience with TensorFlow, PyTorch, or similar frameworks",
      "Strong understanding of data structures, algorithms, and software design",
      "Experience deploying machine learning models to production",
      "BS/MS/PhD in Computer Science, Machine Learning, or related field"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Unlimited PTO policy",
      "Remote-first work environment",
      "Learning and development budget",
      "Regular team retreats"
    ],
    companyDescription: "TechCorp AI is a leading artificial intelligence company focused on developing cutting-edge machine learning solutions for enterprise clients. Our mission is to make AI accessible, ethical, and impactful across industries."
  },
  "2": {
    description: "Quantum Labs is seeking an AI Research Scientist to join our research team. In this role, you will conduct fundamental research in machine learning and artificial intelligence, publish papers, and help develop next-generation AI technologies.",
    responsibilities: [
      "Conduct research in machine learning, deep learning, and artificial intelligence",
      "Publish papers in top-tier conferences and journals",
      "Implement and test novel algorithms and approaches",
      "Collaborate with engineering teams to bring research ideas to production",
      "Stay up-to-date with the latest developments in AI research"
    ],
    requirements: [
      "Ph.D. in Computer Science, Machine Learning, or related field",
      "Strong publication record in top AI conferences (NeurIPS, ICML, ICLR, etc.)",
      "Excellent programming skills in Python",
      "Experience with deep learning frameworks like PyTorch",
      "Strong mathematical and statistical background"
    ],
    benefits: [
      "Competitive salary and comprehensive benefits package",
      "Research budget and conference attendance",
      "Flexible work schedule",
      "Collaborative research environment",
      "Access to cutting-edge computing resources"
    ],
    companyDescription: "Quantum Labs is a research-focused AI lab working on fundamental challenges in artificial intelligence. We bring together talented researchers from around the world to push the boundaries of what AI can do."
  }
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const job = jobsData.find(job => job.id === id);
  const details = id ? jobDetails[id] : undefined;
  const [isSaved, setIsSaved] = useState(false);
  
  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job", {
        description: "You'll be redirected to the login page",
        duration: 5000,
      });
      navigate(`/login?returnUrl=/jobs/${id}/apply`);
      return;
    }
    
    navigate(`/jobs/${id}/apply`);
  };
  
  const handleSaveJob = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save jobs", {
        description: "You need to be logged in to save jobs",
      });
      return;
    }
    
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast.success("Job saved to your profile", {
        description: "You can view all saved jobs in your dashboard."
      });
    } else {
      toast.success("Job removed from saved jobs", {
        description: "The job has been removed from your saved jobs."
      });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "You can now share this job with others."
    });
  };
  
  if (!job || !details) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle size={48} className="text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/jobs">View All Jobs</Link>
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
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/jobs" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Jobs
              </Link>
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary flex items-center justify-center shrink-0">
                      {job.logo ? (
                        <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                      ) : (
                        <Building size={32} className="text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h1 className="text-2xl font-bold">{job.title}</h1>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleSaveJob} 
                            className={`flex items-center gap-1 ${isSaved ? 'bg-secondary' : ''}`}
                          >
                            <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                            <span className="hidden sm:inline">{t("save.job")}</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleShare} 
                            className="flex items-center gap-1"
                          >
                            <Share size={16} />
                            <span className="hidden sm:inline">{t("share.job")}</span>
                          </Button>
                        </div>
                      </div>
                      
                      <h2 className="text-lg text-muted-foreground">{job.company}</h2>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4">
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} />
                            <span>{job.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Posted {job.postedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 animate-fade-in [animation-delay:100ms]">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <p className="mb-6">{details.description}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Responsibilities</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {details.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-medium mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {details.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-medium mb-3">Benefits</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {details.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Card>
                
                <Card className="p-6 animate-fade-in [animation-delay:200ms]">
                  <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
                  <p>{details.companyDescription}</p>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6 animate-fade-in [animation-delay:300ms]">
                  <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
                  <Button onClick={handleApplyClick} className="w-full mb-4">
                    {t("apply.now")}
                  </Button>
                  <p className="text-sm text-muted-foreground mb-4">
                    This application will be sent directly to the hiring manager.
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>Quick application · Less than 5 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase size={16} className="text-muted-foreground" />
                      <span>{job.tags.find(tag => tag.includes("time")) || "Full-time"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-muted-foreground" />
                      <span>Actively hiring</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 animate-fade-in [animation-delay:400ms]">
                  <h2 className="text-lg font-semibold mb-4">Skills & Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6 animate-fade-in [animation-delay:500ms]">
                  <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
                  <div className="space-y-4">
                    {jobsData
                      .filter(j => j.id !== job.id)
                      .slice(0, 3)
                      .map((job) => (
                        <Link to={`/jobs/${job.id}`} key={job.id} className="block">
                          <div className="p-3 hover:bg-secondary rounded-md transition-colors">
                            <h3 className="font-medium">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <div className="text-xs text-muted-foreground mt-1">{job.location}</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/jobs">View All Jobs</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail;
