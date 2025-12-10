"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { TrendingUp, User, Mail, Lock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { signup, login } = useAuth();
  
  // Sign Up State
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  // Sign In State
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(signupData.email, signupData.password, signupData.fullName);
      router.push("/dashboard"); // Redirect to dashboard after signup
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(signinData.email, signinData.password);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white dark:bg-slate-950">
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
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signup" className="w-full" onValueChange={() => setError("")}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-slate-800">
              <TabsTrigger value="signin" className="text-gray-600 dark:text-gray-400">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-900 dark:text-white">
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6">
              <form onSubmit={handleSignin} className="space-y-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                      value={signinData.email}
                      onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                      required
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
                      value={signinData.password}
                      onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 h-10 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
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
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
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
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 h-10 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
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