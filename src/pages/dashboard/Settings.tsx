
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Switch,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Bell, 
  Lock, 
  User, 
  Shield, 
  Settings as SettingsIcon,
  MailOpen,
  Mail,
  BellOff,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define form schema for profile settings
const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

// Define form schema for account settings
const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must include uppercase, lowercase, and numbers"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Define form schema for notification settings
const notificationFormSchema = z.object({
  emailApplicationUpdates: z.boolean().default(true),
  emailMessages: z.boolean().default(true),
  emailJobAlerts: z.boolean().default(true),
  emailMarketing: z.boolean().default(false),
  pushApplicationUpdates: z.boolean().default(true),
  pushMessages: z.boolean().default(true),
  pushJobAlerts: z.boolean().default(false),
});

const Settings = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Initialize profile form with user data
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
    },
  });
  
  // Initialize security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Initialize notification form
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailApplicationUpdates: true,
      emailMessages: true,
      emailJobAlerts: true,
      emailMarketing: false,
      pushApplicationUpdates: true,
      pushMessages: true,
      pushJobAlerts: false,
    },
  });
  
  // Handle profile form submission
  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  // Handle security form submission
  const onSecuritySubmit = (values: z.infer<typeof securityFormSchema>) => {
    console.log(values);
    
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
    
    securityForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  // Handle notification form submission
  const onNotificationSubmit = (values: z.infer<typeof notificationFormSchema>) => {
    console.log(values);
    
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been updated.",
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your email address" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your phone number" 
                                {...field}
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Update your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="profile-picture">Upload Image</Label>
                      <Input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                      />
                      <p className="text-sm text-muted-foreground">
                        Recommended size: 300x300px. Max file size: 2MB.
                        Supported formats: PNG, JPG
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button 
                        variant="outline"
                        type="button"
                        onClick={() => {
                          toast({
                            title: "Image Removed",
                            description: "Your profile picture has been removed.",
                          });
                        }}
                      >
                        Remove Image
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => {
                          toast({
                            title: "Image Uploaded",
                            description: "Your profile picture has been updated.",
                          });
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your current password" 
                              type="password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your new password" 
                              type="password"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters and include uppercase, lowercase, and numbers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Confirm your new password" 
                              type="password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with 2FA security. When enabled, you'll be required
                      to provide an authentication code to sign in.
                    </p>
                  </div>
                  <Switch 
                    onCheckedChange={(checked) => {
                      toast({
                        title: checked ? "2FA Enabled" : "2FA Disabled",
                        description: checked 
                          ? "Two-factor authentication has been enabled." 
                          : "Two-factor authentication has been disabled.",
                      });
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-sm font-medium">Sign Out from all Devices</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign out from all devices where you're currently logged in.
                  </p>
                  <div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Signed Out from All Devices",
                          description: "You have been signed out from all devices.",
                        });
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out Everywhere
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all of your data.
                  </p>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove all of your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => {
                              toast({
                                title: "Account Deleted",
                                description: "Your account has been permanently deleted.",
                                variant: "destructive",
                              });
                              setTimeout(() => {
                                handleLogout();
                              }, 2000);
                            }}
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="emailApplicationUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Application Updates
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications about your job applications
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailMessages"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Messages
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications when you get new messages
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailJobAlerts"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Job Alerts
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications about new job matches
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailMarketing"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Marketing & Promotions
                                </FormLabel>
                                <FormDescription>
                                  Receive marketing and promotional emails
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Push Notifications
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="pushApplicationUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Application Updates
                                </FormLabel>
                                <FormDescription>
                                  Receive push notifications about your job applications
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="pushMessages"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Messages
                                </FormLabel>
                                <FormDescription>
                                  Receive push notifications when you get new messages
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="pushJobAlerts"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Job Alerts
                                </FormLabel>
                                <FormDescription>
                                  Receive push notifications about new job matches
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          notificationForm.reset();
                          toast({
                            title: "Notification Settings Reset",
                            description: "Your notification settings have been reset to default.",
                          });
                        }}
                      >
                        Reset to Default
                      </Button>
                      <Button type="submit">Save Preferences</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Frequency</CardTitle>
                <CardDescription>
                  Control how often you receive email notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="digest-frequency">Notification Digest</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="digest-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                        <SelectItem value="none">No Digest</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Instead of individual emails, receive a digest of all notifications
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Email Frequency Updated",
                          description: "Your email frequency preferences have been saved.",
                        });
                      }}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
