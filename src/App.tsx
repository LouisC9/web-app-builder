import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";

// =========================
// Pages
// =========================
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventPage from "./pages/modules/EventPage";
import ClubPage from "./pages/modules/ClubPage";
import MeritPage from "./pages/modules/MeritPage";
import AchievementPage from "./pages/modules/AchievementPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import NotFound from "./pages/NotFound";

// =========================
// Layout
// =========================
import DashboardLayout from "@/components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ========================= */}
            {/* Auth Pages (no layout) */}
            {/* ========================= */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ========================= */}
            {/* Dashboard Layout Pages */}
            {/* ========================= */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Module Pages */}
              <Route path="/modules/event" element={<EventPage />} />
              <Route path="/modules/club" element={<ClubPage />} />
              <Route path="/modules/merit" element={<MeritPage />} />
              <Route path="/modules/achievement" element={<AchievementPage />} />

              {/* Admin Pages */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/user-details/:id" element={<UserDetailsPage />} />
            </Route>

            {/* ========================= */}
            {/* Catch-all */}
            {/* ========================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
