import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import styles from './styles.module.css';

import type { ToastContentProps } from 'react-toastify';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <div className={styles.container}>
      <p>{data}</p>

      <div className={styles.buttonsContainer}>
        <DefaultButton
          onClick={() => closeToast(true)}
          icon={<ThumbsUpIcon />}
          aria-label='Confirm action and close?'
          title='Confirm action and close?'
        />
        <DefaultButton
          onClick={() => closeToast(false)}
          icon={<ThumbsDownIcon />}
          aria-label='Confirm action and close?'
          title='Confirm action and close?'
          color='red'
        />
      </div>
    </div>
  );
}
