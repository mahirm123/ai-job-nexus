
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobCard, JobCardProps } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";

// Sample data for jobs
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
  {
    id: "3",
    title: "Data Science Team Lead",
    company: "DataVision Inc.",
    logo: "",
    location: "Remote",
    salary: "$140k - $170k",
    tags: ["Data Science", "Team Lead", "SQL", "Full-time"],
    postedAt: "1 week ago",
  },
  {
    id: "4",
    title: "NLP Engineer",
    company: "Linguify AI",
    logo: "",
    location: "Boston, MA (Hybrid)",
    salary: "$130k - $155k",
    tags: ["NLP", "Python", "BERT", "Full-time"],
    postedAt: "5 days ago",
  },
  {
    id: "5",
    title: "Computer Vision Specialist",
    company: "Visionary Tech",
    logo: "",
    location: "Austin, TX",
    salary: "$125k - $160k",
    tags: ["Computer Vision", "OpenCV", "PyTorch", "Full-time"],
    postedAt: "3 days ago",
  },
  {
    id: "6",
    title: "Robotics AI Engineer",
    company: "AutoMechanica",
    logo: "",
    location: "Detroit, MI",
    salary: "$135k - $165k",
    tags: ["Robotics", "ROS", "C++", "Full-time"],
    postedAt: "1 week ago",
  },
  {
    id: "7",
    title: "AI Ethics Researcher",
    company: "Ethical AI Institute",
    logo: "",
    location: "Remote",
    salary: "$120k - $150k",
    tags: ["AI Ethics", "Research", "Policy", "Full-time"],
    postedAt: "4 days ago",
  },
  {
    id: "8",
    title: "Deep Learning Engineer",
    company: "Neural Systems",
    logo: "",
    location: "Seattle, WA",
    salary: "$140k - $170k",
    tags: ["Deep Learning", "PyTorch", "Computer Vision", "Full-time"],
    postedAt: "1 week ago",
  },
  {
    id: "9",
    title: "AI Product Manager",
    company: "InnovateTech",
    logo: "",
    location: "Chicago, IL (Hybrid)",
    salary: "$125k - $155k",
    tags: ["Product Management", "AI Products", "MBA", "Full-time"],
    postedAt: "3 days ago",
  },
  {
    id: "10",
    title: "Machine Learning Operations Engineer",
    company: "CloudAI Solutions",
    logo: "",
    location: "Remote",
    salary: "$130k - $160k",
    tags: ["MLOps", "DevOps", "Kubernetes", "Full-time"],
    postedAt: "6 days ago",
  },
];

// Filter categories
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Director", "Executive"];
const industries = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing"];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState([80, 200]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                Find Your Perfect AI & Tech Job
              </h1>
              <p className="text-muted-foreground mb-6">
                Browse through hundreds of opportunities from leading companies in the AI and tech industry.
              </p>
              
              <div className="glass-card rounded-lg p-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search for jobs, skills, or companies..."
                    className="pl-10 bg-transparent border-none focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Location (city, state, or remote)"
                    className="pl-10 bg-transparent border-none focus-visible:ring-primary"
                  />
                </div>
                <Button>Search</Button>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4 flex items-center gap-2"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              >
                <Filter size={16} />
                {isFilterVisible ? "Hide Filters" : "Show Advanced Filters"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop View */}
            <div className={`lg:block ${isFilterVisible ? "block" : "hidden"}`}>
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="font-medium mb-4 flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Salary Range (K$)</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[80, 200]}
                        min={40}
                        max={300}
                        step={5}
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                      />
                      <div className="flex justify-between text-sm mt-2">
                        <span>${salaryRange[0]}k</span>
                        <span>${salaryRange[1]}k</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`job-type-${type}`} />
                          <label
                            htmlFor={`job-type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`experience-${level}`} />
                          <label
                            htmlFor={`experience-${level}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Industry</h3>
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox id={`industry-${industry}`} />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span className="font-medium">{jobsData.length} jobs found</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort by:</span>
                  <select className="text-sm bg-transparent border border-border rounded px-2 py-1">
                    <option>Relevance</option>
                    <option>Most Recent</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {jobsData.map((job, index) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    className={`animate-slide-up [animation-delay:${index * 100}ms]`}
                  />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-2">Previous</Button>
                <Button variant="outline" className="mx-1 bg-primary text-white">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="ml-2">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
