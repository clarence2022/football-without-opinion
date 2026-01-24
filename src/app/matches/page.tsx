"use client";

import {
  getCompletedMatches,
  getScheduledMatches,
  getClubName,
  formatDate,
  formatScore,
} from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface ScheduledMatchRow {
  id: string;
  date: string;
  kickoff: string | null;
  homeClub: string;
  awayClub: string;
  competition: string;
  venue: string | null;
}

interface CompletedMatchRow {
  id: string;
  date: string;
  homeClub: string;
  homeScore: number | null;
  awayScore: number | null;
  awayClub: string;
  competition: string;
  attendance: number | null;
}

function ScheduledMatchesTable() {
  const matches = getScheduledMatches();

  const rows: ScheduledMatchRow[] = matches.map((m) => ({
    id: m.id,
    date: m.date,
    kickoff: m.kickoff,
    homeClub: getClubName(m.homeClubId),
    awayClub: getClubName(m.awayClubId),
    competition: m.competition,
    venue: m.venue,
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "date");

  if (rows.length === 0) {
    return <p className="text-neutral-500">No scheduled matches.</p>;
  }

  return (
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
              label="Kickoff"
              sortKey="kickoff"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("kickoff")}
            />
            <SortableHeader
              label="Home"
              sortKey="homeClub"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("homeClub")}
            />
            <SortableHeader
              label="Away"
              sortKey="awayClub"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("awayClub")}
            />
            <SortableHeader
              label="Competition"
              sortKey="competition"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("competition")}
            />
            <SortableHeader
              label="Venue"
              sortKey="venue"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("venue")}
            />
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((row) => (
            <tr key={row.id}>
              <td>{formatDate(row.date)}</td>
              <td className="text-neutral-500">{row.kickoff ?? "—"}</td>
              <td className="font-medium">{row.homeClub}</td>
              <td className="font-medium">{row.awayClub}</td>
              <td className="text-neutral-500">{row.competition}</td>
              <td className="text-neutral-500">{row.venue ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompletedMatchesTable() {
  const matches = getCompletedMatches();

  const rows: CompletedMatchRow[] = matches.map((m) => ({
    id: m.id,
    date: m.date,
    homeClub: getClubName(m.homeClubId),
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    awayClub: getClubName(m.awayClubId),
    competition: m.competition,
    attendance: m.attendance,
  }));

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "date");

  if (rows.length === 0) {
    return <p className="text-neutral-500">No completed matches.</p>;
  }

  return (
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
              label="Home"
              sortKey="homeClub"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("homeClub")}
            />
            <th>Score</th>
            <SortableHeader
              label="Away"
              sortKey="awayClub"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("awayClub")}
            />
            <SortableHeader
              label="Competition"
              sortKey="competition"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("competition")}
            />
            <SortableHeader
              label="Attendance"
              sortKey="attendance"
              currentKey={sortConfig.key as string}
              direction={sortConfig.direction}
              onSort={() => requestSort("attendance")}
            />
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((row) => (
            <tr key={row.id}>
              <td>{formatDate(row.date)}</td>
              <td className="font-medium">{row.homeClub}</td>
              <td className="font-mono text-center">
                {formatScore(row.homeScore, row.awayScore)}
              </td>
              <td className="font-medium">{row.awayClub}</td>
              <td className="text-neutral-500">{row.competition}</td>
              <td className="text-neutral-500">
                {row.attendance?.toLocaleString() ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Matches</h1>
      <p className="text-neutral-500 mb-8">Fixtures and results.</p>

      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4">Scheduled</h2>
        <ScheduledMatchesTable />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Results</h2>
        <CompletedMatchesTable />
      </section>
    </div>
  );
}
