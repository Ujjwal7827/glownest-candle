import { useEffect } from 'react';
import { business } from '../config/business';

// Sets a unique <title> and meta description per page.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${business.brandName}` : `${business.brandName} — ${business.tagline}`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.name = 'description'; document.head.appendChild(tag); }
    if (description) tag.content = description;
  }, [title, description]);
}
