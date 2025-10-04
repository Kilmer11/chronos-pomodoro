import styles from '../../shared/styles/form.module.css';

import { MainTemplate } from '../../app/templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';

export function Settings() {
  return (
    <MainTemplate>
      <Container>
        <Heading>Settings</Heading>
      </Container>
      <Container>
        <form action='' className={styles.form}>
          <div className={styles.formRow}>
            <Input id='worktime' labelText='Focus' />
          </div>

          <div className={styles.formRow}>
            <Input id='shortBreakTime' labelText='Short break time' />
          </div>

          <div className={styles.formRow}>
            <Input id='longBreakTime' labelText='Long break time' />
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
