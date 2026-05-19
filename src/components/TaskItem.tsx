import { useState } from 'react';
import type { Task, TaskStatus } from '../types';
import { TASK_STATUSES } from '../types';
import { StatusBadge } from './StatusBadge';

type Props = {
  task: Task;
  onRename: (id: string, title: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
};

function nextStatus(current: TaskStatus): TaskStatus {
  const i = TASK_STATUSES.indexOf(current);
  return TASK_STATUSES[(i + 1) % TASK_STATUSES.length];
}

export function TaskItem({ task, onRename, onStatusChange, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== task.title) onRename(task.id, trimmed);
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between gap-3 rounded border border-slate-200 px-3 py-2">
      <StatusBadge
        status={task.status}
        onClick={() => onStatusChange(task.id, nextStatus(task.status))}
      />
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') {
              setDraft(task.title);
              setEditing(false);
            }
          }}
          aria-label="Edit task title"
          className="flex-1 rounded border border-slate-300 px-2 py-1"
        />
      ) : (
        <span className="flex-1">{task.title}</span>
      )}
      <div className="flex gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          aria-label="Task status"
          className="rounded border border-slate-300 px-2 py-1 text-sm"
        >
          {TASK_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setDraft(task.title);
              setEditing(true);
            }}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
