
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog";
import { Pencil, Download, UploadCloud } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const ProfileInfo = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Mock skills data - would come from user profile in a real app
  const skills = [
    "React", "TypeScript", "JavaScript", "HTML", "CSS", 
    "Tailwind CSS", "Node.js", "Express", "MongoDB"
  ];
  
  // Mock experience data
  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      description: "Leading frontend development for enterprise applications."
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations",
      period: "2018 - 2020",
      description: "Developed responsive web applications using React."
    },
    {
      title: "Junior Developer",
      company: "StartUp Co.",
      period: "2016 - 2018",
      description: "Worked on various frontend and backend projects."
    }
  ];
  
  // Mock education data
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2016"
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "State University",
      year: "2014"
    }
  ];
  
  const userInitials = user 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` 
    : "U";
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("profile.personalInfo")}</CardTitle>
            <CardDescription>{t("profile.basicInfo")}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Pencil className="h-4 w-4 mr-2" />
                {t("profile.edit")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("profile.editProfile")}</DialogTitle>
                <DialogDescription>
                  {t("profile.editProfileDesc")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    {t("profile.uploadPhoto")}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("common.cancel")}</Button>
                </DialogClose>
                <Button type="submit">{t("common.save")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">Senior Frontend Developer</p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t("profile.location")}
              </h4>
              <p>San Francisco, CA</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t("profile.phone")}
              </h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t("profile.website")}
              </h4>
              <p>https://example.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t("profile.availability")}
              </h4>
              <p>Immediately</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("profile.skills")}</CardTitle>
            <CardDescription>{t("profile.skillsDescription")}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Pencil className="h-4 w-4 mr-2" />
                {t("profile.edit")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("profile.editSkills")}</DialogTitle>
                <DialogDescription>
                  {t("profile.editSkillsDesc")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Badge variant="outline" className="py-1.5">
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("common.cancel")}</Button>
                </DialogClose>
                <Button type="submit">{t("common.save")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("profile.experience")}</CardTitle>
            <CardDescription>{t("profile.experienceDescription")}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Pencil className="h-4 w-4 mr-2" />
                {t("profile.edit")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{t("profile.editExperience")}</DialogTitle>
                <DialogDescription>
                  {t("profile.editExperienceDesc")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{exp.title}</h4>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.company} · {exp.period}</p>
                    <p className="text-sm">{exp.description}</p>
                    {index < experience.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
              <DialogFooter className="sm:justify-between">
                <Button variant="outline" className="hidden sm:flex">
                  + {t("profile.addExperience")}
                </Button>
                <div className="flex space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline">{t("common.cancel")}</Button>
                  </DialogClose>
                  <Button type="submit">{t("common.save")}</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">{exp.title}</h4>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("profile.education")}</CardTitle>
            <CardDescription>{t("profile.educationDescription")}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Pencil className="h-4 w-4 mr-2" />
                {t("profile.edit")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("profile.editEducation")}</DialogTitle>
                <DialogDescription>
                  {t("profile.editEducationDesc")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.institution} · {edu.year}</p>
                    {index < education.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
              <DialogFooter className="sm:justify-between">
                <Button variant="outline" className="hidden sm:flex">
                  + {t("profile.addEducation")}
                </Button>
                <div className="flex space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline">{t("common.cancel")}</Button>
                  </DialogClose>
                  <Button type="submit">{t("common.save")}</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("profile.resume")}</CardTitle>
            <CardDescription>{t("profile.resumeDescription")}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <UploadCloud className="h-4 w-4 mr-2" />
                {t("profile.upload")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("profile.uploadResume")}</DialogTitle>
                <DialogDescription>
                  {t("profile.uploadResumeDesc")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground mb-1">
                    {t("profile.dragFiles")}
                  </p>
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    {t("profile.supportedFormats")}
                  </p>
                  <Button variant="outline" size="sm">
                    {t("profile.selectFiles")}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("common.cancel")}</Button>
                </DialogClose>
                <Button type="submit">{t("common.upload")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">John_Doe_Resume.pdf</p>
                <p className="text-xs text-muted-foreground">2.4MB · Updated 2 months ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t("common.download")}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t p-4">
          {t("profile.resumeNotice")}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileInfo;
