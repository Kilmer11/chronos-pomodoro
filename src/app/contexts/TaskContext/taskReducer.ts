import type { TaskStateModel } from '../../../shared/models/taskStateModel';
import { formatSecondsRemaining } from '../../../shared/utils/formatSecondsRemaining';
import { getNextCycle } from '../../../shared/utils/getNextCycle';
import { getSecondsRemaining } from '../../../shared/utils/getSecondsRemaing';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = getSecondsRemaining(newTask.duration);
      const formattedSecondsRemaining =
        formatSecondsRemaining(secondsRemaining);
      const nextCycle = getNextCycle(state.currentCycle);

      return {
        ...state,
        secondsRemaining,
        formattedSecondsRemaining,
        activeTask: newTask,
        currentCycle: nextCycle,
        tasks: [...state.tasks, newTask],
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptedDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case TaskActionTypes.RESET_TASK: {
      return state;
    }
  }
  return state;
}
