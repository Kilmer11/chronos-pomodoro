import { Container } from '../../../components/Container';
import { Menu } from '../../../components/Menu';
import { Footer } from '../../../components/Footer';
import { Logo } from '../../../components/Logo';

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
