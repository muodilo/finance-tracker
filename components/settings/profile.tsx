"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
}

interface ProfileProps {
  data?: ProfileData;
  onSave?: (data: ProfileData) => void;
}

export function Profile({ data, onSave }: ProfileProps) {
  const [fullName, setFullName] = useState(data?.fullName || "Google User");
  const [email, setEmail] = useState(data?.email || "user@google.com");

  const handleSave = () => {
    onSave?.({ fullName, email });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Profile Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="mb-2 block">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Password
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change your password
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
}