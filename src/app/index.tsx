import '../shared/styles/global.css';
import '../shared/styles/theme.css';

import { Home } from '../Pages/Home';
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
