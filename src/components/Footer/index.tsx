import styles from './styles.module.css';
import { RouterLink } from '../routerLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink to='/about-pomodoro'>
        Understand how the pomodoro techinique works
      </RouterLink>
      <RouterLink to='/'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com React
      </RouterLink>
    </footer>
  );
}
