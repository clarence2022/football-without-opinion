"use client";

import { useState } from "react";
import { getClubs, getSquadByClub, calculateAge, formatDate } from "@/lib/data";

export default function SquadsPage() {
  const clubs = getClubs();
  const [selectedClubId, setSelectedClubId] = useState(clubs[0]?.id ?? "");

  const squad = selectedClubId ? getSquadByClub(selectedClubId) : [];

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
      {squad.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Position</th>
                <th>Age</th>
                <th>Nationality</th>
                <th>Appearances</th>
                <th>Minutes</th>
                <th>Contract End</th>
              </tr>
            </thead>
            <tbody>
              {squad.map((player) => (
                <tr key={player.id}>
                  <td className="text-neutral-500">{player.shirtNumber ?? "—"}</td>
                  <td className="font-medium">{player.name}</td>
                  <td>{player.position}</td>
                  <td>{calculateAge(player.dateOfBirth) ?? "—"}</td>
                  <td>{player.nationality}</td>
                  <td className="text-center">{player.appearances}</td>
                  <td className="text-center">{player.minutesPlayed.toLocaleString()}</td>
                  <td className="text-neutral-500">
                    {player.contractEnd ? formatDate(player.contractEnd) : "—"}
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
