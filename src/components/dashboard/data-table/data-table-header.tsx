
import * as React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Column } from "./types";

interface DataTableHeaderProps<T> {
  columns: Column<T>[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onHeaderClick: (columnId: string, enableSorting?: boolean) => void;
}

export function DataTableHeader<T>({
  columns,
  sortColumn,
  sortDirection,
  onHeaderClick,
}: DataTableHeaderProps<T>) {
  // Render sort icon based on sort state
  const renderSortIcon = (columnId: string, enableSorting?: boolean) => {
    if (!enableSorting) return null;
    
    if (sortColumn === columnId) {
      return sortDirection === "asc" ? (
        <ChevronUp className="ml-1 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-1 h-4 w-4" />
      );
    }
    
    return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />;
  };
  
  return (
    <thead className="[&_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50">
        {columns.map((column) => (
          <th
            key={column.id}
            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${
              column.enableSorting ? "cursor-pointer select-none" : ""
            }`}
            onClick={() => onHeaderClick(column.id, column.enableSorting)}
          >
            <div className="flex items-center">
              {column.header}
              {renderSortIcon(column.id, column.enableSorting)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
