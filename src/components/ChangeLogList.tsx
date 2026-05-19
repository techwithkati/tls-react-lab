import type { AIChangeLogEntry, ReviewChecklist as Checklist, RiskLevel } from '../types';
import { ReviewChecklist } from './ReviewChecklist';

const RISK_STYLES: Record<RiskLevel, string> = {
  low: 'bg-green-100 text-green-900',
  medium: 'bg-yellow-100 text-yellow-900',
  high: 'bg-red-100 text-red-900',
};

type Props = {
  entries: AIChangeLogEntry[];
  onChecklistChange: (id: string, checklist: Checklist) => void;
  onToggleReviewed: (id: string, reviewed: boolean) => void;
  onDelete: (id: string) => void;
};

export function ChangeLogList({
  entries,
  onChecklistChange,
  onToggleReviewed,
  onDelete,
}: Props) {
  if (entries.length === 0) {
    return <p className="text-sm text-slate-500">No AI change log entries yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {entries.map((entry) => (
        <li key={entry.id} className="rounded border border-slate-200 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium">{entry.title}</h3>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${RISK_STYLES[entry.riskLevel]}`}
                >
                  risk: {entry.riskLevel}
                </span>
                <label className="flex items-center gap-1 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={entry.reviewed}
                    onChange={(e) => onToggleReviewed(entry.id, e.target.checked)}
                  />
                  reviewed
                </label>
              </div>
              {entry.filesTouched.length > 0 && (
                <p className="mt-1 text-xs text-slate-600">
                  Files: {entry.filesTouched.join(', ')}
                </p>
              )}
              {entry.notes && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{entry.notes}</p>
              )}
              <div className="mt-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Review checklist
                </p>
                <ReviewChecklist
                  checklist={entry.checklist}
                  onChange={(next) => onChecklistChange(entry.id, next)}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
