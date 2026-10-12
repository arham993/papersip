import { createContext, useContext, useEffect } from 'react';

export const HeadCtx = createContext(null);

// Collects title/description during pre-rendering; updates them on client-side navigation.
export function useSeo(title, description) {
  const ctx = useContext(HeadCtx);
  if (ctx) { ctx.title = title; ctx.description = description; }
  useEffect(() => {
    document.title = title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', description);
  }, [title, description]);
}
