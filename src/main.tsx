import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Index } from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
  </StrictMode>,
);
