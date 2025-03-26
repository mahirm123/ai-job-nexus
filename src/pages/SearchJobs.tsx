
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobCard } from "@/components/jobs/JobCard";
import gsap from "gsap";

// Sample job data
const jobsData = [
  {
    id: "1",
    title: "Senior Machine Learning Engineer",
    company: "TechAI Solutions",
    location: "San Francisco, CA",
    salary: "$150,000 - $180,000",
    type: "Full-time",
    tags: ["Machine Learning", "Python", "TensorFlow"],
    description: "We are seeking an experienced Machine Learning Engineer to join our team...",
    date: "2 days ago",
    logo: "/placeholder.svg"
  },
  {
    id: "2",
    title: "AI Research Scientist",
    company: "InnovateLabs",
    location: "Boston, MA",
    salary: "$160,000 - $190,000",
    type: "Full-time",
    tags: ["Deep Learning", "Research", "PyTorch"],
    description: "Join our research team to develop cutting-edge AI solutions...",
    date: "1 week ago",
    logo: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Computer Vision Engineer",
    company: "VisionTech",
    location: "Remote",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    tags: ["Computer Vision", "OpenCV", "C++"],
    description: "Help us build the next generation of computer vision applications...",
    date: "3 days ago",
    logo: "/placeholder.svg"
  },
  {
    id: "4",
    title: "NLP Data Scientist",
    company: "LanguageAI",
    location: "New York, NY",
    salary: "$140,000 - $170,000",
    type: "Full-time",
    tags: ["NLP", "BERT", "Transformers"],
    description: "We're looking for a talented NLP specialist to improve our language models...",
    date: "Just now",
    logo: "/placeholder.svg"
  },
  {
    id: "5",
    title: "AI Product Manager",
    company: "ProductSmart",
    location: "Seattle, WA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    tags: ["Product Management", "AI", "Strategy"],
    description: "Lead our AI product development from concept to launch...",
    date: "5 days ago",
    logo: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Robotics AI Engineer",
    company: "RoboInnovate",
    location: "Austin, TX",
    salary: "$145,000 - $175,000",
    type: "Full-time",
    tags: ["Robotics", "ROS", "Reinforcement Learning"],
    description: "Develop AI systems for our next generation of robotics products...",
    date: "1 week ago",
    logo: "/placeholder.svg"
  }
];

const SearchJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate search section
      gsap.from(".search-section", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Animate filters
      gsap.from(".filters-container", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });

      // Animate job cards
      gsap.from(".job-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Simple search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredJobs(jobsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = jobsData.filter(
      job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredJobs(filtered);
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen" ref={pageRef}>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        {/* Search Section */}
        <section className="mb-12 search-section">
          <h1 className="text-3xl font-bold mb-6">Find Your Dream AI Job</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Job title, skills, or company" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Button className="h-12">Search Jobs</Button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="md:col-span-1 filters-container">
            <div className="glass-card p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>

              {/* Job Type */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Job Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fulltime" />
                    <Label htmlFor="fulltime">Full-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parttime" />
                    <Label htmlFor="parttime">Part-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract" />
                    <Label htmlFor="contract">Contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="freelance" />
                    <Label htmlFor="freelance">Freelance</Label>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Location</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Experience Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="entry" />
                    <Label htmlFor="entry">Entry Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mid" />
                    <Label htmlFor="mid">Mid Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="senior" />
                    <Label htmlFor="senior">Senior Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exec" />
                    <Label htmlFor="exec">Executive</Label>
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Salary Range</h3>
                <div className="pt-4 pb-2">
                  <Slider 
                    defaultValue={[50000, 200000]} 
                    min={0} 
                    max={300000} 
                    step={10000} 
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>$50k</span>
                  <span>$200k</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Skills</h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2 pr-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="python" />
                      <Label htmlFor="python">Python</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="machinelearning" />
                      <Label htmlFor="machinelearning">Machine Learning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tensorflow" />
                      <Label htmlFor="tensorflow">TensorFlow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pytorch" />
                      <Label htmlFor="pytorch">PyTorch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="computervision" />
                      <Label htmlFor="computervision">Computer Vision</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nlp" />
                      <Label htmlFor="nlp">NLP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deeplearning" />
                      <Label htmlFor="deeplearning">Deep Learning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reinforcementlearning" />
                      <Label htmlFor="reinforcementlearning">Reinforcement Learning</Label>
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-foreground/70">{filteredJobs.length} jobs found</p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                  <SelectItem value="relevance">Relevance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-foreground/70">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchJobs;
