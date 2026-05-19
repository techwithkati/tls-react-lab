import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

type Props = {
  project: Project;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export function ProjectItem({ project, onRename, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(project.name);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== project.name) onRename(project.id, trimmed);
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between rounded border border-slate-200 px-3 py-2">
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') {
              setDraft(project.name);
              setEditing(false);
            }
          }}
          aria-label="Edit project name"
          className="flex-1 rounded border border-slate-300 px-2 py-1"
        />
      ) : (
        <Link to={`/projects/${project.id}`} className="flex-1 font-medium hover:underline">
          {project.name}
        </Link>
      )}
      <div className="ml-3 flex gap-2">
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setDraft(project.name);
              setEditing(true);
            }}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(project.id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
