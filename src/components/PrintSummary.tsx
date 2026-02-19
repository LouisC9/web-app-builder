// =========================
// PrintSummary Component
// Print-friendly transcript dialog
// =========================

import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  demoUsers,
  CURRENT_USER_ID,
} from "@/data/demo-data";

interface PrintSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrintSummary = ({ open, onOpenChange }: PrintSummaryProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const user = demoUsers.find((u) => u.id === CURRENT_USER_ID);
  const myEvents = demoEvents.filter((e) => e.user_id === CURRENT_USER_ID);
  const myClubs = demoClubs.filter((c) => c.user_id === CURRENT_USER_ID);
  const myMerits = demoMerits.filter((m) => m.user_id === CURRENT_USER_ID);
  const myAchievements = demoAchievements.filter((a) => a.user_id === CURRENT_USER_ID);
  const totalHours = myMerits.reduce((sum, m) => sum + m.hours, 0);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Co-curricular Transcript</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1a1a1a; }
        h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 8px; }
        h2 { font-size: 16px; margin-top: 24px; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
        th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
        th { background: #f5f5f5; font-weight: 600; }
        .info { margin: 4px 0; font-size: 14px; }
        .summary { display: flex; gap: 24px; margin-top: 12px; }
        .summary-item { background: #f8f8f8; padding: 12px 16px; border-radius: 6px; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Co-curricular Transcript</DialogTitle>
          <DialogDescription>Preview and print your complete activity summary.</DialogDescription>
        </DialogHeader>

        <div ref={printRef}>
          <h1>Co-curricular Transcript</h1>
          <p className="info"><strong>Name:</strong> {user.full_name}</p>
          <p className="info"><strong>Student ID:</strong> {user.student_id}</p>
          <p className="info"><strong>Email:</strong> {user.email}</p>

          <h2>Events ({myEvents.length})</h2>
          <table>
            <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Location</th></tr></thead>
            <tbody>
              {myEvents.map((e) => (
                <tr key={e.id}><td>{e.event_name}</td><td>{e.event_type}</td><td>{e.event_date}</td><td>{e.location}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Clubs ({myClubs.length})</h2>
          <table>
            <thead><tr><th>Club</th><th>Role</th><th>Join Date</th><th>End Date</th></tr></thead>
            <tbody>
              {myClubs.map((c) => (
                <tr key={c.id}><td>{c.club_name}</td><td>{c.role}</td><td>{c.join_date}</td><td>{c.end_date || "Present"}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Merit Hours ({totalHours} total hours)</h2>
          <table>
            <thead><tr><th>Activity</th><th>Category</th><th>Hours</th><th>Date</th></tr></thead>
            <tbody>
              {myMerits.map((m) => (
                <tr key={m.id}><td>{m.activity_name}</td><td>{m.category}</td><td>{m.hours}</td><td>{m.date}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Achievements ({myAchievements.length})</h2>
          <table>
            <thead><tr><th>Title</th><th>Level</th><th>Date</th><th>Awarding Body</th></tr></thead>
            <tbody>
              {myAchievements.map((a) => (
                <tr key={a.id}><td>{a.title}</td><td>{a.level}</td><td>{a.date}</td><td>{a.awarding_body}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintSummary;
