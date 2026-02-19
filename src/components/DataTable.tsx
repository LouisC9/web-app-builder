// =========================
// DataTable Component
// Reusable table with search, sort, filter, pagination, CSV export
// =========================

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button as UiButton } from "@/components/ui/button";
import { filterByKeyword, sortByColumn, paginateData, exportToCSV } from "@/utils/table-utils";

// =========================
// Types
// =========================
export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface FilterOption {
  label: string;
  value: string;
  filterFn: (item: any) => boolean;
}

interface DataTableProps<T extends Record<string, unknown>> {
  idPrefix: string;
  data: T[];
  columns: ColumnDef<T>[];
  searchFields: (keyof T)[];
  filters?: FilterOption[];
  filterLabel?: string;
  actions?: (row: T) => React.ReactNode;
  pageSize?: number;
  emptyIcon?: React.ElementType;
  emptyMessage?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
}

function DataTable<T extends Record<string, unknown>>({
  idPrefix,
  data,
  columns,
  searchFields,
  filters,
  filterLabel,
  actions,
  pageSize = 5,
  emptyIcon: EmptyIcon,
  emptyMessage,
  emptyActionLabel,
  onEmptyAction,
}: DataTableProps<T>) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterValue, setFilterValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // Filtered + Sorted + Paginated Data
  // =========================
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter by keyword
    result = filterByKeyword(result, searchKeyword, searchFields);

    // Filter by dropdown
    if (filterValue !== "all" && filters) {
      const activeFilter = filters.find((f) => f.value === filterValue);
      if (activeFilter) {
        result = result.filter(activeFilter.filterFn);
      }
    }

    // Sort
    if (sortColumn) {
      result = sortByColumn(result, sortColumn as keyof T, sortDir);
    }

    return result;
  }, [data, searchKeyword, searchFields, filterValue, filters, sortColumn, sortDir]);

  const { pageData, totalPages } = paginateData(processedData, currentPage, pageSize);

  // =========================
  // Handlers
  // =========================
  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const handleExport = () => {
    const exportCols = columns.map((c) => ({ key: c.key, label: c.label }));
    exportToCSV(processedData as Record<string, unknown>[], exportCols as { key: string; label: string }[], `${idPrefix}-export`);
  };

  return (
    <div className="space-y-4">
      {/* ========================= */}
      {/* Table Controls */}
      {/* ========================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <Input
            id={`${idPrefix}SearchInput`}
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-xs"
          />

          {/* ========================= */}
          {/* Sort Dropdown */}
          {/* ========================= */}
          <Select
            value={sortColumn || "none"}
            onValueChange={(val) => {
              if (val === "none") {
                setSortColumn("");
              } else {
                setSortColumn(val);
              }
              setCurrentPage(1);
            }}
          >
            <SelectTrigger id={`${idPrefix}SortSelect`} className="w-40">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sort</SelectItem>
              {columns
                .filter((c) => c.sortable !== false)
                .map((c) => (
                  <SelectItem key={String(c.key)} value={String(c.key)}>
                    {c.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* ========================= */}
          {/* Filter Dropdown */}
          {/* ========================= */}
          {filters && (
            <Select
              value={filterValue}
              onValueChange={(val) => {
                setFilterValue(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id={`${idPrefix}FilterSelect`} className="w-40">
                <SelectValue placeholder={filterLabel || "Filter"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filters.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* ========================= */}
        {/* Export Button */}
        {/* ========================= */}
        <Button id={`${idPrefix}ExportBtn`} variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-1.5 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* ========================= */}
      {/* Table */}
      {/* ========================= */}
      <div className="rounded-md border bg-card">
        <Table id={`${idPrefix}Table`}>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={col.sortable !== false ? "cursor-pointer select-none" : ""}
                  onClick={() => col.sortable !== false && handleSort(String(col.key))}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {sortColumn === String(col.key) && (
                      <span className="text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>
                    )}
                  </span>
                </TableHead>
              ))}
              {actions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-3 py-6">
                    {EmptyIcon && <EmptyIcon className="h-10 w-10 text-muted-foreground/40" />}
                    <p className="text-sm text-muted-foreground">{emptyMessage || "No records found."}</p>
                    {emptyActionLabel && onEmptyAction && (
                      <UiButton size="sm" variant="outline" onClick={onEmptyAction}>
                        <Plus className="mr-1.5 h-4 w-4" /> {emptyActionLabel}
                      </UiButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((row, idx) => (
                <TableRow key={idx} className="zebra-row">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                  {actions && <TableCell className="text-right">{actions(row)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ========================= */}
      {/* Pagination */}
      {/* ========================= */}
      <div id={`${idPrefix}Pagination`} className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {processedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length}
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
