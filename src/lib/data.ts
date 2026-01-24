import { Club, Player, Match, Transfer, SquadPlayer, FootballEvent } from "@/types";
import clubsData from "@/data/clubs.json";
import playersData from "@/data/players.json";
import matchesData from "@/data/matches.json";
import transfersData from "@/data/transfers.json";
import squadsData from "@/data/squads.json";

// Type assertions for JSON imports
const clubs: Club[] = clubsData as Club[];
const players: Player[] = playersData as Player[];
const matches: Match[] = matchesData as Match[];
const transfers: Transfer[] = transfersData as Transfer[];
const squads: Record<string, { playerId: string; minutesPlayed: number; appearances: number }[]> =
  squadsData as Record<string, { playerId: string; minutesPlayed: number; appearances: number }[]>;

// Club functions
export function getClubs(): Club[] {
  return clubs;
}

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id);
}

export function getClubName(id: string | null): string {
  if (!id) return "—";
  const club = getClubById(id);
  return club?.name ?? "—";
}

// Player functions
export function getPlayers(): Player[] {
  return players;
}

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function getPlayerName(id: string): string {
  const player = getPlayerById(id);
  return player?.name ?? "—";
}

export function getPlayersByClub(clubId: string): Player[] {
  return players.filter((p) => p.clubId === clubId);
}

// Match functions
export function getMatches(): Match[] {
  return matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCompletedMatches(): Match[] {
  return getMatches().filter((m) => m.status === "completed");
}

export function getScheduledMatches(): Match[] {
  return getMatches()
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Transfer functions
export function getTransfers(): Transfer[] {
  return transfers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Squad functions
export function getSquadByClub(clubId: string): SquadPlayer[] {
  const squadEntries = squads[clubId] || [];
  return squadEntries
    .map((entry) => {
      const player = getPlayerById(entry.playerId);
      if (!player) return null;
      return {
        ...player,
        minutesPlayed: entry.minutesPlayed,
        appearances: entry.appearances,
      };
    })
    .filter((p): p is SquadPlayer => p !== null);
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: string | null): number | null {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Events for home page
export function getRecentEvents(limit: number = 10): FootballEvent[] {
  const matchEvents: FootballEvent[] = getCompletedMatches().map((match) => ({
    type: "match",
    data: match,
    timestamp: match.date,
  }));

  const transferEvents: FootballEvent[] = getTransfers().map((transfer) => ({
    type: "transfer",
    data: transfer,
    timestamp: transfer.date,
  }));

  return [...matchEvents, ...transferEvents]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// Format helpers (no opinion, just formatting)
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatFee(feeEur: number | null, feeType: string): string {
  if (feeType === "free") return "Free";
  if (feeType === "loan") return "Loan";
  if (feeType === "undisclosed" || feeEur === null) return "Undisclosed";
  if (feeEur >= 1000000) {
    return `€${(feeEur / 1000000).toFixed(1)}m`;
  }
  return `€${feeEur.toLocaleString()}`;
}

export function formatScore(home: number | null, away: number | null): string {
  if (home === null || away === null) return "—";
  return `${home} - ${away}`;
}
