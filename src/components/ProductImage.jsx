import { useEffect, useState } from 'react';

// If an image fails to load, try these real GLOWNEST photos before falling back to a text placeholder.
const FALLBACKS = ['/images/hero.jpg', '/images/products/peony-rose.jpg'];

export default function ProductImage({ src, alt, label, dark = false, loading = 'lazy', className = '' }) {
  const chain = [src, ...FALLBACKS].filter((v, i, a) => v && a.indexOf(v) === i);
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [src]);
  const current = chain[idx];

  return (
    <div className={`media ${className}`} style={{ width: '100%', height: '100%' }}>
      {current ? (
        <img key={current} src={current} alt={alt} loading={loading} decoding="async" onError={() => setIdx((i) => i + 1)} />
      ) : (
        <div className={`ph ${dark ? 'ph--dark' : ''}`} role="img" aria-label={alt}>
          <strong>{label || alt}</strong>
        </div>
      )}
    </div>
  );
}
