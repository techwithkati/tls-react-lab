import type { AIChangeLogEntry, ReviewChecklist, RiskLevel } from '../types';
import { EMPTY_CHECKLIST } from '../types';
import {
  STORAGE_KEYS,
  generateId,
  nowIso,
  readCollection,
  writeCollection,
} from './storage';

function readAll(): AIChangeLogEntry[] {
  return readCollection<AIChangeLogEntry>(STORAGE_KEYS.changelog);
}

function writeAll(entries: AIChangeLogEntry[]): void {
  writeCollection(STORAGE_KEYS.changelog, entries);
}

export function listChangeLog(projectId: string): AIChangeLogEntry[] {
  return readAll().filter((e) => e.projectId === projectId);
}

export type ChangeLogInput = {
  title: string;
  filesTouched: string[];
  riskLevel: RiskLevel;
  reviewed: boolean;
  notes: string;
};

export function createChangeLogEntry(
  projectId: string,
  input: ChangeLogInput,
): AIChangeLogEntry {
  const title = input.title.trim();
  if (!title) throw new Error('Change log title is required');
  const entry: AIChangeLogEntry = {
    id: generateId(),
    projectId,
    title,
    filesTouched: input.filesTouched.map((f) => f.trim()).filter(Boolean),
    riskLevel: input.riskLevel,
    reviewed: input.reviewed,
    notes: input.notes.trim(),
    checklist: { ...EMPTY_CHECKLIST },
    createdAt: nowIso(),
  };
  writeAll([...readAll(), entry]);
  return entry;
}

export function updateChecklist(
  id: string,
  checklist: ReviewChecklist,
): AIChangeLogEntry | undefined {
  let updated: AIChangeLogEntry | undefined;
  const next = readAll().map((e) => {
    if (e.id !== id) return e;
    updated = { ...e, checklist };
    return updated;
  });
  if (updated) writeAll(next);
  return updated;
}

export function setReviewed(id: string, reviewed: boolean): AIChangeLogEntry | undefined {
  let updated: AIChangeLogEntry | undefined;
  const next = readAll().map((e) => {
    if (e.id !== id) return e;
    updated = { ...e, reviewed };
    return updated;
  });
  if (updated) writeAll(next);
  return updated;
}

export function deleteChangeLogEntry(id: string): void {
  writeAll(readAll().filter((e) => e.id !== id));
}

export function deleteChangeLogForProject(projectId: string): void {
  writeAll(readAll().filter((e) => e.projectId !== projectId));
}
