// =========================
// Admin Dashboard (admin/admin-dashboard.html equivalent)
// Summary cards + Top Active Users table
// =========================

import { Calendar, Users, Star, Award, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoUsers, demoEvents, demoClubs, demoMerits, demoAchievements } from "@/data/demo-data";

const AdminDashboard = () => {
  const totalUsers = demoUsers.filter((u) => u.role === "student").length;
  const totalEvents = demoEvents.length;
  const totalClubs = demoClubs.length;
  const totalMerits = demoMerits.length;
  const totalAchievements = demoAchievements.length;

  const stats = [
    { id: "adminTotalUsers", label: "Total Users", value: totalUsers, icon: Users, color: "text-primary" },
    { id: "adminTotalEvents", label: "Total Events", value: totalEvents, icon: Calendar, color: "text-info" },
    { id: "adminTotalClubs", label: "Total Clubs", value: totalClubs, icon: Users, color: "text-success" },
    { id: "adminTotalMerits", label: "Total Merits", value: totalMerits, icon: Star, color: "text-warning" },
    { id: "adminTotalAchievements", label: "Total Achievements", value: totalAchievements, icon: Award, color: "text-destructive" },
  ];

  // =========================
  // Top Active Users (sorted by total activities)
  // =========================
  const topUsers = demoUsers
    .filter((u) => u.role === "student")
    .map((u) => ({ ...u, total: u.total_events + u.total_clubs + u.total_merits + u.total_achievements }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Admin Dashboard" breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]} />

      {/* ========================= */}
      {/* Summary Cards */}
      {/* ========================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.id} className="stat-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-muted ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p id={s.id} className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========================= */}
      {/* Top Active Users */}
      {/* ========================= */}
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Top Active Users</CardTitle></CardHeader>
        <CardContent>
          <Table id="adminTopUsersTable">
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Clubs</TableHead>
                <TableHead>Merits</TableHead>
                <TableHead>Achievements</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-xs">{u.student_id}</TableCell>
                  <TableCell className="font-medium">{u.full_name}</TableCell>
                  <TableCell>{u.total_events}</TableCell>
                  <TableCell>{u.total_clubs}</TableCell>
                  <TableCell>{u.total_merits}</TableCell>
                  <TableCell>{u.total_achievements}</TableCell>
                  <TableCell className="font-bold">{u.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
