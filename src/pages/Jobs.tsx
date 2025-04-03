import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobCard, JobCardProps } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialQuery = searchParams.get("query") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [salaryRange, setSalaryRange] = useState([80, 200]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortType, setSortType] = useState("relevance");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [jobsPerPage] = useState(5);
  
  // Filtered jobs state
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [displayedJobs, setDisplayedJobs] = useState<JobCardProps[]>([]);

  // Apply filters
  useEffect(() => {
    let filtered = [...jobsData];
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Location filter
    if (locationQuery) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    // Job types filter
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => 
        selectedJobTypes.some(type => 
          job.tags.some(tag => tag.toLowerCase() === type.toLowerCase())
        )
      );
    }
    
    // Experience levels filter
    if (selectedExperienceLevels.length > 0) {
      filtered = filtered.filter(job => 
        selectedExperienceLevels.some(level => 
          job.tags.some(tag => tag.toLowerCase().includes(level.toLowerCase()))
        )
      );
    }
    
    // Industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(job => 
        selectedIndustries.some(industry => 
          job.tags.some(tag => tag.toLowerCase().includes(industry.toLowerCase()))
        )
      );
    }
    
    // Salary range filter
    if (salaryRange) {
      filtered = filtered.filter(job => {
        if (!job.salary) return true;
        
        const match = job.salary.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        if (!match) return true;
        
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        
        return max >= salaryRange[0] && min <= salaryRange[1];
      });
    }
    
    // Apply sorting
    if (sortType === "recent") {
      filtered.sort((a, b) => {
        const daysA = parseInt(a.postedAt.split(" ")[0]);
        const daysB = parseInt(b.postedAt.split(" ")[0]);
        return daysA - daysB;
      });
    } else if (sortType === "salary-high-low") {
      filtered.sort((a, b) => {
        const matchA = a.salary?.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        const matchB = b.salary?.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        
        const maxA = matchA ? parseInt(matchA[2]) : 0;
        const maxB = matchB ? parseInt(matchB[2]) : 0;
        
        return maxB - maxA;
      });
    } else if (sortType === "salary-low-high") {
      filtered.sort((a, b) => {
        const matchA = a.salary?.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        const matchB = b.salary?.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        
        const minA = matchA ? parseInt(matchA[1]) : 0;
        const minB = matchB ? parseInt(matchB[1]) : 0;
        
        return minA - minB;
      });
    }
    
    setFilteredJobs(filtered);
    
    // Update URL search params
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    params.set("page", currentPage.toString());
    setSearchParams(params);
    
  }, [searchQuery, locationQuery, selectedJobTypes, selectedExperienceLevels, selectedIndustries, salaryRange, sortType]);

  // Update displayed jobs when filtered jobs or pagination changes
  useEffect(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    
    // Reset to page 1 if current page is now invalid
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      return;
    }
    
    setDisplayedJobs(filteredJobs.slice(indexOfFirstJob, indexOfLastJob));
  }, [filteredJobs, currentPage, jobsPerPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is applied through the useEffect when state changes
    setCurrentPage(1); // Reset to first page on new search
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleExperienceLevel = (level: string) => {
    setSelectedExperienceLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry) 
        : [...prev, industry]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Modified applyFilters function to ensure it works properly
  const applyFilters = () => {
    // All filters are applied through the useEffect
    if (window.innerWidth < 1024) {
      setIsFilterVisible(false);
    }
    // Force the filter effect to run by triggering a state update
    setSortType(prev => prev === "relevance" ? "relevance_" : "relevance");
    toast({
      title: "Filters applied",
      description: "Your job search has been updated",
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedIndustries([]);
    setSalaryRange([80, 200]);
    setSortType("relevance");
    setCurrentPage(1);
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
    });
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                {t("jobs.heading")}
              </h1>
              <p className="text-muted-foreground mb-6">
                {t("jobs.subheading")}
              </p>
              
              <form onSubmit={handleSearch} className="glass-card rounded-lg p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder={t("search.placeholder")}
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
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
              
              <Button 
                variant="outline" 
                className="mt-4 flex items-center gap-2"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              >
                <Filter size={16} />
                {isFilterVisible ? t("jobs.hideFilters") : t("jobs.showFilters")}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop View */}
            <div className={`lg:block ${isFilterVisible ? "block" : "hidden"}`}>
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium flex items-center gap-2">
                    <Filter size={18} />
                    {t("jobs.filters")}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    {t("jobs.reset")}
                  </Button>
                </div>
                
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
                          <Checkbox 
                            id={`job-type-${type}`} 
                            checked={selectedJobTypes.includes(type)}
                            onCheckedChange={() => toggleJobType(type)}
                          />
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
                          <Checkbox 
                            id={`experience-${level}`} 
                            checked={selectedExperienceLevels.includes(level)}
                            onCheckedChange={() => toggleExperienceLevel(level)}
                          />
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
                          <Checkbox 
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => toggleIndustry(industry)} 
                          />
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
                  
                  <Button className="w-full" onClick={applyFilters}>
                    {t("jobs.applyFilters")}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span className="font-medium">{filteredJobs.length} jobs found</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort by:</span>
                  <select 
                    className="text-sm bg-transparent border border-border rounded px-2 py-1"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary-high-low">Salary: High to Low</option>
                    <option value="salary-low-high">Salary: Low to High</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {displayedJobs.length > 0 ? (
                  displayedJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      className={`animate-slide-up [animation-delay:${index * 100}ms]`}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg font-medium mb-2">No jobs found</p>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Improved Pagination */}
              {filteredJobs.length > 0 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              href="#" 
                              isActive={pageNum === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNum);
                              }}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
