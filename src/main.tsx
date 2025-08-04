import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProviders } from './providers/app-providers';
import { initWebVitals } from './lib/performance/web-vitals';

// Initialize web vitals monitoring
if (process.env.NODE_ENV === 'production') {
  initWebVitals();
}

createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
