
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Video, PhoneCall, MapPin, BriefcaseBusiness } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface Interview {
  id: string;
  company: string;
  position: string;
  date: string;
  time: string;
  medium: "Video Call" | "Phone Call" | "In Person";
  link?: string | null;
  location?: string;
}

interface InterviewScheduleProps {
  interviews: Interview[];
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const InterviewSchedule: React.FC<InterviewScheduleProps> = ({
  interviews,
  selectedDate,
  onDateChange,
}) => {
  // Filter interviews for the selected date
  const formattedSelectedDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : "";
  const interviewsForDate = interviews.filter(
    (interview) => interview.date === formattedSelectedDate
  );
  
  const getMediumIcon = (medium: string) => {
    switch (medium) {
      case "Video Call":
        return <Video className="h-4 w-4" />;
      case "Phone Call":
        return <PhoneCall className="h-4 w-4" />;
      case "In Person":
        return <MapPin className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateChange}
        className="rounded-md border"
      />
      
      <div className="mt-4 space-y-4">
        {interviewsForDate.length > 0 ? (
          interviewsForDate.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {interview.position}
                  </div>
                  <Badge className="flex items-center gap-1">
                    {getMediumIcon(interview.medium)}
                    <span>{interview.medium}</span>
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {interview.company}
                </div>
                <div className="mt-2 text-sm flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {interview.date} at {interview.time}
                </div>
                
                {interview.location && (
                  <div className="mt-1 text-sm flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {interview.location}
                  </div>
                )}
                
                {interview.link && (
                  <div className="mt-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={interview.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Interview
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-md border border-dashed p-6 text-center">
            <BriefcaseBusiness className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">
              No interviews on this date
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              When you have interviews scheduled, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
