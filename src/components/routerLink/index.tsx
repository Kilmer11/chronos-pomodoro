import { Link } from 'react-router';

type RouterLinkProps = {
  to: string;
  children: React.ReactNode;
} & React.ComponentProps<'a'>;

export function RouterLink({ to, children, ...props }: RouterLinkProps) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
