import styles from './styles.module.css';

import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../app/templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultButton } from '../../components/DefaultButton';
import { useTaskContext } from '../../app/contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../shared/models/taskModel';

export function History() {
  const { state } = useTaskContext();

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {state.tasks.map((task: TaskModel) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration} min</td>
                  <td>{new Date(task.startDate).toISOString()}</td>
                  <td>
                    {task.completedDate
                      ? 'Completed'
                      : task.interruptedDate
                        ? 'Interrupted'
                        : 'Abandoned'}
                  </td>
                  <td>{task.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
