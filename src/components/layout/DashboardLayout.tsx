// =========================
// DashboardLayout Component
// Wraps pages with Topbar + Sidebar + Main content area
// =========================

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ========================= */}
      {/* Sidebar */}
      {/* ========================= */}
      <AppSidebar collapsed={sidebarCollapsed} />

      {/* ========================= */}
      {/* Main Area */}
      {/* ========================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ========================= */}
        {/* Topbar */}
        {/* ========================= */}
        <Topbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* ========================= */}
        {/* Page Content */}
        {/* ========================= */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
