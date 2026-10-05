import { useEffect } from 'react';

const BASE_TITLE = "Stakey's Cycles";

/** Sets the document title and meta description for the current page. */
export function Seo({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} | ${BASE_TITLE}`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
