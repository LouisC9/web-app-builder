// =========================
// NotificationsCenter Component
// Bell icon with dropdown showing activity alerts
// =========================

import { useState } from "react";
import { Bell, Calendar, Star, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  demoEvents,
  demoMerits,
  demoAchievements,
  CURRENT_USER_ID,
} from "@/data/demo-data";

interface Notification {
  id: string;
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
}

const NotificationsCenter = () => {
  // =========================
  // Generate notifications from data
  // =========================
  const generateNotifications = (): Notification[] => {
    const notifs: Notification[] = [];

    // Upcoming events (future dates)
    demoEvents
      .filter((e) => e.user_id === CURRENT_USER_ID && e.event_date >= new Date().toISOString().split("T")[0])
      .slice(0, 2)
      .forEach((e) => {
        notifs.push({
          id: `ev-${e.id}`,
          icon: Calendar,
          color: "text-info",
          title: "Upcoming Event",
          description: `${e.event_name} on ${e.event_date}`,
        });
      });

    // Merit milestone
    const totalHours = demoMerits.filter((m) => m.user_id === CURRENT_USER_ID).reduce((s, m) => s + m.hours, 0);
    if (totalHours >= 20) {
      notifs.push({
        id: "merit-milestone",
        icon: Star,
        color: "text-warning",
        title: "Merit Milestone!",
        description: `You've reached ${totalHours} merit hours!`,
      });
    }

    // Recent achievements
    demoAchievements
      .filter((a) => a.user_id === CURRENT_USER_ID)
      .slice(0, 1)
      .forEach((a) => {
        notifs.push({
          id: `ach-${a.id}`,
          icon: Award,
          color: "text-purple",
          title: "Achievement Earned",
          description: a.title,
        });
      });

    return notifs;
  };

  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications);
  const [open, setOpen] = useState(false);

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative shrink-0">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            All caught up! 🎉
          </div>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.id} className="flex items-start gap-3 border-b px-4 py-3 last:border-0 hover:bg-accent/50 transition-colors">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${n.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{n.description}</p>
                  </div>
                  <button onClick={() => dismiss(n.id)} className="shrink-0 rounded p-0.5 hover:bg-muted">
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsCenter;
