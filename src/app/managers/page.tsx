"use client";

import { getManagers, getClubName, calculateAge, formatDate } from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface ManagerRow {
  id: string;
  name: string;
  nationality: string;
  age: number | null;
  clubName: string;
  appointedDate: string | null;
}

export default function ManagersPage() {
  const managers = getManagers();

  const rows: ManagerRow[] = managers.map((m) => ({
    id: m.id,
    name: m.name,
    nationality: m.nationality,
    age: calculateAge(m.dateOfBirth),
    clubName: m.currentClubId ? getClubName(m.currentClubId) : "—",
    appointedDate: m.appointedDate,
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "clubName");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Managers</h1>
      <p className="text-neutral-500 mb-8">
        Current managers and appointments. {managers.length} managers.
      </p>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <SortableHeader
                label="Name"
                sortKey="name"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("name")}
              />
              <SortableHeader
                label="Club"
                sortKey="clubName"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("clubName")}
              />
              <SortableHeader
                label="Nationality"
                sortKey="nationality"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("nationality")}
              />
              <SortableHeader
                label="Age"
                sortKey="age"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("age")}
              />
              <SortableHeader
                label="Appointed"
                sortKey="appointedDate"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("appointedDate")}
              />
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((row) => (
              <tr key={row.id}>
                <td className="font-medium">{row.name}</td>
                <td>{row.clubName}</td>
                <td>{row.nationality}</td>
                <td>{row.age ?? "—"}</td>
                <td className="text-neutral-500">
                  {row.appointedDate ? formatDate(row.appointedDate) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
