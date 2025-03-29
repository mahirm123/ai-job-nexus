
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    navigate(`/search?query=${encodeURIComponent(term)}`);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Find Your Next <span className="text-gradient">AI & Tech Career</span> Opportunity
          </h1>
          
          <p className="animate-slide-up animation-delay-100 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 text-balance">
            Connect with leading companies in the AI and tech industry. 
            Discover roles that match your skills and aspirations.
          </p>

          <div className="animate-slide-up animation-delay-200 relative max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="glass-card rounded-full flex items-center overflow-hidden p-1.5 shadow-lg">
              <Input 
                placeholder="Search for jobs, skills, or companies..." 
                className="flex-1 border-none bg-transparent text-foreground placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-full" size="lg">
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </form>
          </div>

          <div className="animate-slide-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular searches:</span>
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => handlePopularSearch("Machine Learning")}
              >
                Machine Learning
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => handlePopularSearch("Data Science")}
              >
                Data Science
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => handlePopularSearch("Software Engineer")}
              >
                Software Engineer
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => handlePopularSearch("Remote")}
              >
                Remote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
