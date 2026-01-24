import {
  getCompletedMatches,
  getScheduledMatches,
  getClubName,
  formatDate,
  formatScore,
} from "@/lib/data";

export default function MatchesPage() {
  const completedMatches = getCompletedMatches();
  const scheduledMatches = getScheduledMatches();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Matches</h1>
      <p className="text-neutral-500 mb-8">Fixtures and results.</p>

      {/* Scheduled matches */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4">Scheduled</h2>
        {scheduledMatches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Kickoff</th>
                  <th>Home</th>
                  <th>Away</th>
                  <th>Competition</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {scheduledMatches.map((match) => (
                  <tr key={match.id}>
                    <td>{formatDate(match.date)}</td>
                    <td className="text-neutral-500">{match.kickoff ?? "—"}</td>
                    <td className="font-medium">{getClubName(match.homeClubId)}</td>
                    <td className="font-medium">{getClubName(match.awayClubId)}</td>
                    <td className="text-neutral-500">{match.competition}</td>
                    <td className="text-neutral-500">{match.venue ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-neutral-500">No scheduled matches.</p>
        )}
      </section>

      {/* Completed matches */}
      <section>
        <h2 className="text-lg font-medium mb-4">Results</h2>
        {completedMatches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Home</th>
                  <th>Score</th>
                  <th>Away</th>
                  <th>Competition</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {completedMatches.map((match) => (
                  <tr key={match.id}>
                    <td>{formatDate(match.date)}</td>
                    <td className="font-medium">{getClubName(match.homeClubId)}</td>
                    <td className="font-mono text-center">
                      {formatScore(match.homeScore, match.awayScore)}
                    </td>
                    <td className="font-medium">{getClubName(match.awayClubId)}</td>
                    <td className="text-neutral-500">{match.competition}</td>
                    <td className="text-neutral-500">
                      {match.attendance?.toLocaleString() ?? "—"}
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
    </div>
  );
}
