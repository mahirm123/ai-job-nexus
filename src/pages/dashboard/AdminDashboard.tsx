import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Users, Building, Briefcase, ArrowUpRight, PlusCircle, PenLine, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/dashboard/data-table";

// Mock data for platform statistics
const platformStats = [
  {
    title: "Total Users",
    value: 2548,
    change: "+15%",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: 182,
    change: "+8%",
    icon: Briefcase,
  },
  {
    title: "Companies",
    value: 85,
    change: "+12%",
    icon: Building,
  },
  {
    title: "Applications",
    value: 6721,
    change: "+23%",
    icon: TrendingUp,
  },
];

// Mock data for user management
const users = [
  {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Employer",
    company: "TechCorp AI",
    status: "Active",
    lastLogin: "Today",
  },
  {
    id: "user2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "User",
    company: null,
    status: "Active",
    lastLogin: "Yesterday",
  },
  {
    id: "user3",
    name: "David Chen",
    email: "david.chen@example.com",
    role: "User",
    company: null,
    status: "Active",
    lastLogin: "3 days ago",
  },
  {
    id: "user4",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    role: "Employer",
    company: "Neural Systems",
    status: "Inactive",
    lastLogin: "2 weeks ago",
  },
  {
    id: "user5",
    name: "Robert Kim",
    email: "robert.kim@example.com",
    role: "Admin",
    company: null,
    status: "Active",
    lastLogin: "Today",
  },
];

// Mock data for companies
const companies = [
  {
    id: "comp1",
    name: "TechCorp AI",
    jobs: 12,
    employees: 4,
    status: "Verified",
    dateJoined: "Jan 15, 2023",
  },
  {
    id: "comp2",
    name: "Quantum Labs",
    jobs: 8,
    employees: 3,
    status: "Verified",
    dateJoined: "Feb 23, 2023",
  },
  {
    id: "comp3",
    name: "Neural Systems",
    jobs: 5,
    employees: 2,
    status: "Pending",
    dateJoined: "Mar 10, 2023",
  },
  {
    id: "comp4",
    name: "DataWorks Inc.",
    jobs: 15,
    employees: 6,
    status: "Verified",
    dateJoined: "Dec 5, 2022",
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: "act1",
    action: "New user registered",
    details: "Alex Wong joined as a job seeker",
    time: "10 minutes ago",
    icon: UserPlus,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "act2",
    action: "New job posted",
    details: "TechCorp AI posted 'Senior AI Engineer'",
    time: "2 hours ago",
    icon: Briefcase,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: "act3",
    action: "Company verification",
    details: "Neural Systems verification requested",
    time: "1 day ago",
    icon: Building,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: "act4",
    action: "User role changed",
    details: "Robert Kim promoted to Admin",
    time: "2 days ago",
    icon: Shield,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
];

// System status data
const systemStatus = [
  {
    name: "Database",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "API Services",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "Search Engine",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "Email Service",
    status: "Degraded",
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  {
    name: "Background Jobs",
    status: "Operational",
    icon: CheckCircle,
    color: "text-green-500",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Filter state
  const [userFilter, setUserFilter] = React.useState("");
  const [companyFilter, setCompanyFilter] = React.useState("");
  
  // Filtered users based on search
  const filteredUsers = React.useMemo(() => {
    if (!userFilter) return users;
    
    const lowerCaseFilter = userFilter.toLowerCase();
    return users.filter(
      user => 
        user.name.toLowerCase().includes(lowerCaseFilter) ||
        user.email.toLowerCase().includes(lowerCaseFilter) ||
        (user.company && user.company.toLowerCase().includes(lowerCaseFilter))
    );
  }, [userFilter, users]);
  
  // Filtered companies based on search
  const filteredCompanies = React.useMemo(() => {
    if (!companyFilter) return companies;
    
    const lowerCaseFilter = companyFilter.toLowerCase();
    return companies.filter(
      company => company.name.toLowerCase().includes(lowerCaseFilter)
    );
  }, [companyFilter, companies]);
  
  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?returnUrl=/dashboard/admin");
    } else if (user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user]);
  
  if (!isAuthenticated || !user || user.role !== "admin") {
    return null; // Prevent flash of content before redirect
  }
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500">System Online</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={12} />
              Last updated: Just now
            </Badge>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {platformStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-500">{stat.change} from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon size={24} className="text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
              <CardDescription>New users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-md">
                <BarChart3 size={48} className="text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">User Growth Chart</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Distribution</CardTitle>
              <CardDescription>Jobs by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-secondary/50 rounded-md">
                <PieChart size={48} className="text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Job Categories Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="system">System Status</TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>Manage all users on the platform</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-10"
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)} 
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Login</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">{user.name}</td>
                            <td className="p-4 align-middle">{user.email}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={user.role === "Admin" ? "destructive" : "secondary"}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{user.company || "-"}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={user.status === "Active" ? "default" : "outline"}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{user.lastLogin}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Company Management</CardTitle>
                  <CardDescription>Manage all companies on the platform</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search companies..." 
                      className="pl-10"
                      value={companyFilter}
                      onChange={(e) => setCompanyFilter(e.target.value)} 
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Company
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Jobs</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employees</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date Joined</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredCompanies.map((company) => (
                          <tr key={company.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{company.name}</td>
                            <td className="p-4 align-middle">{company.jobs}</td>
                            <td className="p-4 align-middle">{company.employees}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={company.status === "Verified" ? "default" : "secondary"}>
                                {company.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{company.dateJoined}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm">Edit</Button>
                                {company.status === "Pending" && (
                                  <Button variant="outline" size="sm" className="text-green-600">Verify</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* System Status Tab */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Status</CardTitle>
                  <CardDescription>Current status of all systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus.map((system, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full bg-${system.status === 'Operational' ? 'green' : 'amber'}-100 flex items-center justify-center`}>
                            <system.icon size={16} className={system.color} />
                          </div>
                          <span className="font-medium">{system.name}</span>
                        </div>
                        <Badge
                          variant={system.status === "Operational" ? "default" : "outline"}
                          className={system.status === "Operational" ? "bg-green-500" : "text-amber-500 border-amber-200 bg-amber-100"}
                        >
                          {system.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">System Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU Usage</span>
                          <span>28%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "28%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Memory Usage</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Disk Usage</span>
                          <span>65%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest system and administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
                          <activity.icon size={14} className={activity.iconColor} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">View All Activity</Button>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Management</CardTitle>
                  <CardDescription>System-wide settings and controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Users className="h-6 w-6 mb-2" />
                      <span>User Management</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Building className="h-6 w-6 mb-2" />
                      <span>Organization Settings</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Shield className="h-6 w-6 mb-2" />
                      <span>Permissions</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <BarChart4 className="h-6 w-6 mb-2" />
                      <span>Analytics</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Briefcase className="h-6 w-6 mb-2" />
                      <span>Job Board Settings</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <AlertTriangle className="h-6 w-6 mb-2" />
                      <span>Reported Content</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
