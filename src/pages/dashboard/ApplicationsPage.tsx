
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download,
  FileText
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";

// Mock data for applications
const applications = [
  {
    id: "app-1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-20",
    status: "pending",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-2",
    company: "Design Masters",
    position: "UI/UX Designer",
    appliedDate: "2023-05-19",
    status: "accepted",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-3",
    company: "TechCorp Inc.",
    position: "Senior Backend Developer",
    appliedDate: "2023-05-18",
    status: "rejected",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-4",
    company: "Product Innovations",
    position: "Product Manager",
    appliedDate: "2023-05-17",
    status: "interview",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-5",
    company: "DevOps Solutions",
    position: "DevOps Engineer",
    appliedDate: "2023-05-16",
    status: "accepted",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-6",
    company: "Cloud Services Ltd",
    position: "Cloud Engineer",
    appliedDate: "2023-05-15",
    status: "rejected",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: "app-7",
    company: "Data Insights",
    position: "Data Analyst",
    appliedDate: "2023-05-14",
    status: "interview",
    logo: "https://via.placeholder.com/40",
  },
];

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredApplications = applications.filter(application => {
    // Filter by search query
    if (searchQuery && 
        !application.position.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !application.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && application.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  const handleViewApplication = (id: string) => {
    navigate(`/dashboard/applications/${id}`);
  };
  
  const handleDownloadResume = (id: string) => {
    toast({
      title: t("applications.downloadResume"),
      description: t("applications.downloadingResume"),
    });
  };
  
  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500">{t("applications.accepted")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("applications.rejected")}</Badge>;
      case "interview":
        return <Badge variant="secondary">{t("applications.interview")}</Badge>;
      case "pending":
      default:
        return <Badge variant="outline">{t("applications.pending")}</Badge>;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <AdminHeader 
          title={t("applications.myApplications")}
          subtitle={t("applications.trackApplications")}
        />
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{t("applications.jobApplications")}</CardTitle>
            <CardDescription>{t("applications.trackAndManage")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("applications.searchApplications")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t("applications.filterByStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("applications.allStatuses")}</SelectItem>
                    <SelectItem value="pending">{t("applications.pending")}</SelectItem>
                    <SelectItem value="accepted">{t("applications.accepted")}</SelectItem>
                    <SelectItem value="rejected">{t("applications.rejected")}</SelectItem>
                    <SelectItem value="interview">{t("applications.interview")}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="ml-auto">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">{t("applications.additionalFilters")}</span>
                </Button>
              </div>
            </div>
            
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("applications.company")}</TableHead>
                    <TableHead>{t("applications.position")}</TableHead>
                    <TableHead>{t("applications.appliedDate")}</TableHead>
                    <TableHead>{t("applications.status")}</TableHead>
                    <TableHead className="text-right">{t("applications.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img 
                              src={application.logo} 
                              alt={application.company} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{application.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          {renderStatusBadge(application.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">{t("applications.actions")}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewApplication(application.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                {t("applications.viewDetails")}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadResume(application.id)}>
                                <Download className="mr-2 h-4 w-4" />
                                {t("applications.downloadResume")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {t("applications.noApplicationsFound")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                {t("applications.exportToCSV")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
