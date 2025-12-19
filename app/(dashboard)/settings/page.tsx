"use client";

import { useState } from "react";
import { User, Settings, TriangleAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Profile } from "@/components/settings/profile";
import { Navbar } from "@/components/navbar";
import { Preferences } from "@/components/settings/preferences";
import  Account  from "@/components/settings/account";    

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileSave = (data: any) => {
    console.log("Profile saved:", data);
    // Add your save logic here
  };

  const handlePreferencesChange = (data: any) => {
    console.log("Preferences changed:", data);

  };

  const handleDeleteAccount = () => {
    console.log("Account deletion confirmed");

  };

  return (
    <div className="min-h-screen ">
        <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3  p-1 h-auto">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-muted-foreground"
            >
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-muted-foreground"
            >
              <Settings className="w-4 h-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-muted-foreground"
            >
              <TriangleAlert className="w-4 h-4" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Profile onSave={handleProfileSave} />
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Preferences onChange={handlePreferencesChange} />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Account  />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}