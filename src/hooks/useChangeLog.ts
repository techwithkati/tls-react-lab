import { useCallback, useEffect, useState } from 'react';
import type { AIChangeLogEntry, ReviewChecklist } from '../types';
import {
  createChangeLogEntry,
  deleteChangeLogEntry,
  listChangeLog,
  setReviewed,
  updateChecklist,
  type ChangeLogInput,
} from '../data/changeLogRepo';

export function useChangeLog(projectId: string) {
  const [entries, setEntries] = useState<AIChangeLogEntry[]>([]);

  const refresh = useCallback(() => {
    setEntries(listChangeLog(projectId));
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    (input: ChangeLogInput) => {
      createChangeLogEntry(projectId, input);
      refresh();
    },
    [projectId, refresh],
  );

  const updateChecklistFor = useCallback(
    (id: string, checklist: ReviewChecklist) => {
      updateChecklist(id, checklist);
      refresh();
    },
    [refresh],
  );

  const toggleReviewed = useCallback(
    (id: string, reviewed: boolean) => {
      setReviewed(id, reviewed);
      refresh();
    },
    [refresh],
  );

  const remove = useCallback(
    (id: string) => {
      deleteChangeLogEntry(id);
      refresh();
    },
    [refresh],
  );

  return { entries, add, updateChecklistFor, toggleReviewed, remove, refresh };
}
