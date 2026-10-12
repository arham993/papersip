import { startTransition } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/site.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const el = document.getElementById('root');
const tree = <BrowserRouter basename={basename}><App /></BrowserRouter>;
// Hydrate in interruptible slices so the page stays responsive while React takes over.
if (el.firstElementChild) startTransition(() => { hydrateRoot(el, tree); });
else createRoot(el).render(tree);
