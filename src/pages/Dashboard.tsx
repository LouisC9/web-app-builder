// =========================
// Student Dashboard (dashboard.html equivalent)
// Overview cards: events, clubs, merit hours, achievements
// =========================

import { Calendar, Users, Star, Award } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  CURRENT_USER_ID,
} from "@/data/demo-data";

const Dashboard = () => {
  // =========================
  // Calculate user stats
  // =========================
  const myEvents = demoEvents.filter((e) => e.user_id === CURRENT_USER_ID);
  const myClubs = demoClubs.filter((c) => c.user_id === CURRENT_USER_ID);
  const myMerits = demoMerits.filter((m) => m.user_id === CURRENT_USER_ID);
  const myAchievements = demoAchievements.filter((a) => a.user_id === CURRENT_USER_ID);
  const totalHours = myMerits.reduce((sum, m) => sum + m.hours, 0);

  const stats = [
    { label: "Events", value: myEvents.length, icon: Calendar, color: "text-info", bgTint: "bg-info-tint", borderClass: "border-l-info" },
    { label: "Clubs", value: myClubs.length, icon: Users, color: "text-success", bgTint: "bg-success-tint", borderClass: "border-l-success" },
    { label: "Merit Hours", value: totalHours, icon: Star, color: "text-warning", bgTint: "bg-warning-tint", borderClass: "border-l-warning" },
    { label: "Achievements", value: myAchievements.length, icon: Award, color: "text-purple", bgTint: "bg-purple-tint", borderClass: "border-l-purple" },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* ========================= */}
      {/* Welcome Banner */}
      {/* ========================= */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-info/10 via-purple/5 to-warning/10 border border-info/20 p-6 animate-fade-in-up">
        <h2 className="text-xl font-bold text-foreground">Welcome back! 👋</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here's a summary of your co-curricular activities.</p>
      </div>

      {/* ========================= */}
      {/* Summary Cards */}
      {/* ========================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <Card key={s.label} className={`stat-card ${s.borderClass} animate-fade-in-up animate-delay-${idx + 1}`}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.bgTint} ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========================= */}
      {/* Recent Activity */}
      {/* ========================= */}
      <Card className="mt-6 animate-fade-in-up animate-delay-4">
        <CardContent className="p-5">
          <h3 className="mb-3 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {myEvents.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-md bg-muted/50 p-3 border-l-info">
                <Calendar className="h-4 w-4 text-info" />
                <div>
                  <p className="text-sm font-medium">{e.event_name}</p>
                  <p className="text-xs text-muted-foreground">{e.event_type} · {e.event_date}</p>
                </div>
              </div>
            ))}
            {myAchievements.slice(0, 2).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-md bg-muted/50 p-3 border-l-purple">
                <Award className="h-4 w-4 text-purple" />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.level} · {a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
