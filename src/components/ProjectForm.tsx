import { useState } from 'react';

type Props = {
  onSubmit: (name: string) => void;
};

export function ProjectForm({ onSubmit }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New project name"
        aria-label="New project name"
        className="flex-1 rounded border border-slate-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
      >
        Add project
      </button>
    </form>
  );
}
