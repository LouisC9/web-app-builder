// =========================
// ActivityTimeline Component
// Chronological feed of all activities
// =========================

import { Calendar, Users, Star, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  CURRENT_USER_ID,
} from "@/data/demo-data";

interface TimelineItem {
  id: string;
  name: string;
  type: string;
  category: "event" | "club" | "merit" | "achievement";
  date: string;
}

const iconMap = {
  event: Calendar,
  club: Users,
  merit: Star,
  achievement: Award,
};

const colorMap = {
  event: { dot: "bg-info", text: "text-info" },
  club: { dot: "bg-success", text: "text-success" },
  merit: { dot: "bg-warning", text: "text-warning" },
  achievement: { dot: "bg-purple", text: "text-purple" },
};

const ActivityTimeline = ({ limit = 8 }: { limit?: number }) => {
  // =========================
  // Build unified timeline
  // =========================
  const items: TimelineItem[] = [
    ...demoEvents
      .filter((e) => e.user_id === CURRENT_USER_ID)
      .map((e) => ({ id: `ev-${e.id}`, name: e.event_name, type: e.event_type, category: "event" as const, date: e.event_date })),
    ...demoClubs
      .filter((c) => c.user_id === CURRENT_USER_ID)
      .map((c) => ({ id: `cl-${c.id}`, name: c.club_name, type: c.role, category: "club" as const, date: c.join_date })),
    ...demoMerits
      .filter((m) => m.user_id === CURRENT_USER_ID)
      .map((m) => ({ id: `mr-${m.id}`, name: m.activity_name, type: m.category, category: "merit" as const, date: m.date })),
    ...demoAchievements
      .filter((a) => a.user_id === CURRENT_USER_ID)
      .map((a) => ({ id: `ac-${a.id}`, name: a.title, type: a.level, category: "achievement" as const, date: a.date })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);

  return (
    <Card className="mt-6 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-base">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

          {items.map((item) => {
            const Icon = iconMap[item.category];
            const colors = colorMap[item.category];
            return (
              <div key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
                {/* Dot */}
                <div className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${colors.dot}`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className={`font-medium ${colors.text}`}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                    {" · "}
                    {item.type}
                    {" · "}
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
