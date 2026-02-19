// =========================
// DashboardLayout Component
// Wraps pages with Topbar + Sidebar + Main content area
// Mobile: sidebar as Sheet overlay; Desktop: collapsible sidebar
// =========================

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* ========================= */}
      {/* Desktop Sidebar */}
      {/* ========================= */}
      {!isMobile && <AppSidebar collapsed={sidebarCollapsed} />}

      {/* ========================= */}
      {/* Mobile Sidebar (Sheet) */}
      {/* ========================= */}
      {isMobile && (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-60 p-0">
            <AppSidebar collapsed={false} onClose={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      {/* ========================= */}
      {/* Main Area */}
      {/* ========================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ========================= */}
        {/* Topbar */}
        {/* ========================= */}
        <Topbar onToggleSidebar={handleToggle} />

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
