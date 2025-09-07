import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { Form } from './components/Form';
import { Footer } from './components/Footer';

import './App.css';
import './styles/global.css';
import './styles/theme.css';

export function App() {
  return (
    <div className='App'>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <Form />
      </Container>

      <Container>
        <Footer />
      </Container>
    </div>
  );
}
