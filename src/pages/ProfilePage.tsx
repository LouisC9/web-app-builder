// =========================
// Student Profile Page
// Personal info, stats, activity timeline, export
// =========================

import { useState } from "react";
import { Calendar, Users, Star, Award, Printer } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityTimeline from "@/components/ActivityTimeline";
import PrintSummary from "@/components/PrintSummary";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  demoUsers,
  CURRENT_USER_ID,
} from "@/data/demo-data";

const ProfilePage = () => {
  const [showPrint, setShowPrint] = useState(false);
  const user = demoUsers.find((u) => u.id === CURRENT_USER_ID);
  const myEvents = demoEvents.filter((e) => e.user_id === CURRENT_USER_ID);
  const myClubs = demoClubs.filter((c) => c.user_id === CURRENT_USER_ID);
  const myMerits = demoMerits.filter((m) => m.user_id === CURRENT_USER_ID);
  const myAchievements = demoAchievements.filter((a) => a.user_id === CURRENT_USER_ID);
  const totalHours = myMerits.reduce((sum, m) => sum + m.hours, 0);

  if (!user) return null;

  const stats = [
    { label: "Events", value: myEvents.length, icon: Calendar, color: "text-info", bgTint: "bg-info-tint" },
    { label: "Clubs", value: myClubs.length, icon: Users, color: "text-success", bgTint: "bg-success-tint" },
    { label: "Merit Hours", value: totalHours, icon: Star, color: "text-warning", bgTint: "bg-warning-tint" },
    { label: "Achievements", value: myAchievements.length, icon: Award, color: "text-purple", bgTint: "bg-purple-tint" },
  ];

  return (
    <div>
      <PageHeader
        title="My Profile"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]}
      >
        <Button variant="outline" onClick={() => setShowPrint(true)}>
          <Printer className="mr-1.5 h-4 w-4" /> Export Summary
        </Button>
      </PageHeader>

      {/* ========================= */}
      {/* Profile Card */}
      {/* ========================= */}
      <Card className="mb-6 animate-fade-in-up">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user.full_name.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">{user.full_name}</h2>
            <p className="text-sm text-muted-foreground">{user.student_id}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Stat Cards */}
      {/* ========================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="stat-card animate-fade-in-up">
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
      {/* Activity Timeline */}
      {/* ========================= */}
      <ActivityTimeline limit={12} />

      {/* ========================= */}
      {/* Print Dialog */}
      {/* ========================= */}
      <PrintSummary open={showPrint} onOpenChange={setShowPrint} />
    </div>
  );
};

export default ProfilePage;
