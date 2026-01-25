"use client";

import { useState, useMemo } from "react";
import {
  getTransfers,
  getClubs,
  getClubName,
  getPlayerName,
  formatDate,
  formatFee,
} from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";
import { Filter, FilterBar } from "@/components/Filter";

interface TransferRow {
  id: string;
  date: string;
  year: string;
  playerName: string;
  fromClub: string;
  fromClubId: string | null;
  toClub: string;
  toClubId: string | null;
  feeEur: number | null;
  feeType: string;
}

export default function TransfersPage() {
  const transfers = getTransfers();
  const clubs = getClubs();

  // Get unique years
  const years = useMemo(() => {
    const yrs = [...new Set(transfers.map((t) => t.date.substring(0, 4)))];
    return yrs.sort().reverse();
  }, [transfers]);

  // Filter state
  const [clubFilter, setClubFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Transform to sortable rows with filters
  const rows: TransferRow[] = useMemo(() => {
    return transfers
      .filter((t) => {
        if (yearFilter !== "all" && !t.date.startsWith(yearFilter)) return false;
        if (clubFilter !== "all" && t.fromClubId !== clubFilter && t.toClubId !== clubFilter) return false;
        if (typeFilter !== "all" && t.feeType !== typeFilter) return false;
        return true;
      })
      .map((t) => ({
        id: t.id,
        date: t.date,
        year: t.date.substring(0, 4),
        playerName: getPlayerName(t.playerId),
        fromClub: getClubName(t.fromClubId),
        fromClubId: t.fromClubId,
        toClub: getClubName(t.toClubId),
        toClubId: t.toClubId,
        feeEur: t.feeEur,
        feeType: t.feeType,
      }));
  }, [transfers, clubFilter, yearFilter, typeFilter]);

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "date");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Transfers</h1>
      <p className="text-neutral-500 mb-6">Recorded player movements.</p>

      <FilterBar>
        <Filter
          label="Year"
          value={yearFilter}
          onChange={setYearFilter}
          options={[
            { value: "all", label: "All years" },
            ...years.map((y) => ({ value: y, label: y })),
          ]}
        />
        <Filter
          label="Club"
          value={clubFilter}
          onChange={setClubFilter}
          options={[
            { value: "all", label: "All clubs" },
            ...clubs.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
        <Filter
          label="Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: "all", label: "All types" },
            { value: "transfer", label: "Transfer" },
            { value: "free", label: "Free" },
            { value: "loan", label: "Loan" },
          ]}
        />
      </FilterBar>

      <p className="text-sm text-neutral-500 mb-4">
        {sortedItems.length} transfer{sortedItems.length !== 1 ? "s" : ""}
      </p>

      {sortedItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <SortableHeader
                  label="Date"
                  sortKey="date"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("date")}
                />
                <SortableHeader
                  label="Player"
                  sortKey="playerName"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("playerName")}
                />
                <SortableHeader
                  label="From"
                  sortKey="fromClub"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("fromClub")}
                />
                <SortableHeader
                  label="To"
                  sortKey="toClub"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("toClub")}
                />
                <SortableHeader
                  label="Fee"
                  sortKey="feeEur"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("feeEur")}
                />
                <SortableHeader
                  label="Type"
                  sortKey="feeType"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("feeType")}
                />
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.date)}</td>
                  <td className="font-medium">{row.playerName}</td>
                  <td>{row.fromClub}</td>
                  <td>{row.toClub}</td>
                  <td className="font-mono">
                    {formatFee(row.feeEur, row.feeType)}
                  </td>
                  <td className="text-neutral-500 capitalize">{row.feeType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-500">No transfers match filters.</p>
      )}
    </div>
  );
}
