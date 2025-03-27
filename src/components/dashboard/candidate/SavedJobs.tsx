
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BriefcaseBusiness, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface SavedJob {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  savedDate: string;
  postedDate?: string;
  description?: string;
  logo?: string;
}

interface SavedJobsProps {
  jobs: SavedJob[];
  showViewMore?: boolean;
}

export const SavedJobs: React.FC<SavedJobsProps> = ({ 
  jobs,
  showViewMore = false,
}) => {
  const navigate = useNavigate();
  
  const viewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };
  
  const applyJob = (jobId: string) => {
    navigate(`/jobs/${jobId}/apply`);
  };

  return (
    <div className="space-y-4">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    {job.logo ? (
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="w-14 h-14 rounded-md object-contain border p-1"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-md bg-secondary flex items-center justify-center">
                        <BriefcaseBusiness className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg truncate">{job.position}</h3>
                    <div className="text-sm text-muted-foreground">{job.company}</div>
                    
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Saved: {job.savedDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row gap-2 sm:flex-col">
                    <Button
                      variant="outline"
                      onClick={() => viewJob(job.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => applyJob(job.id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
                
                {job.description && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {showViewMore && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard/saved")}
              >
                View More Saved Jobs
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center">
          <BriefcaseBusiness className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">
            No saved jobs yet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Jobs you save will appear here for easy access.
          </p>
          <Button
            className="mt-4"
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </Button>
        </div>
      )}
    </div>
  );
};
