import { useCallback, useEffect, useState } from 'react';
import type { Project } from '../types';
import {
  createProject,
  deleteProject,
  listProjects,
  renameProject,
} from '../data/projectsRepo';
import { deleteTasksForProject } from '../data/tasksRepo';
import { deleteChangeLogForProject } from '../data/changeLogRepo';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const refresh = useCallback(() => {
    setProjects(listProjects());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    (name: string) => {
      createProject(name);
      refresh();
    },
    [refresh],
  );

  const rename = useCallback(
    (id: string, name: string) => {
      renameProject(id, name);
      refresh();
    },
    [refresh],
  );

  const remove = useCallback(
    (id: string) => {
      deleteProject(id);
      deleteTasksForProject(id);
      deleteChangeLogForProject(id);
      refresh();
    },
    [refresh],
  );

  return { projects, add, rename, remove, refresh };
}
