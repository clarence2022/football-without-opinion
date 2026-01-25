"use client";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function Filter({ label, value, options, onChange }: FilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-neutral-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
      {children}
    </div>
  );
}
