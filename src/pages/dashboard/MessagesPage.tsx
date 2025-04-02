
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
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  PlusCircle,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Mock conversations
const conversations = [
  {
    id: "conv-1",
    contact: {
      id: "user-1",
      name: "Sophie Martinez",
      avatar: null,
      lastSeen: "2 min ago",
      isOnline: true,
    },
    lastMessage: {
      text: "I have reviewed your application and I'm impressed with your experience.",
      timestamp: "10:32 AM",
      isRead: true,
      sender: "me"
    },
    unreadCount: 0,
  },
  {
    id: "conv-2",
    contact: {
      id: "user-2",
      name: "James Wilson",
      avatar: null,
      lastSeen: "5 min ago",
      isOnline: true,
    },
    lastMessage: {
      text: "When would be a good time for an interview?",
      timestamp: "Yesterday",
      isRead: false,
      sender: "contact"
    },
    unreadCount: 3,
  },
  {
    id: "conv-3",
    contact: {
      id: "user-3",
      name: "Emma Johnson",
      avatar: null,
      lastSeen: "1 hour ago",
      isOnline: false,
    },
    lastMessage: {
      text: "Thank you for the opportunity. I'm looking forward to hearing from you.",
      timestamp: "Yesterday",
      isRead: true,
      sender: "contact"
    },
    unreadCount: 0,
  },
  {
    id: "conv-4",
    contact: {
      id: "user-4",
      name: "Alex Thompson",
      avatar: null,
      lastSeen: "3 hours ago",
      isOnline: false,
    },
    lastMessage: {
      text: "I have attached my portfolio as requested.",
      timestamp: "2 days ago",
      isRead: true,
      sender: "contact"
    },
    unreadCount: 0,
  },
  {
    id: "conv-5",
    contact: {
      id: "user-5",
      name: "Michael Brown",
      avatar: null,
      lastSeen: "2 days ago",
      isOnline: false,
    },
    lastMessage: {
      text: "Is there any update on my application status?",
      timestamp: "3 days ago",
      isRead: true,
      sender: "contact"
    },
    unreadCount: 0,
  },
];

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: "msg-1",
    text: "Hello, I've reviewed your application for the UI/UX Designer position",
    timestamp: "10:15 AM",
    sender: "me",
  },
  {
    id: "msg-2",
    text: "Hi, thank you for getting back to me!",
    timestamp: "10:17 AM",
    sender: "contact",
  },
  {
    id: "msg-3",
    text: "I'm very interested in the role and would love to discuss further",
    timestamp: "10:18 AM",
    sender: "contact",
  },
  {
    id: "msg-4",
    text: "Great! I'm impressed with your portfolio and experience",
    timestamp: "10:20 AM",
    sender: "me",
  },
  {
    id: "msg-5",
    text: "When would you be available for an interview?",
    timestamp: "10:22 AM",
    sender: "me",
  },
  {
    id: "msg-6",
    text: "I'm available any day next week in the afternoons, if that works for you",
    timestamp: "10:25 AM",
    sender: "contact",
  },
  {
    id: "msg-7",
    text: "Perfect! Let's schedule for Tuesday at 2 PM then",
    timestamp: "10:30 AM",
    sender: "me",
  },
  {
    id: "msg-8",
    text: "I have reviewed your application and I'm impressed with your experience.",
    timestamp: "10:32 AM",
    sender: "me",
  },
];

const MessagesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conv => conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: `msg-${messages.length + 1}`,
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me",
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen">
        <div className="flex h-full overflow-hidden">
          {/* Left sidebar - conversations list */}
          <div className="hidden md:flex md:w-80 flex-col border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer ${
                    selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.contact.avatar || undefined} />
                      <AvatarFallback>{getInitials(conversation.contact.name)}</AvatarFallback>
                    </Avatar>
                    {conversation.contact.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium truncate">{conversation.contact.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.sender === "me" && "You: "}
                        {conversation.lastMessage.text}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found.
                </div>
              )}
            </ScrollArea>
            
            <div className="p-4 border-t">
              <Button className="w-full" variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
          
          {/* Right side - messages */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col h-full">
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.contact.avatar || undefined} />
                    <AvatarFallback>{getInitials(selectedConversation.contact.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.contact.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.contact.isOnline 
                        ? 'Online' 
                        : `Last seen ${selectedConversation.contact.lastSeen}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === 'me' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'me' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea 
                    placeholder="Type a message..." 
                    className="flex-1 min-h-10 resize-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Select a conversation from the list or start a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
