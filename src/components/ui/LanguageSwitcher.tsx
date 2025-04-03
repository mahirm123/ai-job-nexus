
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

// Define translations
const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    "nav.home": "Home",
    "nav.jobs": "Jobs",
    "nav.employers": "Employers",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",
    
    "jobs.position": "Position",
    "jobs.company": "Company",
    "jobs.location": "Location",
    "jobs.salary": "Salary",
    "jobs.remote": "Remote",
    "jobs.onsite": "On-site",
    "jobs.hybrid": "Hybrid",
    "jobs.fullTime": "Full Time",
    "jobs.partTime": "Part Time",
    "jobs.contract": "Contract",
    "jobs.applyNow": "Apply Now",
    "jobs.markFavorite": "Mark as Favorite",
    "jobs.removeSaved": "Remove from Saved",
    
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.filterBy": "Filter by",
    "common.sortBy": "Sort by",
    "common.newest": "Newest",
    "common.oldest": "Oldest",
    "common.highestSalary": "Highest Salary",
    "common.alphabetical": "Alphabetical",
    "common.actions": "Actions",
    "common.viewDetails": "View Details",
    "common.pickDate": "Pick a date",
    "common.savedOn": "Saved On",
    "common.openMenu": "Open Menu",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.upload": "Upload",
    "common.download": "Download",
    
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    
    "profile.myProfile": "My Profile",
    "profile.manageProfile": "Manage your profile details and settings",
    "profile.information": "Information",
    "profile.settings": "Settings",
    "profile.personalInfo": "Personal Information",
    "profile.basicInfo": "Your basic profile information",
    "profile.edit": "Edit",
    "profile.editProfile": "Edit Profile",
    "profile.editProfileDesc": "Update your profile information",
    "profile.uploadPhoto": "Upload Photo",
    "profile.location": "Location",
    "profile.phone": "Phone",
    "profile.website": "Website",
    "profile.availability": "Availability",
    "profile.skills": "Skills",
    "profile.skillsDescription": "Your professional skills and expertise",
    "profile.editSkills": "Edit Skills",
    "profile.editSkillsDesc": "Add or remove skills from your profile",
    "profile.experience": "Experience",
    "profile.experienceDescription": "Your professional experience",
    "profile.editExperience": "Edit Experience",
    "profile.editExperienceDesc": "Add or update your professional experience",
    "profile.addExperience": "Add Experience",
    "profile.education": "Education",
    "profile.educationDescription": "Your educational background",
    "profile.editEducation": "Edit Education",
    "profile.editEducationDesc": "Add or update your educational information",
    "profile.addEducation": "Add Education",
    "profile.resume": "Resume",
    "profile.resumeDescription": "Your professional resume",
    "profile.upload": "Upload",
    "profile.uploadResume": "Upload Resume",
    "profile.uploadResumeDesc": "Upload or update your resume",
    "profile.dragFiles": "Drag and drop files here, or click to browse",
    "profile.supportedFormats": "Supported formats: PDF, DOCX (Max 5MB)",
    "profile.selectFiles": "Select Files",
    "profile.resumeNotice": "Your resume will be shared with employers when you apply for jobs",
    
    "settings.preferences": "Preferences",
    "settings.preferencesDesc": "Manage your account preferences",
    "settings.language": "Language",
    "settings.languageDesc": "Select your preferred language",
    "settings.selectLanguage": "Select Language",
    "settings.theme": "Theme",
    "settings.themeDesc": "Choose your preferred theme",
    "settings.selectTheme": "Select Theme",
    "settings.notifications": "Notifications",
    "settings.notificationsDesc": "Manage how you receive notifications",
    "settings.jobAlerts": "Job Alerts",
    "settings.jobAlertsDesc": "Receive notifications for new job postings matching your criteria",
    "settings.applicationUpdates": "Application Updates",
    "settings.applicationUpdatesDesc": "Receive updates about your job applications",
    "settings.messageNotifications": "Message Notifications",
    "settings.messageNotificationsDesc": "Receive notifications when you get new messages",
    "settings.marketingEmails": "Marketing Emails",
    "settings.marketingEmailsDesc": "Receive promotional emails and newsletters",
    "settings.privacy": "Privacy",
    "settings.privacyDesc": "Control your privacy settings",
    "settings.profileVisibility": "Profile Visibility",
    "settings.profileVisibilityDesc": "Make your profile visible to employers",
    "settings.shareActivity": "Share Activity",
    "settings.shareActivityDesc": "Share your job application activity with your network",
    "settings.allowMessages": "Allow Messages",
    "settings.allowMessagesDesc": "Allow employers to message you directly",
    "settings.dangerZone": "Danger Zone",
    "settings.dangerZoneDesc": "Permanently delete your account or log out",
    "settings.deleteAccount": "Delete Account",
    "settings.deleteAccountDesc": "Permanently delete your account and all your data",
    "settings.delete": "Delete",
    "settings.confirmDeleteTitle": "Are you sure?",
    "settings.confirmDeleteDesc": "This action cannot be undone. This will permanently delete your account and remove all your data from our servers.",
    "settings.confirmDelete": "Yes, delete my account",
    "settings.logout": "Log Out",
    "settings.logoutDesc": "Log out from your account on this device",
    
    "savedJobs.title": "Saved Jobs",
    "savedJobs.subtitle": "View and manage your saved job listings",
  },
  es: {
    "nav.home": "Inicio",
    "nav.jobs": "Empleos",
    "nav.employers": "Empleadores",
    "nav.about": "Acerca de",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "nav.dashboard": "Panel",
    "nav.logout": "Cerrar Sesión",
    
    "jobs.position": "Puesto",
    "jobs.company": "Empresa",
    "jobs.location": "Ubicación",
    "jobs.salary": "Salario",
    "jobs.remote": "Remoto",
    "jobs.onsite": "Presencial",
    "jobs.hybrid": "Híbrido",
    "jobs.fullTime": "Tiempo Completo",
    "jobs.partTime": "Tiempo Parcial",
    "jobs.contract": "Contrato",
    "jobs.applyNow": "Aplicar Ahora",
    "jobs.markFavorite": "Marcar como Favorito",
    "jobs.removeSaved": "Quitar de Guardados",
    
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.filterBy": "Filtrar por",
    "common.sortBy": "Ordenar por",
    "common.newest": "Más Reciente",
    "common.oldest": "Más Antiguo",
    "common.highestSalary": "Mayor Salario",
    "common.alphabetical": "Alfabético",
    "common.actions": "Acciones",
    "common.viewDetails": "Ver Detalles",
    "common.pickDate": "Elegir fecha",
    "common.savedOn": "Guardado El",
    "common.openMenu": "Abrir Menú",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.upload": "Subir",
    "common.download": "Descargar",
    
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",
    
    "profile.myProfile": "Mi Perfil",
    "profile.manageProfile": "Gestiona tus datos de perfil y configuración",
    "profile.information": "Información",
    "profile.settings": "Configuración",
    "profile.personalInfo": "Información Personal",
    "profile.basicInfo": "Tu información básica de perfil",
    "profile.edit": "Editar",
    "profile.editProfile": "Editar Perfil",
    "profile.editProfileDesc": "Actualiza tu información de perfil",
    "profile.uploadPhoto": "Subir Foto",
    "profile.location": "Ubicación",
    "profile.phone": "Teléfono",
    "profile.website": "Sitio Web",
    "profile.availability": "Disponibilidad",
    "profile.skills": "Habilidades",
    "profile.skillsDescription": "Tus habilidades y experiencia profesional",
    "profile.editSkills": "Editar Habilidades",
    "profile.editSkillsDesc": "Añadir o eliminar habilidades de tu perfil",
    "profile.experience": "Experiencia",
    "profile.experienceDescription": "Tu experiencia profesional",
    "profile.editExperience": "Editar Experiencia",
    "profile.editExperienceDesc": "Añadir o actualizar tu experiencia profesional",
    "profile.addExperience": "Añadir Experiencia",
    "profile.education": "Educación",
    "profile.educationDescription": "Tu formación académica",
    "profile.editEducation": "Editar Educación",
    "profile.editEducationDesc": "Añadir o actualizar tu información educativa",
    "profile.addEducation": "Añadir Educación",
    "profile.resume": "Currículum",
    "profile.resumeDescription": "Tu currículum profesional",
    "profile.upload": "Subir",
    "profile.uploadResume": "Subir Currículum",
    "profile.uploadResumeDesc": "Subir o actualizar tu currículum",
    "profile.dragFiles": "Arrastra y suelta archivos aquí, o haz clic para navegar",
    "profile.supportedFormats": "Formatos soportados: PDF, DOCX (Máx 5MB)",
    "profile.selectFiles": "Seleccionar Archivos",
    "profile.resumeNotice": "Tu currículum será compartido con los empleadores cuando solicites empleos",
    
    "settings.preferences": "Preferencias",
    "settings.preferencesDesc": "Gestiona las preferencias de tu cuenta",
    "settings.language": "Idioma",
    "settings.languageDesc": "Selecciona tu idioma preferido",
    "settings.selectLanguage": "Seleccionar Idioma",
    "settings.theme": "Tema",
    "settings.themeDesc": "Elige tu tema preferido",
    "settings.selectTheme": "Seleccionar Tema",
    "settings.notifications": "Notificaciones",
    "settings.notificationsDesc": "Gestiona cómo recibes las notificaciones",
    "settings.jobAlerts": "Alertas de Empleo",
    "settings.jobAlertsDesc": "Recibir notificaciones de nuevas ofertas de empleo que coincidan con tus criterios",
    "settings.applicationUpdates": "Actualizaciones de Solicitudes",
    "settings.applicationUpdatesDesc": "Recibir actualizaciones sobre tus solicitudes de empleo",
    "settings.messageNotifications": "Notificaciones de Mensajes",
    "settings.messageNotificationsDesc": "Recibir notificaciones cuando recibas nuevos mensajes",
    "settings.marketingEmails": "Correos de Marketing",
    "settings.marketingEmailsDesc": "Recibir correos promocionales y boletines",
    "settings.privacy": "Privacidad",
    "settings.privacyDesc": "Controla tu configuración de privacidad",
    "settings.profileVisibility": "Visibilidad del Perfil",
    "settings.profileVisibilityDesc": "Hacer tu perfil visible para los empleadores",
    "settings.shareActivity": "Compartir Actividad",
    "settings.shareActivityDesc": "Compartir tu actividad de solicitud de empleo con tu red",
    "settings.allowMessages": "Permitir Mensajes",
    "settings.allowMessagesDesc": "Permitir que los empleadores te envíen mensajes directamente",
    "settings.dangerZone": "Zona de Peligro",
    "settings.dangerZoneDesc": "Eliminar permanentemente tu cuenta o cerrar sesión",
    "settings.deleteAccount": "Eliminar Cuenta",
    "settings.deleteAccountDesc": "Eliminar permanentemente tu cuenta y todos tus datos",
    "settings.delete": "Eliminar",
    "settings.confirmDeleteTitle": "¿Estás seguro?",
    "settings.confirmDeleteDesc": "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará todos tus datos de nuestros servidores.",
    "settings.confirmDelete": "Sí, eliminar mi cuenta",
    "settings.logout": "Cerrar Sesión",
    "settings.logoutDesc": "Cerrar sesión en tu cuenta en este dispositivo",
    
    "savedJobs.title": "Empleos Guardados",
    "savedJobs.subtitle": "Ver y gestionar tus ofertas de empleo guardadas",
  },
  // Add other translations as needed
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>(() => {
    // Try to get saved language from localStorage, default to "en"
    return localStorage.getItem('language') || "en";
  });

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
          <span className="text-lg">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center ${
              language === lang.code ? "bg-accent text-accent-foreground" : ""
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
