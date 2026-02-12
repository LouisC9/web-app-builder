// =========================
// Role Context — Simulates user authentication role
// currentRole = "student" | "admin"
// =========================

import React, { createContext, useContext, useState, type ReactNode } from "react";

type Role = "student" | "admin";

interface RoleContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUserName: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<Role>("student");

  // =========================
  // Simulated logged-in user name
  // =========================
  const currentUserName =
    currentRole === "admin" ? "Dr. Razak bin Othman" : "Ahmad Faiz bin Razali";

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, currentUserName }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
