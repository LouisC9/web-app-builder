// =========================
// User Details Page (admin/user-details.html equivalent)
// User profile card + Tabbed tables for Events/Clubs/Merit/Achievements
// =========================

import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import DataTable, { ColumnDef } from "@/components/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Hash } from "lucide-react";
import {
  demoUsers,
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  type EventRecord,
  type ClubRecord,
  type MeritRecord,
  type AchievementRecord,
} from "@/data/demo-data";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const user = demoUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">User not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/users")}>Back to Users</Button>
      </div>
    );
  }

  const userEvents = demoEvents.filter((e) => e.user_id === userId);
  const userClubs = demoClubs.filter((c) => c.user_id === userId);
  const userMerits = demoMerits.filter((m) => m.user_id === userId);
  const userAchievements = demoAchievements.filter((a) => a.user_id === userId);

  const eventCols: ColumnDef<EventRecord>[] = [
    { key: "event_name" as keyof EventRecord, label: "Event" },
    { key: "event_type" as keyof EventRecord, label: "Type" },
    { key: "event_date" as keyof EventRecord, label: "Date" },
    { key: "location" as keyof EventRecord, label: "Location" },
  ];
  const clubCols: ColumnDef<ClubRecord>[] = [
    { key: "club_name" as keyof ClubRecord, label: "Club" },
    { key: "role" as keyof ClubRecord, label: "Role" },
    { key: "join_date" as keyof ClubRecord, label: "Join Date" },
  ];
  const meritCols: ColumnDef<MeritRecord>[] = [
    { key: "activity_name" as keyof MeritRecord, label: "Activity" },
    { key: "category" as keyof MeritRecord, label: "Category" },
    { key: "hours" as keyof MeritRecord, label: "Hours" },
    { key: "date" as keyof MeritRecord, label: "Date" },
  ];
  const achievementCols: ColumnDef<AchievementRecord>[] = [
    { key: "title" as keyof AchievementRecord, label: "Title" },
    { key: "level" as keyof AchievementRecord, label: "Level" },
    { key: "date" as keyof AchievementRecord, label: "Date" },
    { key: "awarding_body" as keyof AchievementRecord, label: "Awarding Body" },
  ];

  return (
    <div>
      <PageHeader
        title="User Details"
        breadcrumbs={[{ label: "Admin" }, { label: "Users", href: "/admin/users" }, { label: user.full_name }]}
      >
        <Button variant="outline" onClick={() => navigate("/admin/users")}><ArrowLeft className="mr-1.5 h-4 w-4" /> Back</Button>
      </PageHeader>

      {/* ========================= */}
      {/* User Profile Card */}
      {/* ========================= */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user.full_name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{user.full_name}</h3>
            <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Hash className="h-3.5 w-3.5" />{user.student_id}</span>
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{user.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-xl font-bold">{user.total_events}</p><p className="text-xs text-muted-foreground">Events</p></div>
            <div><p className="text-xl font-bold">{user.total_clubs}</p><p className="text-xs text-muted-foreground">Clubs</p></div>
            <div><p className="text-xl font-bold">{user.total_merit_hours}</p><p className="text-xs text-muted-foreground">Hours</p></div>
            <div><p className="text-xl font-bold">{user.total_achievements}</p><p className="text-xs text-muted-foreground">Awards</p></div>
          </div>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Tabbed Records */}
      {/* ========================= */}
      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events ({userEvents.length})</TabsTrigger>
          <TabsTrigger value="clubs">Clubs ({userClubs.length})</TabsTrigger>
          <TabsTrigger value="merit">Merit ({userMerits.length})</TabsTrigger>
          <TabsTrigger value="achievements">Achievements ({userAchievements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card><CardContent className="pt-6">
            <DataTable idPrefix="adminUserEvent" data={userEvents as unknown as Record<string, unknown>[]} columns={eventCols as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["event_name", "event_type"]} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="clubs">
          <Card><CardContent className="pt-6">
            <DataTable idPrefix="adminUserClub" data={userClubs as unknown as Record<string, unknown>[]} columns={clubCols as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["club_name", "role"]} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="merit">
          <Card><CardContent className="pt-6">
            <DataTable idPrefix="adminUserMerit" data={userMerits as unknown as Record<string, unknown>[]} columns={meritCols as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["activity_name", "category"]} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card><CardContent className="pt-6">
            <DataTable idPrefix="adminUserAchievement" data={userAchievements as unknown as Record<string, unknown>[]} columns={achievementCols as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["title", "level"]} />
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetailsPage;
