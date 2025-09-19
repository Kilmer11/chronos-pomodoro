import '../shared/styles/global.css';
import '../shared/styles/theme.css';

import { TaskContextProvider } from './contexts/TaskContext/taskContextProvider';
import { MessagesContainer } from '../components/messagesContainer';
import { AppRoutes } from './routes/appRoutes';

export function Index() {
  return (
    <div className='App'>
      <TaskContextProvider>
        <MessagesContainer>
          <AppRoutes />
        </MessagesContainer>
      </TaskContextProvider>
    </div>
  );
}
