export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">About</h1>
      <p className="text-neutral-500 mb-8">The rules of this site.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium mb-3">Principle</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This site presents football facts. No opinion, no interpretation, no analysis.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">What this site contains</h2>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>Match results (date, score, attendance)</li>
            <li>Scheduled fixtures (date, time, venue)</li>
            <li>Transfers (player, clubs, fee, date)</li>
            <li>Squad data (players, positions, minutes, contracts)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">What this site does not contain</h2>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>Adjectives</li>
            <li>Speculation</li>
            <li>Predictions</li>
            <li>Rankings based on subjective criteria</li>
            <li>Player ratings</li>
            <li>Match reports</li>
            <li>Transfer rumors</li>
            <li>Commentary</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Unknown data</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            When a fact is unknown, it is displayed as empty or marked with a dash (—).
            This site does not guess, estimate, or infer missing information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Data sources</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Data is sourced from official club announcements and verified records.
            Unverified information is not included.
          </p>
        </section>
      </div>
    </div>
  );
}
