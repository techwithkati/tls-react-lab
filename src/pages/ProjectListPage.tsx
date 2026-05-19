import { useProjects } from '../hooks/useProjects';
import { ProjectForm } from '../components/ProjectForm';
import { ProjectItem } from '../components/ProjectItem';

export function ProjectListPage() {
  const { projects, add, rename, remove } = useProjects();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">TLS React Lab</h1>
        <p className="text-sm text-slate-600">Projects</p>
      </header>

      <ProjectForm onSubmit={add} />

      {projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects yet. Add one above.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onRename={rename}
              onDelete={remove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
