import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';
import { RouterLink } from '../routerLink';

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink to='#' className={styles.logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
