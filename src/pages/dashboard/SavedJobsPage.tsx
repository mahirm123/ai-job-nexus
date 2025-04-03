
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, Filter, ArrowDownUp, Calendar as CalendarIcon, MoreHorizontal, Bookmark, ExternalLink, Star, Send } from "lucide-react";
import { SavedJobs } from "@/components/dashboard/candidate/SavedJobs";

// Mock data - Using the same structure as in CandidateDashboard
const savedJobs = [
  {
    id: "job1",
    company: "Quantum Technologies",
    position: "Senior React Developer",
    location: "Remote",
    salary: "$120,000 - $150,000",
    savedDate: "2023-05-15",
    description: "We're looking for an experienced React developer to join our growing team and help build scalable web applications."
  },
  {
    id: "job2",
    company: "DevStream Inc.",
    position: "UI/UX Designer",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    savedDate: "2023-05-14",
    description: "Join our design team to create beautiful, intuitive user interfaces for our cutting-edge products."
  },
  {
    id: "job3",
    company: "Zenith Digital",
    position: "Frontend Team Lead",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    savedDate: "2023-05-13",
    description: "Lead our frontend development team and drive best practices across multiple projects."
  },
  {
    id: "job4",
    company: "Cloud Systems Pro",
    position: "JavaScript Developer",
    location: "Remote",
    salary: "$100,000 - $125,000",
    savedDate: "2023-05-12",
    description: "Work on cloud-based applications using modern JavaScript frameworks and libraries."
  },
  {
    id: "job5",
    company: "Innovate Solutions",
    position: "Full Stack Engineer",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    savedDate: "2023-05-10",
    description: "Join our engineering team building innovative web applications with React and Node.js."
  },
  {
    id: "job6",
    company: "Tech Ventures",
    position: "Senior Frontend Developer",
    location: "Chicago, IL",
    salary: "$115,000 - $145,000",
    savedDate: "2023-05-08",
    description: "Create responsive web applications and lead frontend architecture decisions."
  },
];

const SavedJobsPage = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // Filter jobs based on search query
  const filteredJobs = savedJobs.filter(job => 
    job.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort jobs based on sort order
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime();
    } else if (sortOrder === "salary-high") {
      const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
      const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
      return bSalary - aSalary;
    } else {
      return a.position.localeCompare(b.position);
    }
  });
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <AdminHeader 
          title={t("savedJobs.title")}
          subtitle={t("savedJobs.subtitle")}
        />
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("common.search")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    {t("common.filter")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("common.filterBy")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {t("jobs.remote")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("jobs.fullTime")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("jobs.partTime")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("jobs.contract")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    {t("common.sort")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("common.sortBy")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                    {t("common.newest")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                    {t("common.oldest")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("salary-high")}>
                    {t("common.highestSalary")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>
                    {t("common.alphabetical")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal hidden lg:inline-flex">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      date.toLocaleDateString()
                    ) : (
                      <span>{t("common.pickDate")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t("jobs.position")}</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t("jobs.company")}</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">{t("jobs.location")}</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden lg:table-cell">{t("jobs.salary")}</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">{t("common.savedOn")}</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">{t("common.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="font-medium">{job.position}</div>
                        </td>
                        <td className="p-4 align-middle">{job.company}</td>
                        <td className="p-4 align-middle hidden md:table-cell">
                          <Badge variant="outline" className="rounded-sm">
                            {job.location}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle hidden lg:table-cell">{job.salary}</td>
                        <td className="p-4 align-middle text-muted-foreground hidden sm:table-cell">{job.savedDate}</td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{t("common.openMenu")}</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                <span>{t("jobs.markFavorite")}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="mr-2 h-4 w-4" />
                                <span>{t("jobs.removeSaved")}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                <span>{t("common.viewDetails")}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                <span>{t("jobs.applyNow")}</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedJobsPage;
