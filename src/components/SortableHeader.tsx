"use client";

import { SortDirection } from "@/hooks/useSort";

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentKey: string | null;
  direction: SortDirection;
  onSort: () => void;
  className?: string;
}

export function SortableHeader({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
  className = "",
}: SortableHeaderProps) {
  const isActive = currentKey === sortKey;

  return (
    <th
      className={`cursor-pointer select-none hover:bg-neutral-50 dark:hover:bg-neutral-800 ${className}`}
      onClick={onSort}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <span className="text-neutral-400 text-xs">
          {isActive ? (direction === "asc" ? "↑" : "↓") : ""}
        </span>
      </div>
    </th>
  );
}
