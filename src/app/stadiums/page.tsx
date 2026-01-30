"use client";

import { getStadiums, getClubName } from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface StadiumRow {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  opened: number | null;
  clubName: string;
}

export default function StadiumsPage() {
  const stadiums = getStadiums();

  const rows: StadiumRow[] = stadiums.map((s) => ({
    id: s.id,
    name: s.name,
    city: s.city,
    country: s.country,
    capacity: s.capacity,
    opened: s.opened,
    clubName: s.clubId ? getClubName(s.clubId) : "Shared",
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "capacity");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Stadiums</h1>
      <p className="text-neutral-500 mb-8">
        Venues, capacities, locations. {stadiums.length} stadiums.
      </p>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <SortableHeader
                label="Stadium"
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
                label="City"
                sortKey="city"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("city")}
              />
              <SortableHeader
                label="Country"
                sortKey="country"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("country")}
              />
              <SortableHeader
                label="Capacity"
                sortKey="capacity"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("capacity")}
              />
              <SortableHeader
                label="Opened"
                sortKey="opened"
                currentKey={sortConfig.key as string}
                direction={sortConfig.direction}
                onSort={() => requestSort("opened")}
              />
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((row) => (
              <tr key={row.id}>
                <td className="font-medium">{row.name}</td>
                <td>{row.clubName}</td>
                <td>{row.city}</td>
                <td>{row.country}</td>
                <td className="text-right">{row.capacity.toLocaleString()}</td>
                <td className="text-neutral-500">{row.opened ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
