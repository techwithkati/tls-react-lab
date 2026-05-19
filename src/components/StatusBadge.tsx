import type { TaskStatus } from '../types';

const STYLES: Record<TaskStatus, string> = {
  todo: 'bg-slate-200 text-slate-800',
  doing: 'bg-blue-200 text-blue-900',
  done: 'bg-green-200 text-green-900',
  blocked: 'bg-red-200 text-red-900',
};

type Props = {
  status: TaskStatus;
  onClick?: () => void;
};

export function StatusBadge({ status, onClick }: Props) {
  const className = `inline-block rounded px-2 py-0.5 text-xs font-medium ${STYLES[status]}`;
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Status: ${status}. Click to cycle.`}
        className={`${className} cursor-pointer hover:opacity-80`}
      >
        {status}
      </button>
    );
  }
  return <span className={className}>{status}</span>;
}
