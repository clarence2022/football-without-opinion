"use client";

import { useState, useMemo } from "react";
import {
  getMatches,
  getClubs,
  getClubName,
  formatDate,
  formatScore,
} from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";
import { Filter, FilterBar } from "@/components/Filter";

interface MatchRow {
  id: string;
  date: string;
  kickoff: string | null;
  homeClub: string;
  homeClubId: string;
  awayClub: string;
  awayClubId: string;
  homeScore: number | null;
  awayScore: number | null;
  competition: string;
  venue: string | null;
  attendance: number | null;
  status: string;
}

export default function MatchesPage() {
  const allMatches = getMatches();
  const clubs = getClubs();

  // Get unique competitions
  const competitions = useMemo(() => {
    const comps = [...new Set(allMatches.map((m) => m.competition))];
    return comps.sort();
  }, [allMatches]);

  // Filter state
  const [competitionFilter, setCompetitionFilter] = useState("all");
  const [clubFilter, setClubFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Transform and filter matches
  const rows: MatchRow[] = useMemo(() => {
    return allMatches
      .filter((m) => {
        if (competitionFilter !== "all" && m.competition !== competitionFilter) return false;
        if (clubFilter !== "all" && m.homeClubId !== clubFilter && m.awayClubId !== clubFilter) return false;
        if (statusFilter !== "all" && m.status !== statusFilter) return false;
        return true;
      })
      .map((m) => ({
        id: m.id,
        date: m.date,
        kickoff: m.kickoff,
        homeClub: getClubName(m.homeClubId),
        homeClubId: m.homeClubId,
        awayClub: getClubName(m.awayClubId),
        awayClubId: m.awayClubId,
        homeScore: m.homeScore,
        awayScore: m.awayScore,
        competition: m.competition,
        venue: m.venue,
        attendance: m.attendance,
        status: m.status,
      }));
  }, [allMatches, competitionFilter, clubFilter, statusFilter]);

  const scheduledRows = rows.filter((r) => r.status === "scheduled");
  const completedRows = rows.filter((r) => r.status === "completed");

  const {
    sortedItems: sortedScheduled,
    sortConfig: scheduledSortConfig,
    requestSort: requestScheduledSort,
  } = useSort(scheduledRows, "date");

  const {
    sortedItems: sortedCompleted,
    sortConfig: completedSortConfig,
    requestSort: requestCompletedSort,
  } = useSort(completedRows, "date");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Matches</h1>
      <p className="text-neutral-500 mb-6">Fixtures and results.</p>

      <FilterBar>
        <Filter
          label="Competition"
          value={competitionFilter}
          onChange={setCompetitionFilter}
          options={[
            { value: "all", label: "All competitions" },
            ...competitions.map((c) => ({ value: c, label: c })),
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
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "All" },
            { value: "scheduled", label: "Scheduled" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </FilterBar>

      {/* Scheduled matches */}
      {(statusFilter === "all" || statusFilter === "scheduled") && (
        <section className="mb-12">
          <h2 className="text-lg font-medium mb-4">
            Scheduled ({sortedScheduled.length})
          </h2>
          {sortedScheduled.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <SortableHeader
                      label="Date"
                      sortKey="date"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("date")}
                    />
                    <SortableHeader
                      label="Kickoff"
                      sortKey="kickoff"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("kickoff")}
                    />
                    <SortableHeader
                      label="Home"
                      sortKey="homeClub"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("homeClub")}
                    />
                    <SortableHeader
                      label="Away"
                      sortKey="awayClub"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("awayClub")}
                    />
                    <SortableHeader
                      label="Competition"
                      sortKey="competition"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("competition")}
                    />
                    <SortableHeader
                      label="Venue"
                      sortKey="venue"
                      currentKey={scheduledSortConfig.key as string}
                      direction={scheduledSortConfig.direction}
                      onSort={() => requestScheduledSort("venue")}
                    />
                  </tr>
                </thead>
                <tbody>
                  {sortedScheduled.map((row) => (
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
          ) : (
            <p className="text-neutral-500">No scheduled matches.</p>
          )}
        </section>
      )}

      {/* Completed matches */}
      {(statusFilter === "all" || statusFilter === "completed") && (
        <section>
          <h2 className="text-lg font-medium mb-4">
            Results ({sortedCompleted.length})
          </h2>
          {sortedCompleted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <SortableHeader
                      label="Date"
                      sortKey="date"
                      currentKey={completedSortConfig.key as string}
                      direction={completedSortConfig.direction}
                      onSort={() => requestCompletedSort("date")}
                    />
                    <SortableHeader
                      label="Home"
                      sortKey="homeClub"
                      currentKey={completedSortConfig.key as string}
                      direction={completedSortConfig.direction}
                      onSort={() => requestCompletedSort("homeClub")}
                    />
                    <th>Score</th>
                    <SortableHeader
                      label="Away"
                      sortKey="awayClub"
                      currentKey={completedSortConfig.key as string}
                      direction={completedSortConfig.direction}
                      onSort={() => requestCompletedSort("awayClub")}
                    />
                    <SortableHeader
                      label="Competition"
                      sortKey="competition"
                      currentKey={completedSortConfig.key as string}
                      direction={completedSortConfig.direction}
                      onSort={() => requestCompletedSort("competition")}
                    />
                    <SortableHeader
                      label="Attendance"
                      sortKey="attendance"
                      currentKey={completedSortConfig.key as string}
                      direction={completedSortConfig.direction}
                      onSort={() => requestCompletedSort("attendance")}
                    />
                  </tr>
                </thead>
                <tbody>
                  {sortedCompleted.map((row) => (
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
          ) : (
            <p className="text-neutral-500">No completed matches.</p>
          )}
        </section>
      )}
    </div>
  );
}
