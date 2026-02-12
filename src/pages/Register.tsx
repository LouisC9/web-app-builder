// =========================
// Register Page (register.html equivalent)
// Form with id="registerForm", regFullName, regStudentId, regEmail, regPassword, regConfirmPassword, registerError
// =========================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  validateRequired,
  validateEmail,
  validatePasswordMatch,
  validatePasswordStrength,
} from "@/utils/form-validation";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    student_id: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  // =========================
  // Register Handler (simulated)
  // =========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    const requiredFields = [
      { value: form.full_name, name: "Full Name" },
      { value: form.student_id, name: "Student ID" },
      { value: form.email, name: "Email" },
      { value: form.password, name: "Password" },
      { value: form.confirm_password, name: "Confirm Password" },
    ];

    for (const field of requiredFields) {
      const err = validateRequired(field.value, field.name);
      if (err) { setError(err.message); return; }
    }

    const emailErr = validateEmail(form.email);
    if (emailErr) { setError(emailErr.message); return; }

    const pwErr = validatePasswordStrength(form.password);
    if (pwErr) { setError(pwErr.message); return; }

    const matchErr = validatePasswordMatch(form.password, form.confirm_password);
    if (matchErr) { setError(matchErr.message); return; }

    // Simulate successful registration
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            SC
          </div>
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Register for the Student Co-curricular System</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ========================= */}
          {/* Register Form */}
          {/* ========================= */}
          <form id="registerForm" onSubmit={handleSubmit} className="space-y-4">
            {/* Error Container */}
            {error && (
              <div id="registerError" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="regFullName">Full Name</Label>
              <Input id="regFullName" name="full_name" placeholder="Ahmad Faiz bin Razali" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regStudentId">Student ID</Label>
              <Input id="regStudentId" name="student_id" placeholder="STU001" value={form.student_id} onChange={(e) => update("student_id", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regEmail">Email</Label>
              <Input id="regEmail" name="email" type="email" placeholder="you@student.edu.my" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regPassword">Password</Label>
              <Input id="regPassword" name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regConfirmPassword">Confirm Password</Label>
              <Input id="regConfirmPassword" name="confirm_password" type="password" placeholder="Re-enter password" value={form.confirm_password} onChange={(e) => update("confirm_password", e.target.value)} />
            </div>

            <Button type="submit" className="w-full">Register</Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="text-primary hover:underline">Sign In</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
