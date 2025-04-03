
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

// Extended translation storage with more keys for the entire website
const translations: Record<string, Record<string, string>> = {
  en: {
    "search.placeholder": "Search for jobs, skills, or companies...",
    "apply.now": "Apply Now",
    "save.job": "Save",
    "share.job": "Share",
    "jobs.heading": "Find Your Perfect AI & Tech Job",
    "jobs.subheading": "Browse through hundreds of opportunities from leading companies in the AI and tech industry.",
    "jobs.hideFilters": "Hide Filters",
    "jobs.showFilters": "Show Advanced Filters",
    "jobs.filters": "Filters",
    "jobs.reset": "Reset",
    "jobs.applyFilters": "Apply Filters",
    "dashboard.jobs": "Job Postings",
    "dashboard.applicants": "Applicants",
    "dashboard.messages": "Messages",
    "dashboard.profile": "Profile",
    "dashboard.analytics": "Analytics",
    "dashboard.settings": "Settings",
    "dashboard.createJob": "Create New Job",
  },
  es: {
    "search.placeholder": "Buscar trabajos, habilidades o empresas...",
    "apply.now": "Solicitar ahora",
    "save.job": "Guardar",
    "share.job": "Compartir",
    "jobs.heading": "Encuentra tu Trabajo Perfecto en IA y Tecnología",
    "jobs.subheading": "Explora cientos de oportunidades de empresas líderes en la industria de IA y tecnología.",
    "jobs.hideFilters": "Ocultar Filtros",
    "jobs.showFilters": "Mostrar Filtros Avanzados",
    "jobs.filters": "Filtros",
    "jobs.reset": "Restablecer",
    "jobs.applyFilters": "Aplicar Filtros",
    "dashboard.jobs": "Publicaciones de Empleo",
    "dashboard.applicants": "Candidatos",
    "dashboard.messages": "Mensajes",
    "dashboard.profile": "Perfil",
    "dashboard.analytics": "Análisis",
    "dashboard.settings": "Configuración",
    "dashboard.createJob": "Crear Nuevo Empleo",
  },
  zh: {
    "search.placeholder": "搜索工作、技能或公司...",
    "apply.now": "立即申请",
    "save.job": "保存",
    "share.job": "分享",
    "jobs.heading": "找到您理想的AI和科技工作",
    "jobs.subheading": "浏览AI和科技行业领先公司的数百个机会。",
    "jobs.hideFilters": "隐藏筛选",
    "jobs.showFilters": "显示高级筛选",
    "jobs.filters": "筛选条件",
    "jobs.reset": "重置",
    "jobs.applyFilters": "应用筛选",
    "dashboard.jobs": "职位发布",
    "dashboard.applicants": "申请人",
    "dashboard.messages": "消息",
    "dashboard.profile": "个人资料",
    "dashboard.analytics": "分析",
    "dashboard.settings": "设置",
    "dashboard.createJob": "创建新工作",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  changeLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage, default to English
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      return language || languages[0];
    }
    return languages[0];
  });

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', language.code);
    
    // Update document language attribute for accessibility
    document.documentElement.lang = language.code;
    
    // Notify user
    toast.success(`Language changed to ${language.name}`, {
      description: `The interface will now display in ${language.name}`,
      duration: 3000,
    });
  };

  // Initialize document language on first render
  React.useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage.code]);

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
      <DropdownMenuContent align="end" className="w-40 bg-background animate-scale-in">
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
