
import * as React from "react";
import { Column } from "./types";

interface DataTableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTableBody<T>({
  columns,
  data,
  onRowClick,
}: DataTableBodyProps<T>) {
  return (
    <tbody className="[&_tr:last-child]:border-0">
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border-b transition-colors hover:bg-muted/50 ${
              onRowClick ? "cursor-pointer" : ""
            }`}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <td key={column.id} className="p-4 align-middle">
                {column.cell
                  ? column.cell(row)
                  : (row[column.accessorKey] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length}
            className="h-24 text-center align-middle text-muted-foreground"
          >
            No results.
          </td>
        </tr>
      )}
    </tbody>
  );
}
