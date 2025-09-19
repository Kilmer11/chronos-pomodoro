import React from 'react';
import { useEffect, useState, type ReactElement } from 'react';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { RouterLink } from '../routerLink';

type AvailableThemes = 'dark' | 'light';

type MenuElements = {
  element: ReactElement | { dark: ReactElement; light: ReactElement };
  ariaLabel: string;
  title: string;
  func?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    return (localStorage.getItem('theme') as AvailableThemes) || 'dark';
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
      element: { dark: <SunIcon />, light: <MoonIcon /> },
      ariaLabel: 'Change Theme',
      title: 'Change Theme',
      func: handleThemeChange,
    },
  ];

  return (
    <nav className={styles.menu}>
      {elements.map(({ element, ariaLabel, title, func }) => (
        <RouterLink
          key={title}
          className={styles.menuLink}
          to='/'
          aria-label={ariaLabel}
          title={title}
          onClick={func}
        >
          {React.isValidElement(element) ? element : element[theme]}
        </RouterLink>
      ))}
    </nav>
  );
}
