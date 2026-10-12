import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { HeadCtx } from './components/Seo.jsx';
export { ROUTES } from './data.js';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export function render(path) {
  const head = {};
  const html = renderToString(
    <HeadCtx.Provider value={head}>
      <StaticRouter location={basename + path} basename={basename}><App /></StaticRouter>
    </HeadCtx.Provider>,
  );
  return { html, head };
}
