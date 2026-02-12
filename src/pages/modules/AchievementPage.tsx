// =========================
// Achievement Module Page (modules/achievement.html equivalent)
// CRUD UI with certificate upload (UI only)
// =========================

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import DataTable, { ColumnDef } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { demoAchievements, achievementLevelOptions, CURRENT_USER_ID, type AchievementRecord } from "@/data/demo-data";

const emptyForm = { title: "", level: "", date: "", awarding_body: "", certificate_file: "", description: "" };

const AchievementPage = () => {
  const [records, setRecords] = useState<AchievementRecord[]>(demoAchievements.filter((a) => a.user_id === CURRENT_USER_ID));
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setRecords((r) => r.map((rec) => rec.id === editingId ? { ...rec, ...form } : rec));
      setEditingId(null);
    } else {
      setRecords((r) => [...r, { id: Date.now(), user_id: CURRENT_USER_ID, ...form }]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (row: AchievementRecord) => {
    setForm({ title: row.title, level: row.level, date: row.date, awarding_body: row.awarding_body, certificate_file: row.certificate_file, description: row.description });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (deleteId !== null) { setRecords((r) => r.filter((rec) => rec.id !== deleteId)); setDeleteId(null); }
  };

  const columns: ColumnDef<AchievementRecord>[] = [
    { key: "title" as keyof AchievementRecord, label: "Title" },
    { key: "level" as keyof AchievementRecord, label: "Level" },
    { key: "date" as keyof AchievementRecord, label: "Date" },
    { key: "awarding_body" as keyof AchievementRecord, label: "Awarding Body" },
  ];

  const filters = achievementLevelOptions.map((l) => ({ label: l, value: l, filterFn: (item: AchievementRecord) => item.level === l }));

  return (
    <div>
      <PageHeader title="Achievements" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Achievements" }]}>
        <Button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}><Plus className="mr-1.5 h-4 w-4" /> Add Achievement</Button>
      </PageHeader>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingId ? "Edit Achievement" : "Add Achievement"}</DialogTitle><DialogDescription>{editingId ? "Update achievement details." : "Fill in achievement details."}</DialogDescription></DialogHeader>
          <form id="achievementForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="achievementTitle">Title</Label><Input id="achievementTitle" name="title" value={form.title} onChange={(e) => update("title", e.target.value)} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="achievementLevel">Level</Label>
                <Select value={form.level} onValueChange={(v) => update("level", v)}>
                  <SelectTrigger id="achievementLevel"><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>{achievementLevelOptions.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="achievementDate">Date</Label><Input id="achievementDate" name="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="achievementAwardingBody">Awarding Body</Label><Input id="achievementAwardingBody" name="awarding_body" value={form.awarding_body} onChange={(e) => update("awarding_body", e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="achievementCertificate">Certificate (file upload)</Label><Input id="achievementCertificate" name="certificate_file" type="file" accept=".pdf,.jpg,.png" /></div>
            <div className="space-y-2"><Label htmlFor="achievementDescription">Description</Label><Textarea id="achievementDescription" name="description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit">{editingId ? "Update" : "Add"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete Achievement</DialogTitle><DialogDescription>Are you sure? This cannot be undone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button><Button variant="destructive" onClick={handleDelete}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>

      <Card><CardHeader><CardTitle>Achievement Records</CardTitle></CardHeader><CardContent>
        <DataTable idPrefix="achievement" data={records as unknown as Record<string, unknown>[]} columns={columns as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["title", "level", "awarding_body"]} filters={filters} filterLabel="Level" actions={(row: any) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(row)}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        )} />
      </CardContent></Card>
    </div>
  );
};

export default AchievementPage;
