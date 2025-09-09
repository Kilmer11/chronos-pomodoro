import './App.css';
import './styles/global.css';
import './styles/theme.css';

import { Home } from './Pages/Home';
import { AboutPomodoro } from './Pages/AboutPomodoro';
import { NotFound } from './Pages/NotFound';

export function App() {
  return (
    <div className='App'>
      {/* <Home /> */}
      <NotFound />
    </div>
  );
}
