// =========================
// Merit Module Page (modules/merit.html equivalent)
// CRUD UI + Total Hours summary card
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
import { Pencil, Trash2, Plus, Clock } from "lucide-react";
import { demoMerits, meritCategoryOptions, CURRENT_USER_ID, type MeritRecord } from "@/data/demo-data";

const emptyForm = { activity_name: "", category: "", hours: "", date: "", description: "" };

const MeritPage = () => {
  const [records, setRecords] = useState<MeritRecord[]>(demoMerits.filter((m) => m.user_id === CURRENT_USER_ID));
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const totalHours = records.reduce((sum, m) => sum + m.hours, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = { ...form, hours: Number(form.hours) || 0 };
    if (editingId !== null) {
      setRecords((r) => r.map((rec) => rec.id === editingId ? { ...rec, ...record } : rec));
      setEditingId(null);
    } else {
      setRecords((r) => [...r, { id: Date.now(), user_id: CURRENT_USER_ID, ...record }]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (row: MeritRecord) => {
    setForm({ activity_name: row.activity_name, category: row.category, hours: String(row.hours), date: row.date, description: row.description });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (deleteId !== null) { setRecords((r) => r.filter((rec) => rec.id !== deleteId)); setDeleteId(null); }
  };

  const columns: ColumnDef<MeritRecord>[] = [
    { key: "activity_name" as keyof MeritRecord, label: "Activity" },
    { key: "category" as keyof MeritRecord, label: "Category" },
    { key: "hours" as keyof MeritRecord, label: "Hours" },
    { key: "date" as keyof MeritRecord, label: "Date" },
  ];

  const filters = meritCategoryOptions.map((c) => ({ label: c, value: c, filterFn: (item: MeritRecord) => item.category === c }));

  return (
    <div>
      <PageHeader title="Merit" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Merit" }]}>
        <Button className="bg-warning hover:bg-warning/90 text-warning-foreground" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}><Plus className="mr-1.5 h-4 w-4" /> Add Merit</Button>
      </PageHeader>

      {/* ========================= */}
      {/* Total Hours Summary */}
      {/* ========================= */}
      <Card className="mb-6 stat-card gradient-warning border-l-warning">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning-tint text-warning">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Merit Hours</p>
            <p id="meritTotalHours" className="text-2xl font-bold">{totalHours}</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingId ? "Edit Merit" : "Add Merit"}</DialogTitle><DialogDescription>{editingId ? "Update merit details." : "Fill in merit details."}</DialogDescription></DialogHeader>
          <form id="meritForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="meritActivityName">Activity Name</Label><Input id="meritActivityName" name="activity_name" value={form.activity_name} onChange={(e) => update("activity_name", e.target.value)} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meritCategory">Category</Label>
                <Select value={form.category} onValueChange={(v) => update("category", v)}>
                  <SelectTrigger id="meritCategory"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{meritCategoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="meritHours">Hours</Label><Input id="meritHours" name="hours" type="number" min="0" value={form.hours} onChange={(e) => update("hours", e.target.value)} required /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="meritDate">Date</Label><Input id="meritDate" name="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="meritDescription">Description</Label><Textarea id="meritDescription" name="description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit">{editingId ? "Update" : "Add"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete Merit</DialogTitle><DialogDescription>Are you sure? This cannot be undone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button><Button variant="destructive" onClick={handleDelete}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>

      <Card className="border-t-warning"><CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning inline-block"></span> Merit Records</CardTitle></CardHeader><CardContent>
        <DataTable idPrefix="merit" data={records as unknown as Record<string, unknown>[]} columns={columns as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["activity_name", "category"]} filters={filters} filterLabel="Category" actions={(row: any) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(row)}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        )} />
      </CardContent></Card>
    </div>
  );
};

export default MeritPage;
