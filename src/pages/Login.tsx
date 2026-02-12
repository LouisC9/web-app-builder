// =========================
// Login Page (index.html equivalent)
// Form with id="loginForm", loginEmail, loginPassword, rememberMe, loginError
// =========================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Users, Star, Award } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Login Handler (simulated)
  // =========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate successful login
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* ========================= */}
      {/* Branded Gradient Panel */}
      {/* ========================= */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center items-center bg-gradient-to-br from-info via-purple to-warning/80 p-12 text-white">
        <div className="max-w-sm text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur text-2xl font-bold">
            SC
          </div>
          <h1 className="text-3xl font-bold">Student Co-curricular Management</h1>
          <p className="text-white/80 text-sm leading-relaxed">Track your events, clubs, merit hours, and achievements all in one place.</p>
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex flex-col items-center gap-1">
              <Calendar className="h-6 w-6 text-white/70" />
              <span className="text-xs text-white/60">Events</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users className="h-6 w-6 text-white/70" />
              <span className="text-xs text-white/60">Clubs</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Star className="h-6 w-6 text-white/70" />
              <span className="text-xs text-white/60">Merit</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="h-6 w-6 text-white/70" />
              <span className="text-xs text-white/60">Awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Login Form */}
      {/* ========================= */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {/* ========================= */}
            {/* Brand */}
            {/* ========================= */}
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground lg:hidden">
              SC
            </div>
            <CardTitle className="text-xl">Student Co-curricular System</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            {/* ========================= */}
            {/* Login Form */}
            {/* ========================= */}
            <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
              {/* ========================= */}
              {/* Error Container */}
              {/* ========================= */}
              {error && (
                <div id="loginError" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* ========================= */}
              {/* Email */}
              {/* ========================= */}
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="email"
                  type="email"
                  placeholder="you@student.edu.my"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* ========================= */}
              {/* Password */}
              {/* ========================= */}
              <div className="space-y-2">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* ========================= */}
              {/* Remember Me */}
              {/* ========================= */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  name="remember_me"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              {/* ========================= */}
              {/* Submit */}
              {/* ========================= */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            {/* ========================= */}
            {/* Register Link */}
            {/* ========================= */}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
