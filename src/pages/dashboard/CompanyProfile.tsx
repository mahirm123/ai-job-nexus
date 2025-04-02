
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Building, 
  Globe, 
  MapPin, 
  Users, 
  Briefcase, 
  Upload, 
  CalendarDays,
  FileText,
  Mail,
  Phone
} from "lucide-react";

// Define form schema
const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select a company size"),
  founded: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  about: z.string().min(10, "About section must be at least 10 characters"),
  mission: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
});

// Mock company data
const mockCompanyData = {
  name: "TechCorp Solutions",
  logo: null,
  website: "https://techcorp.example.com",
  industry: "Technology",
  companySize: "101-500",
  founded: "2010",
  location: "San Francisco, CA",
  about: "TechCorp Solutions is a leading technology company specializing in innovative software solutions for businesses of all sizes. We help companies streamline their operations and achieve digital transformation through cutting-edge technology.",
  mission: "Our mission is to empower businesses with technology solutions that drive growth and innovation.",
  email: "contact@techcorp.example.com",
  phone: "+1 (555) 123-4567",
  socialMedia: {
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    facebook: "https://facebook.com/techcorp",
  },
};

// Industry options
const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Media",
  "Consulting",
  "Construction",
  "Transportation",
  "Entertainment",
  "Other",
];

// Company size options
const companySizeOptions = [
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10000+",
];

const CompanyProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [logo, setLogo] = useState<string | null>(null);
  
  // Initialize form with company data
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: mockCompanyData.name,
      website: mockCompanyData.website,
      industry: mockCompanyData.industry,
      companySize: mockCompanyData.companySize,
      founded: mockCompanyData.founded,
      location: mockCompanyData.location,
      about: mockCompanyData.about,
      mission: mockCompanyData.mission,
      email: mockCompanyData.email,
      phone: mockCompanyData.phone,
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    console.log(values);
    
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });
    
    setIsEditing(false);
  };
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setLogo(event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Company Profile</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Manage your company information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter company name" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industryOptions.map(industry => (
                                    <SelectItem key={industry} value={industry}>
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Size</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select company size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {companySizeOptions.map(size => (
                                    <SelectItem key={size} value={size}>
                                      {size} employees
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="founded"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Founded Year</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. 2010" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. San Francisco, CA" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Company</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your company" 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This will be displayed on your public profile and job listings.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="mission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Mission (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share your company's mission" 
                                className="min-h-20"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="contact@example.com" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+1 (555) 123-4567" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="w-full md:w-36 flex-shrink-0 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-muted">
                          {logo ? (
                            <img src={logo} alt="Company logo" className="w-full h-full object-contain" />
                          ) : (
                            <Building className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold">{mockCompanyData.name}</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <a href={mockCompanyData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {mockCompanyData.website.replace('https://', '')}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{mockCompanyData.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{mockCompanyData.companySize} employees</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{mockCompanyData.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>Founded {mockCompanyData.founded}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        About Us
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {mockCompanyData.about}
                      </p>
                    </div>
                    
                    {mockCompanyData.mission && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {mockCompanyData.mission}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{mockCompanyData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{mockCompanyData.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Branding</CardTitle>
                <CardDescription>
                  Upload your company logo and customize branding elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="logo" className="block mb-2">Company Logo</Label>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-36 h-36 rounded-md border flex items-center justify-center bg-muted">
                        {logo ? (
                          <img src={logo} alt="Company logo" className="w-full h-full object-contain" />
                        ) : (
                          <Building className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="logo-upload">Upload Logo</Label>
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                          />
                          <p className="text-sm text-muted-foreground">
                            Recommended size: 400x400px. Max file size: 2MB.
                            Supported formats: PNG, JPG, SVG
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colors">Brand Colors</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="primary-color" className="text-xs">Primary Color</Label>
                        <div className="flex">
                          <Input
                            id="primary-color"
                            type="color"
                            value="#4f46e5"
                            className="w-10 h-10 p-1"
                          />
                          <Input
                            value="#4f46e5"
                            className="rounded-l-none flex-1"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="secondary-color" className="text-xs">Secondary Color</Label>
                        <div className="flex">
                          <Input
                            id="secondary-color"
                            type="color"
                            value="#0ea5e9"
                            className="w-10 h-10 p-1"
                          />
                          <Input
                            value="#0ea5e9"
                            className="rounded-l-none flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These colors will be used in your company profile and job postings.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button variant="outline">Reset</Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Branding Updated",
                      description: "Your company branding has been updated successfully.",
                    });
                  }}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfile;
