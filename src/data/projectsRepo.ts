import type { Project } from '../types';
import {
  STORAGE_KEYS,
  generateId,
  nowIso,
  readCollection,
  writeCollection,
} from './storage';

export function listProjects(): Project[] {
  return readCollection<Project>(STORAGE_KEYS.projects);
}

export function getProject(id: string): Project | undefined {
  return listProjects().find((p) => p.id === id);
}

export function createProject(name: string): Project {
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Project name is required');
  const project: Project = {
    id: generateId(),
    name: trimmed,
    createdAt: nowIso(),
  };
  writeCollection(STORAGE_KEYS.projects, [...listProjects(), project]);
  return project;
}

export function renameProject(id: string, name: string): Project | undefined {
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Project name is required');
  const projects = listProjects();
  let updated: Project | undefined;
  const next = projects.map((p) => {
    if (p.id !== id) return p;
    updated = { ...p, name: trimmed };
    return updated;
  });
  if (updated) writeCollection(STORAGE_KEYS.projects, next);
  return updated;
}

export function deleteProject(id: string): void {
  const next = listProjects().filter((p) => p.id !== id);
  writeCollection(STORAGE_KEYS.projects, next);
}
