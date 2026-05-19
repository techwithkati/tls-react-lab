import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Project } from '../types';
import { getProject } from '../data/projectsRepo';
import { useTasks } from '../hooks/useTasks';
import { useChangeLog } from '../hooks/useChangeLog';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { ChangeLogForm } from '../components/ChangeLogForm';
import { ChangeLogList } from '../components/ChangeLogList';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const id = projectId ?? '';
  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    setProject(getProject(id));
  }, [id]);

  const tasks = useTasks(id);
  const changeLog = useChangeLog(id);

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-slate-500">Project not found.</p>
        <Link to="/" className="text-sm text-blue-700 hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-6">
      <header className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-sm text-blue-700 hover:underline">
            ← Projects
          </Link>
          <h1 className="text-2xl font-bold">{project.name}</h1>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <TaskForm onSubmit={tasks.add} />
        <TaskList
          tasks={tasks.tasks}
          onRename={tasks.rename}
          onStatusChange={tasks.setStatus}
          onDelete={tasks.remove}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">AI change log</h2>
        <ChangeLogForm onSubmit={changeLog.add} />
        <ChangeLogList
          entries={changeLog.entries}
          onChecklistChange={changeLog.updateChecklistFor}
          onToggleReviewed={changeLog.toggleReviewed}
          onDelete={changeLog.remove}
        />
      </section>
    </div>
  );
}
