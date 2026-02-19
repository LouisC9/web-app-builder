// =========================
// Event Module Page (modules/event.html equivalent)
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Calendar } from "lucide-react";
import { demoEvents, eventTypeOptions, CURRENT_USER_ID, type EventRecord } from "@/data/demo-data";
import { toast } from "sonner";

const emptyForm = {
  event_name: "",
  event_type: "",
  event_date: "",
  location: "",
  organizer: "",
  description: "",
};

const EventPage = () => {
  const [records, setRecords] = useState<EventRecord[]>(
    demoEvents.filter((e) => e.user_id === CURRENT_USER_ID)
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  // =========================
  // Add / Update Handler
  // =========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setRecords((r) =>
        r.map((rec) =>
          rec.id === editingId ? { ...rec, ...form } : rec
        )
      );
      setEditingId(null);
      toast.success("Event updated successfully");
    } else {
      const newRecord: EventRecord = {
        id: Date.now(),
        user_id: CURRENT_USER_ID,
        ...form,
      };
      setRecords((r) => [...r, newRecord]);
      toast.success("Event added successfully");
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (row: EventRecord) => {
    setForm({
      event_name: row.event_name,
      event_type: row.event_type,
      event_date: row.event_date,
      location: row.location,
      organizer: row.organizer,
      description: row.description,
    });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      setRecords((r) => r.filter((rec) => rec.id !== deleteId));
      setDeleteId(null);
      toast.error("Event deleted");
    }
  };

  // =========================
  // Column Definitions
  // =========================
  const columns: ColumnDef<EventRecord>[] = [
    { key: "event_name" as keyof EventRecord, label: "Event Name" },
    { key: "event_type" as keyof EventRecord, label: "Type" },
    { key: "event_date" as keyof EventRecord, label: "Date" },
    { key: "location" as keyof EventRecord, label: "Location" },
    { key: "organizer" as keyof EventRecord, label: "Organizer" },
  ];

  const filters = eventTypeOptions.map((t) => ({
    label: t,
    value: t,
    filterFn: (item: EventRecord) => item.event_type === t,
  }));

  return (
    <div>
      <PageHeader
        title="Events"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Events" }]}
      >
        <Button className="bg-info hover:bg-info/90 text-info-foreground" onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}>
          <Plus className="mr-1.5 h-4 w-4" /> Add Event
        </Button>
      </PageHeader>

      {/* ========================= */}
      {/* Add/Edit Form Dialog */}
      {/* ========================= */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Add Event"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the event details below." : "Fill in the event details below."}
            </DialogDescription>
          </DialogHeader>
          <form id="eventForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="eventName" name="event_name" value={form.event_name} onChange={(e) => update("event_name", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Type</Label>
                <Select value={form.event_type} onValueChange={(v) => update("event_type", v)}>
                  <SelectTrigger id="eventType"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {eventTypeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Date</Label>
                <Input id="eventDate" name="event_date" type="date" value={form.event_date} onChange={(e) => update("event_date", e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Location</Label>
                <Input id="eventLocation" name="location" value={form.location} onChange={(e) => update("location", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventOrganizer">Organizer</Label>
                <Input id="eventOrganizer" name="organizer" value={form.organizer} onChange={(e) => update("organizer", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">Description</Label>
              <Textarea id="eventDescription" name="description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit">{editingId ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================= */}
      {/* Delete Confirmation */}
      {/* ========================= */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>Are you sure you want to delete this event? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================= */}
      {/* Records Table */}
      {/* ========================= */}
      <Card className="border-t-info">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-info inline-block"></span> Event Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            idPrefix="event"
            data={records as unknown as Record<string, unknown>[]}
            columns={columns as unknown as ColumnDef<Record<string, unknown>>[]}
            searchFields={["event_name", "event_type", "location", "organizer"]}
            filters={filters}
            filterLabel="Event Type"
            emptyIcon={Calendar}
            emptyMessage="No events yet"
            emptyActionLabel="Add your first event"
            onEmptyAction={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            actions={(row: any) => (
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(row)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(row.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPage;
