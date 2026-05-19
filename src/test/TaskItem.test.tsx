import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from '../components/TaskItem';
import type { Task } from '../types';

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    projectId: 'project-1',
    title: 'Write tests',
    status: 'todo',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('<TaskItem />', () => {
  it('cycles status when the badge is clicked', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    render(
      <TaskItem
        task={makeTask({ status: 'todo' })}
        onRename={vi.fn()}
        onStatusChange={onStatusChange}
        onDelete={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /status: todo/i }));
    expect(onStatusChange).toHaveBeenCalledWith('task-1', 'doing');
  });

  it('changes status via the select dropdown', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    render(
      <TaskItem
        task={makeTask({ status: 'todo' })}
        onRename={vi.fn()}
        onStatusChange={onStatusChange}
        onDelete={vi.fn()}
      />,
    );

    await user.selectOptions(screen.getByLabelText(/task status/i), 'done');
    expect(onStatusChange).toHaveBeenCalledWith('task-1', 'done');
  });

  it('calls onDelete when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={makeTask()}
        onRename={vi.fn()}
        onStatusChange={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('task-1');
  });
});
