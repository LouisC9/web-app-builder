// =========================
// Topbar Component
// App title + search + notifications + theme toggle + user menu
// =========================

import { LogOut, Menu, Shield, User, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import GlobalSearch from "@/components/GlobalSearch";
import NotificationsCenter from "@/components/NotificationsCenter";
import ThemeToggle from "@/components/ThemeToggle";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { currentRole, setCurrentRole, currentUserName } = useRole();
  const navigate = useNavigate();

  // =========================
  // Handlers
  // =========================
  const handleLogout = () => {
    navigate("/");
  };

  const handleRoleSwitch = () => {
    setCurrentRole(currentRole === "student" ? "admin" : "student");
    navigate("/dashboard");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-4 shadow-sm">
      {/* ========================= */}
      {/* Sidebar Toggle */}
      {/* ========================= */}
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="shrink-0">
        <Menu className="h-5 w-5" />
      </Button>

      {/* ========================= */}
      {/* App Title */}
      {/* ========================= */}
      <h1 className="text-base font-semibold text-foreground truncate hidden md:block">
        Student Co-curricular System
      </h1>

      {/* ========================= */}
      {/* Global Search */}
      {/* ========================= */}
      <div className="ml-auto flex items-center gap-1.5">
        <GlobalSearch />

        {/* ========================= */}
        {/* Theme Toggle */}
        {/* ========================= */}
        <ThemeToggle />

        {/* ========================= */}
        {/* Notifications */}
        {/* ========================= */}
        <NotificationsCenter />

        {/* ========================= */}
        {/* Role Badge */}
        {/* ========================= */}
        <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {currentRole === "admin" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
          {currentRole === "admin" ? "Admin" : "Student"}
        </span>

        {/* ========================= */}
        {/* User Menu */}
        {/* ========================= */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {currentUserName.charAt(0)}
              </div>
              <span className="hidden md:inline text-sm">{currentUserName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleRoleSwitch} className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              Switch to {currentRole === "admin" ? "Student" : "Admin"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
