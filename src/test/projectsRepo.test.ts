import { describe, expect, it } from 'vitest';
import {
  createProject,
  deleteProject,
  listProjects,
  renameProject,
} from '../data/projectsRepo';

describe('projectsRepo', () => {
  it('creates a project and persists it', () => {
    const project = createProject('Lab Project');
    expect(project.id).toBeTruthy();
    expect(project.name).toBe('Lab Project');
    expect(project.createdAt).toBeTruthy();
    expect(listProjects()).toHaveLength(1);
  });

  it('trims whitespace from the project name', () => {
    const project = createProject('   Spaced Name   ');
    expect(project.name).toBe('Spaced Name');
  });

  it('throws when the project name is empty after trimming', () => {
    expect(() => createProject('   ')).toThrow();
    expect(listProjects()).toHaveLength(0);
  });

  it('renames an existing project', () => {
    const project = createProject('Original');
    const updated = renameProject(project.id, 'Renamed');
    expect(updated?.name).toBe('Renamed');
    expect(listProjects()[0]?.name).toBe('Renamed');
  });

  it('deletes a project by id', () => {
    const a = createProject('A');
    const b = createProject('B');
    deleteProject(a.id);
    const remaining = listProjects();
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.id).toBe(b.id);
  });
});
