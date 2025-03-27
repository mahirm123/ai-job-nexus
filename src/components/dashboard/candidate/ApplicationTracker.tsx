
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export interface ApplicationData {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  status: string;
  progress?: number;
}

interface ApplicationTrackerProps {
  applications: ApplicationData[];
  showAll?: boolean;
  onViewAll?: () => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ 
  applications, 
  showAll = false,
  onViewAll 
}) => {
  const navigate = useNavigate();
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Rejected":
        return "destructive";
      case "Interview Scheduled":
        return "default";
      case "Offer Received":
        return "success";
      case "Assessment":
        return "warning";
      default:
        return "secondary";
    }
  };
  
  const getProgressFromStatus = (status: string): number => {
    switch (status) {
      case "Application Submitted":
        return 20;
      case "In Review":
        return 40;
      case "Assessment":
        return 60;
      case "Interview Scheduled":
        return 80;
      case "Offer Received":
        return 100;
      case "Rejected":
        return 100;
      default:
        return 0;
    }
  };
  
  const displayedApplications = showAll ? applications : applications.slice(0, 3);
  
  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedApplications.length > 0 ? (
              displayedApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.position}
                  </TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusVariant(application.status)}
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <Progress 
                      value={application.progress || getProgressFromStatus(application.status)} 
                      className="h-2"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/dashboard/applications/${application.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Contact</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Follow Up</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {!showAll && applications.length > 3 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
          >
            <FileText className="mr-2 h-4 w-4" />
            View All Applications
          </Button>
        </div>
      )}
    </div>
  );
};
