
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  BellRing, 
  Mail, 
  Globe, 
  Shield, 
  Trash2, 
  LogOut 
} from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import { useTheme } from "@/components/ui/ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfileSettings = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    messageNotifications: true,
    marketingEmails: false
  });
  
  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    shareActivity: true,
    allowMessages: true
  });
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };
  
  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key]
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.preferences")}</CardTitle>
          <CardDescription>{t("settings.preferencesDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="language">{t("settings.language")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.languageDesc")}
                </p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("settings.selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("settings.theme")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.themeDesc")}
                </p>
              </div>
              <Select 
                value={theme} 
                onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("settings.selectTheme")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t("theme.light")}</SelectItem>
                  <SelectItem value="dark">{t("theme.dark")}</SelectItem>
                  <SelectItem value="system">{t("theme.system")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BellRing className="h-5 w-5 text-primary" />
            <CardTitle>{t("settings.notifications")}</CardTitle>
          </div>
          <CardDescription>{t("settings.notificationsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="job-alerts" className="flex flex-col space-y-1">
              <span>{t("settings.jobAlerts")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.jobAlertsDesc")}
              </span>
            </Label>
            <Switch
              id="job-alerts"
              checked={notificationSettings.jobAlerts}
              onCheckedChange={() => handleToggleNotification('jobAlerts')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="app-updates" className="flex flex-col space-y-1">
              <span>{t("settings.applicationUpdates")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.applicationUpdatesDesc")}
              </span>
            </Label>
            <Switch
              id="app-updates"
              checked={notificationSettings.applicationUpdates}
              onCheckedChange={() => handleToggleNotification('applicationUpdates')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="msgs" className="flex flex-col space-y-1">
              <span>{t("settings.messageNotifications")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.messageNotificationsDesc")}
              </span>
            </Label>
            <Switch
              id="msgs"
              checked={notificationSettings.messageNotifications}
              onCheckedChange={() => handleToggleNotification('messageNotifications')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing" className="flex flex-col space-y-1">
              <span>{t("settings.marketingEmails")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.marketingEmailsDesc")}
              </span>
            </Label>
            <Switch
              id="marketing"
              checked={notificationSettings.marketingEmails}
              onCheckedChange={() => handleToggleNotification('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>{t("settings.privacy")}</CardTitle>
          </div>
          <CardDescription>{t("settings.privacyDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="visible" className="flex flex-col space-y-1">
              <span>{t("settings.profileVisibility")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.profileVisibilityDesc")}
              </span>
            </Label>
            <Switch
              id="visible"
              checked={privacySettings.profileVisible}
              onCheckedChange={() => handleTogglePrivacy('profileVisible')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="activity" className="flex flex-col space-y-1">
              <span>{t("settings.shareActivity")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.shareActivityDesc")}
              </span>
            </Label>
            <Switch
              id="activity"
              checked={privacySettings.shareActivity}
              onCheckedChange={() => handleTogglePrivacy('shareActivity')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="messages" className="flex flex-col space-y-1">
              <span>{t("settings.allowMessages")}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t("settings.allowMessagesDesc")}
              </span>
            </Label>
            <Switch
              id="messages"
              checked={privacySettings.allowMessages}
              onCheckedChange={() => handleTogglePrivacy('allowMessages')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/10">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">{t("settings.dangerZone")}</CardTitle>
          </div>
          <CardDescription>{t("settings.dangerZoneDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">{t("settings.deleteAccount")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("settings.deleteAccountDesc")}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">{t("settings.delete")}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("settings.confirmDeleteTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.confirmDeleteDesc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                    {t("settings.confirmDelete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">{t("settings.logout")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("settings.logoutDesc")}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("nav.logout")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
