
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BriefcaseIcon, CalendarIcon, MapPinIcon, BanknoteIcon, TagIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createJob } from "@/api/jobs";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// Define the validation schema using zod
const formSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  salary: z.string().min(1, "Salary information is required"),
  tags: z.string().optional(),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
});

type FormValues = z.infer<typeof formSchema>;

const PostJobForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Define form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: user?.company || "", // Changed from companyId to company to match User type
      location: "",
      description: "",
      requirements: "",
      salary: "",
      tags: "",
      type: "Full-time",
    },
  });

  // Use react-query mutation
  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast({
        title: "Job posted successfully",
        description: "Your job has been published and is now visible to candidates",
      });
      navigate("/dashboard/recruiter");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to post job",
        description: error?.message || "An error occurred while posting the job",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    // Transform requirements from string to array
    const requirementsArray = data.requirements
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Transform tags from string to array
    const tagsArray = data.tags
      ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];
    
    // Submit the job data
    mutation.mutate({
      title: data.title,
      company: data.company,
      location: data.location,
      description: data.description,
      requirements: requirementsArray,
      salary: data.salary,
      tags: tagsArray,
      type: data.type,
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <BriefcaseIcon className="h-5 w-5" />
                      </div>
                      <Input className="pl-10" placeholder="e.g. Senior React Developer" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="Company ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your company ID from your dashboard
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <MapPinIcon className="h-5 w-5" />
                      </div>
                      <Input className="pl-10" placeholder="e.g. San Francisco, CA (or Remote)" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <BanknoteIcon className="h-5 w-5" />
                      </div>
                      <Input className="pl-10" placeholder="e.g. $80,000 - $100,000" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <TagIcon className="h-5 w-5" />
                      </div>
                      <Input className="pl-10" placeholder="e.g. React, JavaScript, Remote" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of job tags
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a detailed description of the job role and responsibilities"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List the requirements for this job (one per line)"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter each requirement on a new line
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PostJobForm;
