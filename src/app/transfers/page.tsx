import {
  getTransfers,
  getClubName,
  getPlayerName,
  formatDate,
  formatFee,
} from "@/lib/data";

export default function TransfersPage() {
  const transfers = getTransfers();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Transfers</h1>
      <p className="text-neutral-500 mb-8">Recorded player movements.</p>

      {transfers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Player</th>
                <th>From</th>
                <th>To</th>
                <th>Fee</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td>{formatDate(transfer.date)}</td>
                  <td className="font-medium">{getPlayerName(transfer.playerId)}</td>
                  <td>{getClubName(transfer.fromClubId)}</td>
                  <td>{getClubName(transfer.toClubId)}</td>
                  <td className="font-mono">
                    {formatFee(transfer.feeEur, transfer.feeType)}
                  </td>
                  <td className="text-neutral-500 capitalize">{transfer.feeType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-500">No transfers recorded.</p>
      )}
    </div>
  );
}
