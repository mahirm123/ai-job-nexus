
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AdminHeader } from "@/components/dashboard/admin/AdminHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/ui/LanguageSwitcher";
import ProfileInfo from "@/components/dashboard/candidate/ProfileInfo";
import ProfileSettings from "@/components/dashboard/candidate/ProfileSettings";

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("info");
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <AdminHeader 
          title={t("profile.myProfile")}
          subtitle={t("profile.manageProfile")}
        />
        
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="info">{t("profile.information")}</TabsTrigger>
              <TabsTrigger value="settings">{t("profile.settings")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 p-4 pt-6">
              <ProfileInfo />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 p-4 pt-6">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
