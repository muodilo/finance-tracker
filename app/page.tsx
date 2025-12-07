import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { TrendingUp, User, Mail, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center  bg-white dark:bg-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start px-6 md:px-16 lg:px-32 py-16 w-full">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            </div>
            
            <h1 className="text-5xl text-center font-bold text-gray-900 dark:text-white mb-6">
              Manage Your Money
            </h1>
            <p className="text-gray-500 text-xl dark:text-gray-400 leading-relaxed mb-8">
              Track expenses, visualize spending patterns, and take control of your finances with our intuitive personal finance tracker.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time expense tracking",
                "Smart analytics & insights",
                "Export & backup your data",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-md">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-slate-800">
              <TabsTrigger value="signin" className="text-gray-600 dark:text-gray-400">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-900 dark:text-white">
                Create Account <span className="text-red-500 ml-1">*</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 h-10 rounded-lg">
                Sign In
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form className="space-y-6">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 h-10 rounded-lg">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-8">
            By signing up, you agree to our{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
