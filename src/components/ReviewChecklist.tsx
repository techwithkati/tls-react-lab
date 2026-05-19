import type { ReviewChecklist as Checklist } from '../types';

type Props = {
  checklist: Checklist;
  onChange: (next: Checklist) => void;
};

const ITEMS: { key: keyof Checklist; label: string }[] = [
  { key: 'testsReviewed', label: 'Tests reviewed' },
  { key: 'edgeCasesChecked', label: 'Edge cases checked' },
  { key: 'typesChecked', label: 'Types checked' },
  { key: 'manualReviewCompleted', label: 'Manual review completed' },
];

export function ReviewChecklist({ checklist, onChange }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {ITEMS.map((item) => (
        <li key={item.key}>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={checklist[item.key]}
              onChange={(e) =>
                onChange({ ...checklist, [item.key]: e.target.checked })
              }
            />
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
