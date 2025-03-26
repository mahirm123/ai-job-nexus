
import { useState, useEffect } from 'react';

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  description: string;
  date: string;
  logo: string;
}

interface JobSearchFilters {
  query: string;
  location?: string;
  jobType?: string[];
  experienceLevel?: string[];
  salaryRange?: [number, number];
  skills?: string[];
}

export const useJobSearch = (initialJobs: JobData[]) => {
  const [jobs, setJobs] = useState<JobData[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>(initialJobs);
  const [filters, setFilters] = useState<JobSearchFilters>({
    query: "",
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, 300000],
    skills: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timeoutId = setTimeout(() => {
      const filtered = jobs.filter((job) => {
        // Search query filter (title, company, description, tags)
        const searchMatches = !filters.query || 
          job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.query.toLowerCase()) ||
          job.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
        
        if (!searchMatches) return false;
        
        // Location filter
        const locationMatches = !filters.location || 
          job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          (filters.location === "remote" && job.location.toLowerCase().includes("remote"));
        
        if (!locationMatches) return false;
        
        // Job type filter
        const jobTypeMatches = !filters.jobType?.length || 
          filters.jobType.some(type => job.type.toLowerCase().includes(type.toLowerCase()));
        
        if (!jobTypeMatches) return false;
        
        // Skills filter
        const skillsMatch = !filters.skills?.length || 
          filters.skills.some(skill => 
            job.tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
          );
        
        if (!skillsMatch) return false;
        
        // Salary filter - convert string range to number for comparison
        let jobMinSalary = 0;
        let jobMaxSalary = 0;
        
        if (job.salary) {
          const salaryMatch = job.salary.match(/\$?(\d+)(?:,\d+)*(?:\s*-\s*\$?(\d+)(?:,\d+)*)?/);
          if (salaryMatch) {
            jobMinSalary = parseInt(salaryMatch[1].replace(/,/g, ''), 10);
            jobMaxSalary = salaryMatch[2] 
              ? parseInt(salaryMatch[2].replace(/,/g, ''), 10)
              : jobMinSalary;
          }
        }
        
        const salaryMatches = !filters.salaryRange || 
          (jobMaxSalary >= filters.salaryRange[0] && jobMinSalary <= filters.salaryRange[1]);
        
        if (!salaryMatches) return false;
        
        return true;
      });
      
      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 500); // 500ms delay to simulate API call
    
    return () => clearTimeout(timeoutId);
  }, [filters, jobs]);

  const updateFilter = <K extends keyof JobSearchFilters>(
    key: K, 
    value: JobSearchFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      query: "",
      jobType: [],
      experienceLevel: [],
      salaryRange: [0, 300000],
      skills: [],
    });
  };

  return {
    jobs,
    filteredJobs,
    filters,
    isLoading,
    updateFilter,
    resetFilters,
  };
};
