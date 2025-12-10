"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface PreferencesData {
  currency: string;
  emailNotifications: boolean;
}

interface PreferencesProps {
  data?: PreferencesData;
  onChange?: (data: PreferencesData) => void;
}

export function Preferences({ data, onChange }: PreferencesProps) {
  const [currency, setCurrency] = useState(data?.currency || "USD");
  const [emailNotifications, setEmailNotifications] = useState(
    data?.emailNotifications ?? true
  );

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    onChange?.({ currency: value, emailNotifications });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    onChange?.({ currency, emailNotifications: checked });
  };

  return (
    <Card className="p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
        App Preferences
      </h2>

      <div className="space-y-8">
        <div>
          <Label htmlFor="currency" className="mb-3 block text-base font-medium">
            Currency
          </Label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="CAD">Canadian Dollar (CAD)</option>
            <option value="AUD">Australian Dollar (AUD)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium text-base text-gray-900 dark:text-white mb-1">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about transactions
              </p>
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={handleNotificationsChange}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </div>
    </Card>
  );
}