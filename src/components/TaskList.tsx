import type { Task, TaskStatus } from '../types';
import { TaskItem } from './TaskItem';

type Props = {
  tasks: Task[];
  onRename: (id: string, title: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
};

export function TaskList({ tasks, onRename, onStatusChange, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-slate-500">No tasks yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onRename={onRename}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
