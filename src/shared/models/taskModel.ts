import type { TaskStateModel } from './taskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completedDate: number | null;
  interruptedDate: number | null;
  type: keyof TaskStateModel['config'];
};
