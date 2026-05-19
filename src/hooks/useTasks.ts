import { useCallback, useEffect, useState } from 'react';
import type { Task, TaskStatus } from '../types';
import {
  createTask,
  deleteTask,
  listTasks,
  setTaskStatus,
  updateTaskTitle,
} from '../data/tasksRepo';

export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = useCallback(() => {
    setTasks(listTasks(projectId));
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    (title: string) => {
      createTask(projectId, title);
      refresh();
    },
    [projectId, refresh],
  );

  const rename = useCallback(
    (id: string, title: string) => {
      updateTaskTitle(id, title);
      refresh();
    },
    [refresh],
  );

  const setStatus = useCallback(
    (id: string, status: TaskStatus) => {
      setTaskStatus(id, status);
      refresh();
    },
    [refresh],
  );

  const remove = useCallback(
    (id: string) => {
      deleteTask(id);
      refresh();
    },
    [refresh],
  );

  return { tasks, add, rename, setStatus, remove, refresh };
}
