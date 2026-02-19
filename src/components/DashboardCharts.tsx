// =========================
// DashboardCharts Component
// Pie chart, bar chart, and merit progress bar
// =========================

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  CURRENT_USER_ID,
} from "@/data/demo-data";

const MERIT_GOAL = 40;

const COLORS = [
  "hsl(199, 89%, 48%)",  // info - events
  "hsl(142, 60%, 40%)",  // success - clubs
  "hsl(38, 92%, 50%)",   // warning - merit
  "hsl(270, 60%, 55%)",  // purple - achievements
];

const DashboardCharts = () => {
  const myEvents = demoEvents.filter((e) => e.user_id === CURRENT_USER_ID);
  const myClubs = demoClubs.filter((c) => c.user_id === CURRENT_USER_ID);
  const myMerits = demoMerits.filter((m) => m.user_id === CURRENT_USER_ID);
  const myAchievements = demoAchievements.filter((a) => a.user_id === CURRENT_USER_ID);
  const totalHours = myMerits.reduce((sum, m) => sum + m.hours, 0);
  const progressPercent = Math.min((totalHours / MERIT_GOAL) * 100, 100);

  // =========================
  // Pie Chart Data
  // =========================
  const pieData = [
    { name: "Events", value: myEvents.length },
    { name: "Clubs", value: myClubs.length },
    { name: "Merit", value: myMerits.length },
    { name: "Achievements", value: myAchievements.length },
  ];

  // =========================
  // Bar Chart Data — monthly activity
  // =========================
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const barData = months.map((month, idx) => {
    const m = String(idx + 1).padStart(2, "0");
    return {
      month,
      Events: myEvents.filter((e) => e.event_date.split("-")[1] === m).length,
      Clubs: myClubs.filter((c) => c.join_date.split("-")[1] === m).length,
      Merit: myMerits.filter((mr) => mr.date.split("-")[1] === m).length,
      Achievements: myAchievements.filter((a) => a.date.split("-")[1] === m).length,
    };
  });

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* ========================= */}
      {/* Activity Breakdown Pie */}
      {/* ========================= */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-base">Activity Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Monthly Activity Trends */}
      {/* ========================= */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-base">Monthly Activity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Events" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Clubs" fill={COLORS[1]} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Merit" fill={COLORS[2]} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Achievements" fill={COLORS[3]} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Merit Hours Progress */}
      {/* ========================= */}
      <Card className="lg:col-span-2 animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-base">Merit Hours Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {totalHours} / {MERIT_GOAL} hours
              </span>
              <span className="font-semibold text-warning">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 [&>div]:bg-warning" />
            <p className="text-xs text-muted-foreground">
              {totalHours >= MERIT_GOAL
                ? "🎉 Congratulations! You've reached your merit hours goal!"
                : `${MERIT_GOAL - totalHours} more hours to reach your goal.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
