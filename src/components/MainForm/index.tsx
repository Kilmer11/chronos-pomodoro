import styles from './styles.module.css';

import { Input } from '../Input';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
  return (
    <form action='' className={styles.form}>
      <div className={styles.formRow}>
        <Input
          id='input'
          type='text'
          labelText='task'
          placeholder='Type something'
        />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <Cycles />
      </div>

      <div className={styles.formRow}>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
