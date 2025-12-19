"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Account() {
  return (
    <Card className="border-red-200 bg-red-50/60 dark:bg-red-50/20 rounded-2xl shadow-sm p-6 w-full">
      <CardContent className="p-0 flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-red-700">Delete Account</p>
            <p className="text-sm text-red-600">This action cannot be undone</p>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-2">
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
