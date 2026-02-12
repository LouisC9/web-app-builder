// =========================
// Form Validation Utilities
// Required, email, password match checks
// =========================

export interface ValidationError {
  field: string;
  message: string;
}

// =========================
// Required Field Check
// =========================
export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || !value.trim()) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  return null;
}

// =========================
// Email Format Check
// =========================
export function validateEmail(value: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return { field: "email", message: "Please enter a valid email address" };
  }
  return null;
}

// =========================
// Password Match Check
// =========================
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationError | null {
  if (password !== confirmPassword) {
    return { field: "confirm_password", message: "Passwords do not match" };
  }
  return null;
}

// =========================
// Password Strength Check
// =========================
export function validatePasswordStrength(password: string): ValidationError | null {
  if (password.length < 6) {
    return { field: "password", message: "Password must be at least 6 characters" };
  }
  return null;
}
