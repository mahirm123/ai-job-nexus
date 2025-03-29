
import React, { useState, createContext, useContext, ReactNode } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Simple translation storage
const translations: Record<string, Record<string, string>> = {
  en: {
    "search.placeholder": "Search for jobs, skills, or companies...",
    "apply.now": "Apply Now",
    "save.job": "Save",
    "share.job": "Share",
  },
  es: {
    "search.placeholder": "Buscar trabajos, habilidades o empresas...",
    "apply.now": "Solicitar ahora",
    "save.job": "Guardar",
    "share.job": "Compartir",
  },
  zh: {
    "search.placeholder": "搜索工作、技能或公司...",
    "apply.now": "立即申请",
    "save.job": "保存",
    "share.job": "分享",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  changeLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Here you would typically call your i18n library to change the language
    console.log(`Language changed to ${language.name}`);
    
    // Notify user
    toast.success(`Language changed to ${language.name}`, {
      description: `The interface will now display in ${language.name}`,
      duration: 3000,
    });
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <Globe size={18} className="text-foreground/80" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 glass-card animate-scale-in">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage.code === language.code ? "bg-secondary" : ""
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
