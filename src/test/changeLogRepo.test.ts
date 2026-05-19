import { describe, expect, it } from 'vitest';
import {
  createChangeLogEntry,
  deleteChangeLogEntry,
  listChangeLog,
  setReviewed,
  updateChecklist,
} from '../data/changeLogRepo';

const PROJECT_ID = 'project-1';

describe('changeLogRepo', () => {
  it('creates an AI change log entry with an empty checklist', () => {
    const entry = createChangeLogEntry(PROJECT_ID, {
      title: 'Refactor data layer',
      filesTouched: ['src/data/storage.ts', 'src/data/projectsRepo.ts'],
      riskLevel: 'medium',
      reviewed: false,
      notes: 'Extracted storage adapter to its own module.',
    });

    expect(entry.id).toBeTruthy();
    expect(entry.title).toBe('Refactor data layer');
    expect(entry.filesTouched).toHaveLength(2);
    expect(entry.riskLevel).toBe('medium');
    expect(entry.reviewed).toBe(false);
    expect(entry.checklist).toEqual({
      testsReviewed: false,
      edgeCasesChecked: false,
      typesChecked: false,
      manualReviewCompleted: false,
    });
    expect(listChangeLog(PROJECT_ID)).toHaveLength(1);
  });

  it('throws when title is empty', () => {
    expect(() =>
      createChangeLogEntry(PROJECT_ID, {
        title: '   ',
        filesTouched: [],
        riskLevel: 'low',
        reviewed: false,
        notes: '',
      }),
    ).toThrow();
  });

  it('updates the review checklist', () => {
    const entry = createChangeLogEntry(PROJECT_ID, {
      title: 'Add tests',
      filesTouched: [],
      riskLevel: 'low',
      reviewed: false,
      notes: '',
    });
    const updated = updateChecklist(entry.id, {
      testsReviewed: true,
      edgeCasesChecked: true,
      typesChecked: false,
      manualReviewCompleted: false,
    });
    expect(updated?.checklist.testsReviewed).toBe(true);
    expect(updated?.checklist.edgeCasesChecked).toBe(true);
  });

  it('toggles the reviewed flag', () => {
    const entry = createChangeLogEntry(PROJECT_ID, {
      title: 't',
      filesTouched: [],
      riskLevel: 'low',
      reviewed: false,
      notes: '',
    });
    const updated = setReviewed(entry.id, true);
    expect(updated?.reviewed).toBe(true);
  });

  it('scopes listChangeLog to a project and supports delete', () => {
    const mine = createChangeLogEntry(PROJECT_ID, {
      title: 'mine',
      filesTouched: [],
      riskLevel: 'low',
      reviewed: false,
      notes: '',
    });
    createChangeLogEntry('other', {
      title: 'theirs',
      filesTouched: [],
      riskLevel: 'low',
      reviewed: false,
      notes: '',
    });
    expect(listChangeLog(PROJECT_ID)).toHaveLength(1);

    deleteChangeLogEntry(mine.id);
    expect(listChangeLog(PROJECT_ID)).toHaveLength(0);
    expect(listChangeLog('other')).toHaveLength(1);
  });
});
