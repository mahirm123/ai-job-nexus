
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string | null;
  status: string;
  lastLogin: string;
}

export interface Company {
  id: string;
  name: string;
  jobs: number;
  employees: number;
  status: string;
  dateJoined: string;
}

// Mock data for user management
export const users: User[] = [
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
export const companies: Company[] = [
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
