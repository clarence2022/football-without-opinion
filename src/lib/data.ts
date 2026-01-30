import {
  Club,
  Player,
  Match,
  Transfer,
  SquadPlayer,
  FootballEvent,
  Competition,
  Season,
  Standing,
  Stadium,
  Manager,
  ManagerHistory,
  PlayerStats,
  SeasonSquads,
} from "@/types";
import clubsData from "@/data/clubs.json";
import playersData from "@/data/players.json";
import matchesData from "@/data/matches.json";
import transfersData from "@/data/transfers.json";
import squadsData from "@/data/squads.json";
import competitionsData from "@/data/competitions.json";
import seasonsData from "@/data/seasons.json";
import standingsData from "@/data/standings.json";
import stadiumsData from "@/data/stadiums.json";
import managersData from "@/data/managers.json";
import managerHistoryData from "@/data/manager-history.json";
import playerStatsData from "@/data/player-stats.json";
import seasonSquadsData from "@/data/season-squads.json";

// Type assertions for JSON imports
const clubs: Club[] = clubsData as Club[];
const players: Player[] = playersData as Player[];
const matches: Match[] = matchesData as Match[];
const transfers: Transfer[] = transfersData as Transfer[];
const squads: Record<string, { playerId: string; minutesPlayed: number; appearances: number }[]> =
  squadsData as Record<string, { playerId: string; minutesPlayed: number; appearances: number }[]>;
const competitions: Competition[] = competitionsData as Competition[];
const seasons: Season[] = seasonsData as Season[];
const standings: Standing[] = standingsData as Standing[];
const stadiums: Stadium[] = stadiumsData as Stadium[];
const managers: Manager[] = managersData as Manager[];
const managerHistory: ManagerHistory[] = managerHistoryData as ManagerHistory[];
const playerStats: PlayerStats[] = playerStatsData as PlayerStats[];
const seasonSquads: SeasonSquads = seasonSquadsData as SeasonSquads;

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

// Competition functions
export function getCompetitions(): Competition[] {
  return competitions;
}

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function getCompetitionName(id: string): string {
  const competition = getCompetitionById(id);
  return competition?.name ?? "—";
}

export function getLeagues(): Competition[] {
  return competitions.filter((c) => c.type === "league");
}

export function getCups(): Competition[] {
  return competitions.filter((c) => c.type === "cup");
}

// Season functions
export function getSeasons(): Season[] {
  return seasons.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getSeasonById(id: string): Season | undefined {
  return seasons.find((s) => s.id === id);
}

export function getSeasonsByCompetition(competitionId: string): Season[] {
  return seasons
    .filter((s) => s.competitionId === competitionId)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getCurrentSeasons(): Season[] {
  return seasons.filter((s) => s.status === "in_progress");
}

// Standing functions
export function getStandings(): Standing[] {
  return standings;
}

export function getStandingsBySeason(seasonId: string): Standing[] {
  return standings
    .filter((s) => s.seasonId === seasonId)
    .sort((a, b) => a.position - b.position);
}

// Stadium functions
export function getStadiums(): Stadium[] {
  return stadiums;
}

export function getStadiumById(id: string): Stadium | undefined {
  return stadiums.find((s) => s.id === id);
}

export function getStadiumByClub(clubId: string): Stadium | undefined {
  return stadiums.find((s) => s.clubId === clubId);
}

// Manager functions
export function getManagers(): Manager[] {
  return managers;
}

export function getManagerById(id: string): Manager | undefined {
  return managers.find((m) => m.id === id);
}

export function getManagerName(id: string): string {
  const manager = getManagerById(id);
  return manager?.name ?? "—";
}

export function getManagerByClub(clubId: string): Manager | undefined {
  return managers.find((m) => m.currentClubId === clubId);
}

export function getManagerHistory(): ManagerHistory[] {
  return managerHistory.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getManagerHistoryByManager(managerId: string): ManagerHistory[] {
  return managerHistory
    .filter((h) => h.managerId === managerId)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getManagerHistoryByClub(clubId: string): ManagerHistory[] {
  return managerHistory
    .filter((h) => h.clubId === clubId)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

// Player stats functions
export function getPlayerStats(): PlayerStats[] {
  return playerStats;
}

export function getPlayerStatsByPlayer(playerId: string): PlayerStats[] {
  return playerStats.filter((s) => s.playerId === playerId);
}

export function getPlayerStatsBySeason(seasonId: string): PlayerStats[] {
  return playerStats.filter((s) => s.seasonId === seasonId);
}

export function getPlayerSeasonStats(playerId: string, seasonId: string): PlayerStats | undefined {
  return playerStats.find((s) => s.playerId === playerId && s.seasonId === seasonId);
}

// Season squads functions
export function getSeasonSquads(): SeasonSquads {
  return seasonSquads;
}

export function getClubSeasonSquad(clubId: string, season: string): string[] {
  return seasonSquads[clubId]?.[season] || [];
}

export function getClubSeasons(clubId: string): string[] {
  return Object.keys(seasonSquads[clubId] || {});
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
