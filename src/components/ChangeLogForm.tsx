import { useState } from 'react';
import type { RiskLevel } from '../types';
import { RISK_LEVELS } from '../types';
import type { ChangeLogInput } from '../data/changeLogRepo';

type Props = {
  onSubmit: (input: ChangeLogInput) => void;
};

export function ChangeLogForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [filesTouched, setFilesTouched] = useState('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('low');
  const [reviewed, setReviewed] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit({
      title: trimmed,
      filesTouched: filesTouched
        .split(/[\n,]/)
        .map((f) => f.trim())
        .filter(Boolean),
      riskLevel,
      reviewed,
      notes,
    });
    setTitle('');
    setFilesTouched('');
    setRiskLevel('low');
    setReviewed(false);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded border border-slate-200 p-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Change log title"
        className="rounded border border-slate-300 px-3 py-2"
      />
      <textarea
        value={filesTouched}
        onChange={(e) => setFilesTouched(e.target.value)}
        placeholder="Files touched (comma or newline separated)"
        aria-label="Files touched"
        rows={2}
        className="rounded border border-slate-300 px-3 py-2"
      />
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          Risk:
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
            aria-label="Risk level"
            className="rounded border border-slate-300 px-2 py-1"
          >
            {RISK_LEVELS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={(e) => setReviewed(e.target.checked)}
          />
          Reviewed
        </label>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        aria-label="Change log notes"
        rows={3}
        className="rounded border border-slate-300 px-3 py-2"
      />
      <button
        type="submit"
        className="self-start rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
      >
        Add change log entry
      </button>
    </form>
  );
}
