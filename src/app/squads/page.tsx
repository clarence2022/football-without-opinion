"use client";

import { useState } from "react";
import { getClubs, getSquadByClub, calculateAge, formatDate } from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface SquadRow {
  id: string;
  shirtNumber: number | null;
  name: string;
  position: string;
  age: number | null;
  nationality: string;
  appearances: number;
  minutesPlayed: number;
  contractEnd: string | null;
}

export default function SquadsPage() {
  const clubs = getClubs();
  const [selectedClubId, setSelectedClubId] = useState(clubs[0]?.id ?? "");

  const squad = selectedClubId ? getSquadByClub(selectedClubId) : [];

  const rows: SquadRow[] = squad.map((p) => ({
    id: p.id,
    shirtNumber: p.shirtNumber,
    name: p.name,
    position: p.position,
    age: calculateAge(p.dateOfBirth),
    nationality: p.nationality,
    appearances: p.appearances,
    minutesPlayed: p.minutesPlayed,
    contractEnd: p.contractEnd,
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "shirtNumber");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Squads</h1>
      <p className="text-neutral-500 mb-8">Players, minutes, contracts.</p>

      {/* Club selector */}
      <div className="mb-6">
        <label htmlFor="club-select" className="block text-sm text-neutral-500 mb-2">
          Select club
        </label>
        <select
          id="club-select"
          value={selectedClubId}
          onChange={(e) => setSelectedClubId(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>

      {/* Squad table */}
      {sortedItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <SortableHeader
                  label="#"
                  sortKey="shirtNumber"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("shirtNumber")}
                />
                <SortableHeader
                  label="Player"
                  sortKey="name"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("name")}
                />
                <SortableHeader
                  label="Position"
                  sortKey="position"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("position")}
                />
                <SortableHeader
                  label="Age"
                  sortKey="age"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("age")}
                />
                <SortableHeader
                  label="Nationality"
                  sortKey="nationality"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("nationality")}
                />
                <SortableHeader
                  label="Appearances"
                  sortKey="appearances"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("appearances")}
                />
                <SortableHeader
                  label="Minutes"
                  sortKey="minutesPlayed"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("minutesPlayed")}
                />
                <SortableHeader
                  label="Contract End"
                  sortKey="contractEnd"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("contractEnd")}
                />
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((row) => (
                <tr key={row.id}>
                  <td className="text-neutral-500">{row.shirtNumber ?? "—"}</td>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.position}</td>
                  <td>{row.age ?? "—"}</td>
                  <td>{row.nationality}</td>
                  <td className="text-center">{row.appearances}</td>
                  <td className="text-center">{row.minutesPlayed.toLocaleString()}</td>
                  <td className="text-neutral-500">
                    {row.contractEnd ? formatDate(row.contractEnd) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-500">No squad data for this club.</p>
      )}
    </div>
  );
}
