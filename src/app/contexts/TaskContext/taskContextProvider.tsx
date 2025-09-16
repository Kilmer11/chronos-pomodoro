import { useEffect, useReducer } from 'react';
import { TaskContext } from './taskContext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../../workers/timerWorkerManage';
import { TaskActionTypes } from './taskActions';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: Number(countDownSeconds) },
      });
    }
  });

  useEffect(() => {
    console.log(state);

    if (!state.activeTask) {
      console.log('Worker terminado por falta de task ativa!');
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
