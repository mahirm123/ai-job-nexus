import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { DataTable, Column } from "@/components/dashboard/data-table";
import {
  BarChart3,
  Users,
  Clock,
  FileCheck,
  CheckCircle,
  XCircle,
  PenLine,
  PlusCircle,
  Trash2,
  ArrowUpRight,
  Eye,
  Download,
  Star,
  Filter,
  Briefcase
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>}
      {trend && (
        <div className="mt-2 text-sm">
          <ArrowUpRight className={`mr-1 inline-block h-4 w-4 ${trend.positive ? "text-green-500" : "text-red-500"}`} />
          <span className={trend.positive ? "text-green-500" : "text-red-500"}>
            {trend.value}%
          </span>
          <span> vs last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

interface RecentApplicantItemProps {
  name: string;
  jobTitle: string;
  applicationDate: string;
  status: "pending" | "accepted" | "rejected";
}

const RecentApplicantItem: React.FC<RecentApplicantItemProps> = ({ name, jobTitle, applicationDate, status }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "accepted":
        return <Badge>Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <li className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{jobTitle}</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">{applicationDate}</p>
        {getStatusBadge(status)}
      </div>
    </li>
  );
};

interface JobPostingItemProps {
  title: string;
  datePosted: string;
  applicants: number;
  views: number;
}

const JobPostingItem: React.FC<JobPostingItemProps> = ({ title, datePosted, applicants, views }) => (
  <li className="py-2">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">Posted on {datePosted}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-bold">{applicants}</p>
          <p className="text-sm text-muted-foreground">Applicants</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{views}</p>
          <p className="text-sm text-muted-foreground">Views</p>
        </div>
      </div>
    </div>
  </li>
);

interface JobPerformanceCardProps {
  title: string;
  applicants: number;
  views: number;
  ctr: number;
}

const JobPerformanceCard: React.FC<JobPerformanceCardProps> = ({ title, applicants, views, ctr }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Job Performance</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center">
        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Applicants: {applicants}</p>
      </div>
      <div className="flex items-center">
        <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Views: {views}</p>
      </div>
      <div className="flex items-center">
        <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">CTR: {ctr}%</p>
      </div>
    </CardContent>
  </Card>
);

interface ApplicantStatusCardProps {
  pending: number;
  accepted: number;
  rejected: number;
}

const ApplicantStatusCard: React.FC<ApplicantStatusCardProps> = ({ pending, accepted, rejected }) => (
  <Card>
    <CardHeader>
      <CardTitle>Applicant Status</CardTitle>
      <CardDescription>Overview of applicants status</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center">
        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Pending: {pending}</p>
      </div>
      <div className="flex items-center">
        <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Accepted: {accepted}</p>
      </div>
      <div className="flex items-center">
        <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Rejected: {rejected}</p>
      </div>
    </CardContent>
  </Card>
);

const RecruiterDashboard: React.FC = () => {
  const jobPostings: { id: string; title: string; datePosted: string; applicants: number; views: number; }[] = [
    { id: "1", title: "Software Engineer", datePosted: "2024-01-01", applicants: 25, views: 150 },
    { id: "2", title: "Data Scientist", datePosted: "2024-01-15", applicants: 18, views: 120 },
    { id: "3", title: "Product Manager", datePosted: "2024-02-01", applicants: 32, views: 200 },
  ];

  const applicantData = [
    {
      id: "1",
      name: "John Doe",
      jobTitle: "Software Engineer",
      email: "john.doe@example.com",
      applicationDate: "2024-01-05",
      status: "pending",
    },
    {
      id: "2",
      name: "Jane Smith",
      jobTitle: "Data Scientist",
      email: "jane.smith@example.com",
      applicationDate: "2024-01-20",
      status: "accepted",
    },
    {
      id: "3",
      name: "Alice Johnson",
      jobTitle: "Product Manager",
      email: "alice.johnson@example.com",
      applicationDate: "2024-02-05",
      status: "rejected",
    },
  ];

  const applicantColumns: Column<typeof applicantData[0]>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    {
      id: "jobTitle",
      header: "Job Title",
      accessorKey: "jobTitle",
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "applicationDate",
      header: "Application Date",
      accessorKey: "applicationDate",
      enableSorting: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ status }) => getStatusBadge(status),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "accepted":
        return <Badge>Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="mb-8 flex justify-between">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <Button asChild>
            <Link to="/dashboard/jobs/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post a Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Job Postings" value={12} icon={<Briefcase className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Total Applicants" value={245} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="New Applicants This Month" value={56} icon={<Users className="h-4 w-4 text-muted-foreground" />} trend={{ value: 15, positive: true }} />
          <StatCard title="Application Conversion Rate" value="12%" icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} />
        </div>

        <div className="grid gap-4 mt-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Recent Applicants</CardTitle>
                <Link to="/dashboard/applicants" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <CardDescription>Latest job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {applicantData.map((applicant) => (
                  <RecentApplicantItem
                    key={applicant.id}
                    name={applicant.name}
                    jobTitle={applicant.jobTitle}
                    applicationDate={applicant.applicationDate}
                    status={applicant.status}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Job Postings</CardTitle>
                <Link to="/dashboard/jobs" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <CardDescription>Your active job listings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {jobPostings.map((job) => (
                  <JobPostingItem
                    key={job.id}
                    title={job.title}
                    datePosted={job.datePosted}
                    applicants={job.applicants}
                    views={job.views}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 mt-8 md:grid-cols-2">
          <JobPerformanceCard title="Software Engineer" applicants={25} views={150} ctr={8} />
          <ApplicantStatusCard pending={10} accepted={5} rejected={2} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Applicant List</h2>
          <DataTable columns={applicantColumns} data={applicantData} searchable searchKey="name" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
