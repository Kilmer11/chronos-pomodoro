import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import { useEffect, useState, type ReactElement } from 'react';
import styles from './styles.module.css';

type AvailableTheme = 'dark' | 'light';

type MenuElements = {
  element: ReactElement;
  ariaLabel: string;
  title: string;
  func?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function Menu() {
  const [theme, setTheme] = useState<AvailableTheme>('dark');

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const elements: MenuElements[] = [
    {
      element: <HouseIcon />,
      ariaLabel: 'Go to Home Page',
      title: 'Go to Home Page',
    },
    {
      element: <HistoryIcon />,
      ariaLabel: 'See History',
      title: 'See History',
    },
    { element: <SettingsIcon />, ariaLabel: 'Settings', title: 'Settings' },
    {
      element: <SunIcon />,
      ariaLabel: 'Change Theme',
      title: 'Change Theme',
      func: handleThemeChange,
    },
  ];

  return (
    <nav className={styles.menu}>
      {elements.map(({ element, ariaLabel, title, func }) => (
        <a
          key={title}
          className={styles.menuLink}
          href='#'
          aria-label={ariaLabel}
          title={title}
          onClick={func}
        >
          {element}
        </a>
      ))}
    </nav>
  );
}
