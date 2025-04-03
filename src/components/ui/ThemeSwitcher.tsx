
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageSwitcher";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get saved theme from localStorage, default to system
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || "system";
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors">
          {theme === "light" ? (
            <Sun size={18} className="text-foreground/80" />
          ) : theme === "dark" ? (
            <Moon size={18} className="text-foreground/80" />
          ) : (
            <Monitor size={18} className="text-foreground/80" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-popover animate-scale-in">
        <DropdownMenuItem 
          className={`flex items-center gap-2 cursor-pointer ${theme === "light" ? "bg-accent text-accent-foreground" : ""}`}
          onClick={() => setTheme("light")}
        >
          <Sun size={16} />
          <span>{t("theme.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 cursor-pointer ${theme === "dark" ? "bg-accent text-accent-foreground" : ""}`}
          onClick={() => setTheme("dark")}
        >
          <Moon size={16} />
          <span>{t("theme.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 cursor-pointer ${theme === "system" ? "bg-accent text-accent-foreground" : ""}`}
          onClick={() => setTheme("system")}
        >
          <Monitor size={16} />
          <span>{t("theme.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
