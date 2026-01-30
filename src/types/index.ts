// Strict TypeScript schemas for Football Without Opinion
// All fields are either verified facts or null (unknown)

export interface Club {
  id: string;
  name: string;
  country: string;
  league: string;
  founded: number | null;
  stadium: string | null;
  capacity: number | null;
}

export interface Player {
  id: string;
  name: string;
  dateOfBirth: string | null; // ISO date string
  nationality: string;
  position: string;
  clubId: string | null;
  shirtNumber: number | null;
  contractEnd: string | null; // ISO date string
  heightCm: number | null;
}

export interface Match {
  id: string;
  homeClubId: string;
  awayClubId: string;
  date: string; // ISO date string
  kickoff: string | null; // HH:MM format
  competition: string;
  venue: string | null;
  homeScore: number | null; // null if not yet played
  awayScore: number | null;
  attendance: number | null;
  status: "scheduled" | "completed" | "postponed" | "cancelled";
}

export interface Transfer {
  id: string;
  playerId: string;
  fromClubId: string | null; // null if free agent
  toClubId: string | null; // null if released
  date: string; // ISO date string
  feeEur: number | null; // null if undisclosed
  feeType: "transfer" | "loan" | "free" | "undisclosed";
}

export interface SquadPlayer extends Player {
  minutesPlayed: number;
  appearances: number;
}

// Competition types
export interface Competition {
  id: string;
  name: string;
  country: string | null;
  type: "league" | "cup";
  founded: number | null;
  numberOfTeams: number | null;
  confederation: string;
}

export interface Season {
  id: string;
  competitionId: string;
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: "in_progress" | "completed" | "upcoming";
}

export interface Standing {
  seasonId: string;
  clubId: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// Stadium types
export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  opened: number | null;
  surfaceType: string;
  clubId: string | null; // null for shared stadiums
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Manager types
export interface Manager {
  id: string;
  name: string;
  dateOfBirth: string | null; // ISO date string
  nationality: string;
  currentClubId: string | null;
  appointedDate: string | null; // ISO date string
}

export interface ManagerHistory {
  managerId: string;
  clubId: string;
  startDate: string; // ISO date string
  endDate: string | null; // null if current
}

// Player statistics
export interface PlayerStats {
  playerId: string;
  seasonId: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  starts: number;
  substituteIn: number;
  substituteOut: number;
}

// Season squads
export type SeasonSquads = Record<string, Record<string, string[]>>;

// Event type for the home page feed
export type FootballEvent =
  | { type: "match"; data: Match; timestamp: string }
  | { type: "transfer"; data: Transfer; timestamp: string };
