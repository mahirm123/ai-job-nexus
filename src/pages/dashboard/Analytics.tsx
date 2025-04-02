
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Line,
  Pie,
  Cell
} from "recharts";
import { 
  Calendar, 
  Download, 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Users, 
  Briefcase,
  Eye
} from "lucide-react";

// Mock data for charts
const monthlyApplicationsData = [
  { name: "Jan", applications: 45 },
  { name: "Feb", applications: 52 },
  { name: "Mar", applications: 61 },
  { name: "Apr", applications: 67 },
  { name: "May", applications: 90 },
  { name: "Jun", applications: 80 },
  { name: "Jul", applications: 85 },
  { name: "Aug", applications: 95 },
  { name: "Sep", applications: 100 },
  { name: "Oct", applications: 110 },
  { name: "Nov", applications: 120 },
  { name: "Dec", applications: 105 },
];

const jobViewsData = [
  { name: "Week 1", views: 340 },
  { name: "Week 2", views: 420 },
  { name: "Week 3", views: 380 },
  { name: "Week 4", views: 450 },
  { name: "Week 5", views: 520 },
  { name: "Week 6", views: 490 },
  { name: "Week 7", views: 550 },
  { name: "Week 8", views: 600 },
  { name: "Week 9", views: 580 },
  { name: "Week 10", views: 620 },
  { name: "Week 11", views: 650 },
  { name: "Week 12", views: 700 },
];

const applicationsSourceData = [
  { name: "Job Board", value: 40 },
  { name: "Company Website", value: 25 },
  { name: "Referrals", value: 15 },
  { name: "Social Media", value: 12 },
  { name: "Other", value: 8 },
];

const jobPerformanceData = [
  { 
    name: "Senior Frontend Developer", 
    applications: 34, 
    views: 245, 
    interviews: 12, 
    conversionRate: 4.9,
  },
  { 
    name: "UI/UX Designer", 
    applications: 28, 
    views: 210, 
    interviews: 10, 
    conversionRate: 4.7,
  },
  { 
    name: "Product Manager", 
    applications: 42, 
    views: 312, 
    interviews: 15, 
    conversionRate: 4.8,
  },
  { 
    name: "Backend Developer", 
    applications: 31, 
    views: 225, 
    interviews: 9, 
    conversionRate: 4.0,
  },
  { 
    name: "DevOps Engineer", 
    applications: 15, 
    views: 180, 
    interviews: 6, 
    conversionRate: 3.3,
  },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Recruitment Analytics</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">962</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 12%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 2</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Job Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 18%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hired Candidates</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 4</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Monthly Applications Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Applications Overview</CardTitle>
                <CardDescription>Monthly application trends</CardDescription>
              </div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyApplicationsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Two Charts Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Views Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Views</CardTitle>
                  <CardDescription>Weekly job view trends</CardDescription>
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={jobViewsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Application Sources Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Application Sources</CardTitle>
                  <CardDescription>Where applications are coming from</CardDescription>
                </div>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationsSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {applicationsSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Job Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Job Posting Performance</CardTitle>
            <CardDescription>
              Metrics for each job posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium">Job Title</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Views</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Applications</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Interviews</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPerformanceData.map((job) => (
                    <tr key={job.name} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{job.name}</td>
                      <td className="p-4 align-middle text-right">{job.views}</td>
                      <td className="p-4 align-middle text-right">{job.applications}</td>
                      <td className="p-4 align-middle text-right">{job.interviews}</td>
                      <td className="p-4 align-middle text-right">{job.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
