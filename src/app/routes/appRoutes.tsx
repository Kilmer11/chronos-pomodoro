import { Routes, Route, BrowserRouter, useLocation } from 'react-router';
import { Home } from '../../Pages/Home';
import { AboutPomodoro } from '../../Pages/AboutPomodoro';
import { NotFound } from '../../Pages/NotFound';
import { useEffect } from 'react';
import { History } from '../../Pages/History';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function AppRoutes() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about-pomodoro',
      element: <AboutPomodoro />,
    },
    {
      path: '/history',
      element: <History />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
