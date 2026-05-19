import { describe, expect, it } from 'vitest';
import {
  createTask,
  deleteTask,
  deleteTasksForProject,
  listTasks,
  setTaskStatus,
  updateTaskTitle,
} from '../data/tasksRepo';

const PROJECT_ID = 'project-1';

describe('tasksRepo', () => {
  it('creates a task with default status "todo"', () => {
    const task = createTask(PROJECT_ID, 'Write tests');
    expect(task.status).toBe('todo');
    expect(task.projectId).toBe(PROJECT_ID);
    expect(listTasks(PROJECT_ID)).toHaveLength(1);
  });

  it('changes task status', () => {
    const task = createTask(PROJECT_ID, 'Ship');
    const updated = setTaskStatus(task.id, 'doing');
    expect(updated?.status).toBe('doing');

    const done = setTaskStatus(task.id, 'done');
    expect(done?.status).toBe('done');

    const blocked = setTaskStatus(task.id, 'blocked');
    expect(blocked?.status).toBe('blocked');
  });

  it('updates a task title', () => {
    const task = createTask(PROJECT_ID, 'Old title');
    updateTaskTitle(task.id, 'New title');
    const [stored] = listTasks(PROJECT_ID);
    expect(stored?.title).toBe('New title');
  });

  it('deletes a single task', () => {
    const a = createTask(PROJECT_ID, 'a');
    createTask(PROJECT_ID, 'b');
    deleteTask(a.id);
    expect(listTasks(PROJECT_ID)).toHaveLength(1);
  });

  it('scopes listTasks to a project', () => {
    createTask(PROJECT_ID, 'mine');
    createTask('other-project', 'theirs');
    expect(listTasks(PROJECT_ID)).toHaveLength(1);
  });

  it('deletes all tasks for a project', () => {
    createTask(PROJECT_ID, 'a');
    createTask(PROJECT_ID, 'b');
    createTask('other', 'c');
    deleteTasksForProject(PROJECT_ID);
    expect(listTasks(PROJECT_ID)).toHaveLength(0);
    expect(listTasks('other')).toHaveLength(1);
  });
});
