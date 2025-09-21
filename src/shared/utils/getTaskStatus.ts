import type { TaskModel } from '../models/taskModel';

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completedDate) return 'Completed';
  if (task.interruptedDate) return 'Interrupted';
  if (task.id === activeTask?.id) return 'In progress';
  return 'Abondoned';
}
