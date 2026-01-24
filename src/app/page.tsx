import {
  getRecentEvents,
  getClubName,
  getPlayerName,
  formatDate,
  formatScore,
  formatFee,
} from "@/lib/data";
import { Match, Transfer } from "@/types";

function MatchEvent({ match }: { match: Match }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex-1">
        <div className="text-sm text-neutral-500 mb-1">
          {match.competition} · {formatDate(match.date)}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium">{getClubName(match.homeClubId)}</span>
          <span className="text-neutral-400 font-mono">
            {formatScore(match.homeScore, match.awayScore)}
          </span>
          <span className="font-medium">{getClubName(match.awayClubId)}</span>
        </div>
      </div>
    </div>
  );
}

function TransferEvent({ transfer }: { transfer: Transfer }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex-1">
        <div className="text-sm text-neutral-500 mb-1">
          Transfer · {formatDate(transfer.date)}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">{getPlayerName(transfer.playerId)}</span>
          <span className="text-neutral-400">
            {getClubName(transfer.fromClubId)} → {getClubName(transfer.toClubId)}
          </span>
          <span className="text-neutral-500 text-sm">
            ({formatFee(transfer.feeEur, transfer.feeType)})
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const events = getRecentEvents(10);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Events</h1>
      <p className="text-neutral-500 mb-8">Recorded matches and transfers.</p>

      <div className="space-y-0">
        {events.map((event, index) => {
          if (event.type === "match") {
            return <MatchEvent key={`match-${index}`} match={event.data} />;
          } else {
            return <TransferEvent key={`transfer-${index}`} transfer={event.data} />;
          }
        })}
      </div>

      {events.length === 0 && (
        <p className="text-neutral-500">No events recorded.</p>
      )}
    </div>
  );
}
