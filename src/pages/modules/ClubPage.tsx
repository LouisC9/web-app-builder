// =========================
// Club Module Page (modules/club.html equivalent)
// CRUD UI: Add form + Records table + Edit/Delete modals
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
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import { demoClubs, clubRoleOptions, CURRENT_USER_ID, type ClubRecord } from "@/data/demo-data";
import { toast } from "sonner";

const emptyForm = { club_name: "", role: "", join_date: "", end_date: "", description: "" };

const ClubPage = () => {
  const [records, setRecords] = useState<ClubRecord[]>(demoClubs.filter((c) => c.user_id === CURRENT_USER_ID));
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
      toast.success("Club updated successfully");
    } else {
      setRecords((r) => [...r, { id: Date.now(), user_id: CURRENT_USER_ID, ...form }]);
      toast.success("Club added successfully");
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (row: ClubRecord) => {
    setForm({ club_name: row.club_name, role: row.role, join_date: row.join_date, end_date: row.end_date, description: row.description });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (deleteId !== null) { setRecords((r) => r.filter((rec) => rec.id !== deleteId)); setDeleteId(null); toast.error("Club deleted"); }
  };

  const columns: ColumnDef<ClubRecord>[] = [
    { key: "club_name" as keyof ClubRecord, label: "Club Name" },
    { key: "role" as keyof ClubRecord, label: "Role" },
    { key: "join_date" as keyof ClubRecord, label: "Join Date" },
    { key: "end_date" as keyof ClubRecord, label: "End Date" },
  ];

  const filters = clubRoleOptions.map((r) => ({ label: r, value: r, filterFn: (item: ClubRecord) => item.role === r }));

  return (
    <div>
      <PageHeader title="Clubs" breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Clubs" }]}>
        <Button className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}><Plus className="mr-1.5 h-4 w-4" /> Add Club</Button>
      </PageHeader>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingId ? "Edit Club" : "Add Club"}</DialogTitle><DialogDescription>{editingId ? "Update the club details." : "Fill in the club details."}</DialogDescription></DialogHeader>
          <form id="clubForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="clubName">Club Name</Label><Input id="clubName" name="club_name" value={form.club_name} onChange={(e) => update("club_name", e.target.value)} required /></div>
            <div className="space-y-2">
              <Label htmlFor="clubRole">Role</Label>
              <Select value={form.role} onValueChange={(v) => update("role", v)}>
                <SelectTrigger id="clubRole"><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>{clubRoleOptions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="clubJoinDate">Join Date</Label><Input id="clubJoinDate" name="join_date" type="date" value={form.join_date} onChange={(e) => update("join_date", e.target.value)} required /></div>
              <div className="space-y-2"><Label htmlFor="clubEndDate">End Date</Label><Input id="clubEndDate" name="end_date" type="date" value={form.end_date} onChange={(e) => update("end_date", e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="clubDescription">Description</Label><Textarea id="clubDescription" name="description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit">{editingId ? "Update" : "Add"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete Club</DialogTitle><DialogDescription>Are you sure? This cannot be undone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button><Button variant="destructive" onClick={handleDelete}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>

      <Card className="border-t-success"><CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success inline-block"></span> Club Records</CardTitle></CardHeader><CardContent>
        <DataTable idPrefix="club" data={records as unknown as Record<string, unknown>[]} columns={columns as unknown as ColumnDef<Record<string, unknown>>[]} searchFields={["club_name", "role"]} filters={filters} filterLabel="Role" emptyIcon={Users} emptyMessage="No clubs yet" emptyActionLabel="Add your first club" onEmptyAction={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }} actions={(row: any) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(row)}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        )} />
      </CardContent></Card>
    </div>
  );
};

export default ClubPage;
