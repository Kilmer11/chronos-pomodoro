import styles from './styles.module.css';

import { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../app/templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultButton } from '../../components/DefaultButton';
import { useTaskContext } from '../../app/contexts/TaskContext/useTaskContext';
import { formatDate } from '../../shared/utils/formatDate';
import { getTaskStatus } from '../../shared/utils/getTaskStatus';
import { taskTypeDictionary } from '../../shared/utils/taskTypeDictionary';
import { sortTasks, type SortTasksProps } from '../../shared/utils/sortTask';
import type { TaskModel } from '../../shared/models/taskModel';
import { TaskActionTypes } from '../../app/contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksProps>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        direction: 'asc',
        field: 'name',
      };
    },
  );

  const hasTasks = state.tasks.length > 0;

  function handleSortTasksOptions({ field }: Pick<SortTasksProps, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    dispatch({ type: TaskActionTypes.RESET_TASK });
    setConfirmClearHistory(false);
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm(
      'Are you sure about deleting the history?',
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  const cabecalhos = [
    { label: 'Tarefa', field: 'name' },
    { label: 'Duração', field: 'duration' },
    { label: 'Data', field: 'startDate' },
  ];

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                onClick={handleResetHistory}
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          {hasTasks ? (
            <table>
              <thead>
                <tr>
                  {cabecalhos.map(({ label, field }) => (
                    <th
                      key={field}
                      onClick={() =>
                        handleSortTasksOptions({
                          field: field as keyof TaskModel,
                        })
                      }
                      className={styles.thSort}
                    >
                      {label}
                    </th>
                  ))}
                  <th className={styles.thSort}>Status</th>
                  <th className={styles.thSort}>Type</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map((task: TaskModel) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration} min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.text}>There is not tasks yet :(</h3>
          )}
        </div>
      </Container>
    </MainTemplate>
  );
}
