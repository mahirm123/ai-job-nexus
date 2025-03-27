
import * as React from "react";
import { Column } from "./types";

export function useDataTable<T>(
  data: T[],
  searchable: boolean,
  searchQuery: string,
  searchKey?: keyof T,
  sortColumn?: string | null,
  sortDirection?: "asc" | "desc",
  pageSize?: number,
  currentPage?: number
) {
  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchQuery || !searchKey) return data;
    
    return data.filter((row) => {
      const value = row[searchKey];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  }, [data, searchable, searchQuery, searchKey]);
  
  // Sort data based on sort column and direction
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];
      
      if (aValue === bValue) return 0;
      
      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);
  
  // Calculate pagination
  const totalPages = pageSize ? Math.ceil(sortedData.length / pageSize) : 1;
  
  // Get paginated data
  const paginatedData = React.useMemo(() => {
    if (!pageSize || !currentPage) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);
  
  return {
    filteredData,
    sortedData,
    paginatedData,
    totalPages
  };
}
