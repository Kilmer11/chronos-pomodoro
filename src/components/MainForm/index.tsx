import styles from './styles.module.css';

import { useRef } from 'react';
import { Input } from '../Input';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import type { TaskModel } from '../../shared/models/taskModel';
import { v4 as uuidv4 } from 'uuid';
import { useTaskContext } from '../../app/contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../shared/utils/getNextCycle';
import { getNextCycleType } from '../../shared/utils/getNextCycleType';
import { TaskActionTypes } from '../../app/contexts/TaskContext/taskActions';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      taskNameInput.current === null ||
      taskNameInput.current.value.trim() === ''
    )
      return;

    const taskName = taskNameInput.current.value;

    const newTask: TaskModel = {
      id: uuidv4(),
      name: taskName,
      duration: state.config[nextCycleType],
      startDate: Date.now(),
      completedDate: null, // Check later
      interruptedDate: null, // Check later
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className={styles.form}>
      <div className={styles.formRow}>
        <Input
          id='input'
          type='text'
          labelText='task'
          placeholder='Type something'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className={styles.formRow}>
        <p>
          {state.activeTask &&
          getNextCycleType(state.currentCycle) === 'workTime'
            ? 'Focus for'
            : state.activeTask &&
                getNextCycleType(state.currentCycle) !== 'workTime'
              ? 'Rest for'
              : 'Next cycle is'}{' '}
          <b>
            {state.activeTask
              ? state.config[getNextCycleType(state.currentCycle)]
              : state.config[getNextCycleType(nextCycle)]}
            min
          </b>
        </p>
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            key={'submit'}
            type='submit'
            aria-label='Create new task'
            title='Create new task'
            icon={<PlayCircleIcon />}
          />
        )}

        {state.activeTask && (
          <DefaultButton
            key={'button'}
            type='button'
            aria-label='Interrupt the current task'
            title='Interrupt the current task'
            icon={<StopCircleIcon />}
            color='red'
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
