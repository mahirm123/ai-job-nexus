
import * as React from "react";
import { DataTableProps } from "./types";
import { DataTableSearch } from "./data-table-search";
import { DataTableHeader } from "./data-table-header";
import { DataTableBody } from "./data-table-body";
import { DataTablePagination } from "./data-table-pagination";
import { useDataTable } from "./use-data-table";

export function DataTable<T>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKey,
  onRowClick,
  pageSize = 10,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Get table data with filtering, sorting, and pagination
  const { paginatedData, totalPages } = useDataTable<T>(
    data,
    searchable,
    searchQuery,
    searchKey,
    sortColumn,
    sortDirection,
    pageSize,
    currentPage
  );
  
  // Handle column header click for sorting
  const handleHeaderClick = (columnId: string, enableSorting?: boolean) => {
    if (!enableSorting) return;
    
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };
  
  // Reset to first page when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  return (
    <div className="w-full">
      {searchable && searchKey && (
        <DataTableSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={searchPlaceholder}
        />
      )}
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <DataTableHeader<T>
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onHeaderClick={handleHeaderClick}
            />
            <DataTableBody<T>
              columns={columns}
              data={paginatedData}
              onRowClick={onRowClick}
            />
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
