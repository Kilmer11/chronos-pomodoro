import './App.css';
import './styles/global.css';
import './styles/theme.css';

import { Home } from './Pages/Home';
import { TaskContextProvider } from './contexts/TaskContext';

export function App() {
  return (
    <div className='App'>
      <TaskContextProvider>
        <Home />
      </TaskContextProvider>
    </div>
  );
}
