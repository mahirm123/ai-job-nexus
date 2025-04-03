
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Building, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveJob, unsaveJob } from "@/api/jobs";
import { toast } from "sonner";
import { useLanguage } from "@/components/ui/LanguageSwitcher";

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  tags: string[];
  postedAt: string;
  featured?: boolean;
  className?: string;
}

export const JobCard = ({
  id,
  title,
  company,
  logo,
  location,
  salary,
  tags,
  postedAt,
  featured = false,
  className,
}: JobCardProps) => {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (saved) {
        await unsaveJob(id);
        setSaved(false);
        toast.success(t("job.unsaved"));
      } else {
        await saveJob(id);
        setSaved(true);
        toast.success(t("job.saved"));
      }
    } catch (error) {
      toast.error(t("error.general"));
      console.error("Error saving/unsaving job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg group",
        featured ? "border-l-4 border-l-primary ring-1 ring-primary/10" : "",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary flex items-center justify-center shrink-0">
          {logo ? (
            <img src={logo} alt={`${company} logo`} className="w-full h-full object-cover" />
          ) : (
            <Building size={24} className="text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/jobs/${id}`}>
                <h3 className="text-lg font-medium hover:text-primary transition-colors line-clamp-1">
                  {title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mt-1 mb-2">{company}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 shrink-0" 
              onClick={handleSave}
              disabled={isLoading}
            >
              <Bookmark 
                size={18} 
                className={saved ? "fill-primary text-primary" : ""} 
              />
              <span className="sr-only">{t("save.job")}</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2 mb-3">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}
            {salary && (
              <div className="flex items-center gap-1">
                <DollarSign size={14} />
                <span>{salary}</span>
              </div>
            )}
            <div className="text-xs">
              Posted {postedAt}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Link to={`/jobs/${id}`}>{t("apply.now")}</Link>
        </Button>
      </div>
    </div>
  );
};
