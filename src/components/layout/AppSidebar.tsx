// =========================
// AppSidebar Component
// Navigation links — role-based visibility
// =========================

import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Award,
  Star,
  ShieldCheck,
  UserCog,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AppSidebarProps {
  collapsed: boolean;
}

// =========================
// Nav Item Type
// =========================
interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  iconColor?: string;
  activeAccent?: string;
}

// =========================
// Nav Groups
// =========================
const mainItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
];

const moduleItems: NavItem[] = [
  { title: "Events", url: "/modules/event", icon: Calendar, iconColor: "text-info", activeAccent: "border-l-info" },
  { title: "Clubs", url: "/modules/club", icon: Users, iconColor: "text-success", activeAccent: "border-l-success" },
  { title: "Merit", url: "/modules/merit", icon: Star, iconColor: "text-warning", activeAccent: "border-l-warning" },
  { title: "Achievements", url: "/modules/achievement", icon: Award, iconColor: "text-purple", activeAccent: "border-l-purple" },
];

const adminItems: NavItem[] = [
  { title: "Admin Dashboard", url: "/admin/dashboard", icon: ShieldCheck },
  { title: "Users", url: "/admin/users", icon: UserCog },
];

const AppSidebar = ({ collapsed }: AppSidebarProps) => {
  const { currentRole } = useRole();
  const location = useLocation();
  const [modulesOpen, setModulesOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  // =========================
  // Render Nav Link
  // =========================
  const renderNavItem = (item: NavItem) => (
    <NavLink
      key={item.url}
      to={item.url}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-150",
        isActive(item.url)
          ? `bg-sidebar-accent text-sidebar-primary font-medium ${item.activeAccent || ""}`
          : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className={cn("h-4 w-4 shrink-0", item.iconColor && !isActive(item.url) ? item.iconColor : "")} />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </NavLink>
  );

  // =========================
  // Render Group Header
  // =========================
  const renderGroupHeader = (
    label: string,
    open: boolean,
    onToggle: () => void
  ) => {
    if (collapsed) return null;
    return (
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50"
      >
        {label}
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* ========================= */}
      {/* Logo / Brand */}
      {/* ========================= */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
          SC
        </div>
        {!collapsed && (
          <span className="ml-3 text-sm font-semibold text-sidebar-foreground truncate">
            SCMS
          </span>
        )}
      </div>

      {/* ========================= */}
      {/* Navigation */}
      {/* ========================= */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {/* Main */}
        {mainItems.map(renderNavItem)}

        {/* Modules */}
        <div className="mt-4">
          {renderGroupHeader("Modules", modulesOpen, () => setModulesOpen(!modulesOpen))}
          {(modulesOpen || collapsed) && (
            <div className="mt-1 space-y-0.5">
              {moduleItems.map(renderNavItem)}
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* Admin Links (role-based) */}
        {/* ========================= */}
        {currentRole === "admin" && (
          <div className="mt-4">
            {renderGroupHeader("Admin", adminOpen, () => setAdminOpen(!adminOpen))}
            {(adminOpen || collapsed) && (
              <div className="mt-1 space-y-0.5">
                {adminItems.map(renderNavItem)}
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default AppSidebar;
