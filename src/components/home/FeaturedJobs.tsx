
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard, JobCardProps } from "../jobs/JobCard";
import { Link } from "react-router-dom";

// Sample data for featured jobs
const featuredJobs: JobCardProps[] = [
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
];

export const FeaturedJobs = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Job Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover top opportunities from leading companies in AI and tech. These featured positions offer competitive compensation and exciting challenges.
            </p>
          </div>
          <Button asChild variant="ghost" className="group mt-4 md:mt-0">
            <Link to="/jobs" className="flex items-center gap-2">
              View all jobs
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <JobCard
              key={job.id}
              {...job}
              className={`animate-fade-in [animation-delay:${index * 100}ms]`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/jobs" className="flex items-center gap-2">
              Browse All Jobs
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
