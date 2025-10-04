import type { TaskModel } from '../../../shared/models/taskModel';
import type { TaskStateModel } from '../../../shared/models/taskStateModel';

export const TaskActionType = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_TASK: 'RESET_TASK',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

export type TaskActionTypes =
  (typeof TaskActionType)[keyof typeof TaskActionType];

export type TaskActionModel =
  | {
      type: typeof TaskActionType.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionType.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionType.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    }
  | {
      type: typeof TaskActionType.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionType.RESET_TASK;
    }
  | {
      type: typeof TaskActionType.COMPLETE_TASK;
    };
