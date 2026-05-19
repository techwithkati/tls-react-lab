const PREFIX = 'tls-react-lab';

export const STORAGE_KEYS = {
  projects: `${PREFIX}:projects`,
  tasks: `${PREFIX}:tasks`,
  changelog: `${PREFIX}:changelog`,
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function readCollection<T>(key: StorageKey): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function writeCollection<T>(key: StorageKey, value: T[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
