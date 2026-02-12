// =========================
// Users Page (admin/users.html equivalent)
// Users table with search, sort, and View Details action
// =========================

import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import DataTable, { ColumnDef } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { demoUsers, type UserRecord } from "@/data/demo-data";

const UsersPage = () => {
  const navigate = useNavigate();
  const students = demoUsers.filter((u) => u.role === "student");

  const columns: ColumnDef<UserRecord>[] = [
    { key: "student_id" as keyof UserRecord, label: "Student ID" },
    { key: "full_name" as keyof UserRecord, label: "Full Name" },
    { key: "email" as keyof UserRecord, label: "Email" },
    { key: "total_events" as keyof UserRecord, label: "Events" },
    { key: "total_clubs" as keyof UserRecord, label: "Clubs" },
    { key: "total_merits" as keyof UserRecord, label: "Merits" },
    { key: "total_achievements" as keyof UserRecord, label: "Achievements" },
  ];

  return (
    <div>
      <PageHeader title="Users" breadcrumbs={[{ label: "Admin" }, { label: "Users" }]} />

      <Card>
        <CardHeader><CardTitle>Registered Users</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            idPrefix="adminUser"
            data={students as unknown as Record<string, unknown>[]}
            columns={columns as unknown as ColumnDef<Record<string, unknown>>[]}
            searchFields={["student_id", "full_name", "email"]}
            actions={(row: any) => (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/user-details/${row.id}`)}>
                <Eye className="mr-1.5 h-4 w-4" /> View
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
