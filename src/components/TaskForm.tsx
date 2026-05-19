import { useState } from 'react';

type Props = {
  onSubmit: (title: string) => void;
};

export function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        aria-label="New task title"
        className="flex-1 rounded border border-slate-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
      >
        Add task
      </button>
    </form>
  );
}
