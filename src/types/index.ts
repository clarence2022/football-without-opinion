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

// Event type for the home page feed
export type FootballEvent =
  | { type: "match"; data: Match; timestamp: string }
  | { type: "transfer"; data: Transfer; timestamp: string };
