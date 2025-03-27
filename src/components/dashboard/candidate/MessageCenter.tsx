
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, MailOpen, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Message {
  id: string;
  from: string;
  company: string;
  date: string;
  preview: string;
  read: boolean;
  avatar?: string;
}

interface MessageCenterProps {
  messages: Message[];
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export const MessageCenter: React.FC<MessageCenterProps> = ({ 
  messages,
  showViewAll = false,
  onViewAll
}) => {
  const displayedMessages = showViewAll ? messages : messages.slice(0, 3);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-4">
      {displayedMessages.length > 0 ? (
        <>
          {displayedMessages.map((message) => (
            <Card
              key={message.id}
              className={`overflow-hidden ${
                !message.read ? "bg-primary/5 border-primary/20" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{getInitials(message.from)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium flex items-center">
                        {message.from}
                        {!message.read && (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {message.date}
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {message.company}
                    </div>
                    
                    <p className="mt-2 text-sm line-clamp-2">
                      {message.preview}
                    </p>
                    
                    <div className="mt-2 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 px-2"
                      >
                        {message.read ? (
                          <>
                            <MailOpen className="mr-1 h-3 w-3" />
                            Mark as unread
                          </>
                        ) : (
                          "Mark as read"
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        className="text-xs h-7 px-2"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {showViewAll && onViewAll && messages.length > 3 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={onViewAll}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                View All Messages
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">
            No messages yet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            When recruiters contact you, their messages will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
