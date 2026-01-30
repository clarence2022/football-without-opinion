"use client";

import { useState } from "react";
import {
  getLeagues,
  getSeasonsByCompetition,
  getStandingsBySeason,
  getClubName,
  getCompetitionName,
} from "@/lib/data";

export default function StandingsPage() {
  const leagues = getLeagues();
  const [selectedLeagueId, setSelectedLeagueId] = useState(leagues[0]?.id ?? "");

  const seasons = selectedLeagueId ? getSeasonsByCompetition(selectedLeagueId) : [];
  const completedSeasons = seasons.filter((s) => s.status === "completed");
  const [selectedSeasonId, setSelectedSeasonId] = useState(completedSeasons[0]?.id ?? "");

  const standings = selectedSeasonId ? getStandingsBySeason(selectedSeasonId) : [];

  const handleLeagueChange = (leagueId: string) => {
    setSelectedLeagueId(leagueId);
    const newSeasons = getSeasonsByCompetition(leagueId).filter((s) => s.status === "completed");
    setSelectedSeasonId(newSeasons[0]?.id ?? "");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Standings</h1>
      <p className="text-neutral-500 mb-8">League tables and final positions.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label htmlFor="league-select" className="block text-sm text-neutral-500 mb-2">
            League
          </label>
          <select
            id="league-select"
            value={selectedLeagueId}
            onChange={(e) => handleLeagueChange(e.target.value)}
            className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="season-select" className="block text-sm text-neutral-500 mb-2">
            Season
          </label>
          <select
            id="season-select"
            value={selectedSeasonId}
            onChange={(e) => setSelectedSeasonId(e.target.value)}
            className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            {completedSeasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Standings table */}
      {standings.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-medium mb-4">
            {getCompetitionName(selectedLeagueId)} {completedSeasons.find((s) => s.id === selectedSeasonId)?.name}
          </h2>
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th className="text-left">Club</th>
                <th className="w-12">P</th>
                <th className="w-12">W</th>
                <th className="w-12">D</th>
                <th className="w-12">L</th>
                <th className="w-12">GF</th>
                <th className="w-12">GA</th>
                <th className="w-12">GD</th>
                <th className="w-14">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.clubId}>
                  <td className="text-center text-neutral-500">{row.position}</td>
                  <td className="font-medium">{getClubName(row.clubId)}</td>
                  <td className="text-center">{row.played}</td>
                  <td className="text-center">{row.won}</td>
                  <td className="text-center">{row.drawn}</td>
                  <td className="text-center">{row.lost}</td>
                  <td className="text-center">{row.goalsFor}</td>
                  <td className="text-center">{row.goalsAgainst}</td>
                  <td className="text-center">
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>
                  <td className="text-center font-semibold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-500">No standings data available for this selection.</p>
      )}
    </div>
  );
}
