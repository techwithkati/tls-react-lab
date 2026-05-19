import type { Task, TaskStatus } from '../types';
import {
  STORAGE_KEYS,
  generateId,
  nowIso,
  readCollection,
  writeCollection,
} from './storage';

function readAll(): Task[] {
  return readCollection<Task>(STORAGE_KEYS.tasks);
}

function writeAll(tasks: Task[]): void {
  writeCollection(STORAGE_KEYS.tasks, tasks);
}

export function listTasks(projectId: string): Task[] {
  return readAll().filter((t) => t.projectId === projectId);
}

export function createTask(projectId: string, title: string): Task {
  const trimmed = title.trim();
  if (!trimmed) throw new Error('Task title is required');
  const task: Task = {
    id: generateId(),
    projectId,
    title: trimmed,
    status: 'todo',
    createdAt: nowIso(),
  };
  writeAll([...readAll(), task]);
  return task;
}

export function updateTaskTitle(id: string, title: string): Task | undefined {
  const trimmed = title.trim();
  if (!trimmed) throw new Error('Task title is required');
  let updated: Task | undefined;
  const next = readAll().map((t) => {
    if (t.id !== id) return t;
    updated = { ...t, title: trimmed };
    return updated;
  });
  if (updated) writeAll(next);
  return updated;
}

export function setTaskStatus(id: string, status: TaskStatus): Task | undefined {
  let updated: Task | undefined;
  const next = readAll().map((t) => {
    if (t.id !== id) return t;
    updated = { ...t, status };
    return updated;
  });
  if (updated) writeAll(next);
  return updated;
}

export function deleteTask(id: string): void {
  writeAll(readAll().filter((t) => t.id !== id));
}

export function deleteTasksForProject(projectId: string): void {
  writeAll(readAll().filter((t) => t.projectId !== projectId));
}
