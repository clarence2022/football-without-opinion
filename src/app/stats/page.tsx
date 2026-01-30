"use client";

import { useState } from "react";
import {
  getPlayerStatsBySeason,
  getSeasons,
  getPlayerName,
  getPlayerById,
  getClubName,
  getCompetitionName,
  getSeasonById,
} from "@/lib/data";
import { useSort } from "@/hooks/useSort";
import { SortableHeader } from "@/components/SortableHeader";

interface StatsRow {
  playerId: string;
  playerName: string;
  clubName: string;
  appearances: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
}

export default function StatsPage() {
  const seasons = getSeasons();
  const leagueSeasons = seasons.filter(
    (s) =>
      s.competitionId.includes("premier-league") ||
      s.competitionId.includes("la-liga") ||
      s.competitionId.includes("bundesliga") ||
      s.competitionId.includes("serie-a") ||
      s.competitionId.includes("ligue-1")
  );

  const [selectedSeasonId, setSelectedSeasonId] = useState(leagueSeasons[0]?.id ?? "");

  const stats = selectedSeasonId ? getPlayerStatsBySeason(selectedSeasonId) : [];

  const rows: StatsRow[] = stats.map((s) => {
    const player = getPlayerById(s.playerId);
    return {
      playerId: s.playerId,
      playerName: getPlayerName(s.playerId),
      clubName: player?.clubId ? getClubName(player.clubId) : "—",
      appearances: s.appearances,
      goals: s.goals,
      assists: s.assists,
      minutesPlayed: s.minutesPlayed,
      yellowCards: s.yellowCards,
      redCards: s.redCards,
    };
  });

  const { sortedItems, sortConfig, requestSort } = useSort(rows, "goals");

  const selectedSeason = getSeasonById(selectedSeasonId);
  const competitionName = selectedSeason
    ? getCompetitionName(selectedSeason.competitionId)
    : "";

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Player Stats</h1>
      <p className="text-neutral-500 mb-8">Goals, assists, cards by season.</p>

      {/* Season selector */}
      <div className="mb-6">
        <label htmlFor="season-select" className="block text-sm text-neutral-500 mb-2">
          Select season
        </label>
        <select
          id="season-select"
          value={selectedSeasonId}
          onChange={(e) => setSelectedSeasonId(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          {leagueSeasons.map((season) => (
            <option key={season.id} value={season.id}>
              {getCompetitionName(season.competitionId)} {season.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stats table */}
      {sortedItems.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-medium mb-4">
            {competitionName} {selectedSeason?.name} — {sortedItems.length} players
          </h2>
          <table className="data-table">
            <thead>
              <tr>
                <SortableHeader
                  label="Player"
                  sortKey="playerName"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("playerName")}
                />
                <SortableHeader
                  label="Club"
                  sortKey="clubName"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("clubName")}
                />
                <SortableHeader
                  label="Apps"
                  sortKey="appearances"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("appearances")}
                />
                <SortableHeader
                  label="Goals"
                  sortKey="goals"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("goals")}
                />
                <SortableHeader
                  label="Assists"
                  sortKey="assists"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("assists")}
                />
                <SortableHeader
                  label="Mins"
                  sortKey="minutesPlayed"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("minutesPlayed")}
                />
                <SortableHeader
                  label="YC"
                  sortKey="yellowCards"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("yellowCards")}
                />
                <SortableHeader
                  label="RC"
                  sortKey="redCards"
                  currentKey={sortConfig.key as string}
                  direction={sortConfig.direction}
                  onSort={() => requestSort("redCards")}
                />
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((row) => (
                <tr key={row.playerId}>
                  <td className="font-medium">{row.playerName}</td>
                  <td>{row.clubName}</td>
                  <td className="text-center">{row.appearances}</td>
                  <td className="text-center font-semibold">{row.goals}</td>
                  <td className="text-center">{row.assists}</td>
                  <td className="text-center">{row.minutesPlayed.toLocaleString()}</td>
                  <td className="text-center">{row.yellowCards}</td>
                  <td className="text-center">{row.redCards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-500">No stats available for this season.</p>
      )}
    </div>
  );
}
