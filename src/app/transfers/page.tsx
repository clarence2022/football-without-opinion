"use client";

import {
  getTransfers,
  getClubName,
  getPlayerName,
  formatDate,
  formatFee,
} from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface TransferRow {
  id: string;
  date: string;
  playerName: string;
  fromClub: string;
  toClub: string;
  feeEur: number | null;
  feeType: string;
}

export default function TransfersPage() {
  const transfers = getTransfers();

  // Transform to sortable rows
  const rows: TransferRow[] = transfers.map((t) => ({
    id: t.id,
    date: t.date,
    playerName: getPlayerName(t.playerId),
    fromClub: getClubName(t.fromClubId),
    toClub: getClubName(t.toClubId),
    feeEur: t.feeEur,
    feeType: t.feeType,
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "date");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Transfers</h1>
      <p className="text-neutral-500 mb-8">Recorded player movements.</p>

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
        <p className="text-neutral-500">No transfers recorded.</p>
      )}
    </div>
  );
}
