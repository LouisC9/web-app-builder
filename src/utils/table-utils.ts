// =========================
// Table Utilities
// Search, sort, paginate, and export functions
// =========================

// =========================
// Table Search
// =========================
export function filterByKeyword<T>(data: T[], keyword: string, fields: (keyof T)[]): T[] {
  if (!keyword.trim()) return data;
  const lowerKeyword = keyword.toLowerCase();
  return data.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (value == null) return false;
      return String(value).toLowerCase().includes(lowerKeyword);
    })
  );
}

// =========================
// Table Sort
// =========================
export function sortByColumn<T>(data: T[], column: keyof T, direction: "asc" | "desc"): T[] {
  return [...data].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === "asc" ? -1 : 1;
    if (bVal == null) return direction === "asc" ? 1 : -1;

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    if (aStr < bStr) return direction === "asc" ? -1 : 1;
    if (aStr > bStr) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// =========================
// Table Pagination
// =========================
export function paginateData<T>(data: T[], page: number, pageSize: number): { pageData: T[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);
  return { pageData, totalPages };
}

// =========================
// Export to CSV
// =========================
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[],
  filename: string
): void {
  const header = columns.map((c) => c.label).join(",");
  const rows = data.map((row) =>
    columns
      .map((c) => {
        const val = row[c.key];
        const str = val == null ? "" : String(val);
        // Escape commas and quotes
        return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
      })
      .join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
