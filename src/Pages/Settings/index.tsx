import styles from '../../shared/styles/form.module.css';

import { useRef } from 'react';
import { MainTemplate } from '../../app/templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { useTaskContext } from '../../app/contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionType } from '../../app/contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    showMessage.dismiss();
    const formErrors: string[] = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Type only number for ALL FIELDS!');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Type values between 1 and 99 for focus!');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Type values between 1 and 30 for short break time!');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Type values between 1 and 60 for long break time!');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionType.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success('Form send :)');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Settings</Heading>
      </Container>
      <Container>
        <form onSubmit={e => handleSaveSettings(e)} className={styles.form}>
          <div className={styles.formRow}>
            <Input
              id='worktime'
              labelText='Focus'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>

          <div className={styles.formRow}>
            <Input
              id='shortBreakTime'
              labelText='Short break time'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>

          <div className={styles.formRow}>
            <Input
              id='longBreakTime'
              labelText='Long break time'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>

          <div className={styles.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Save settings'
              title='Save settings'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
