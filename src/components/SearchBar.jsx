import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { catalogue } from '../data/products';
import { filterProducts } from '../utils/shopFilters';
import { formatPrice } from '../utils/currency';
import ProductImage from './ProductImage';

export default function SearchBar({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = useMemo(() => (q.trim() ? filterProducts(catalogue, { query: q }) : []), [q]);

  useEffect(() => {
    if (!open) return undefined;
    setQ('');
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const submit = (e) => { e.preventDefault(); if (q.trim()) { navigate(`/shop?q=${encodeURIComponent(q.trim())}`); onClose(); } };

  return (
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search candles">
        <div className="container">
          <form onSubmit={submit} role="search" style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
            <label htmlFor="site-search" className="sr-only">Search candles</label>
            <input id="site-search" ref={inputRef} className="search-input" type="search" placeholder="Search candles, e.g. rose" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
            <button type="submit" className="icon-btn" aria-label="Search"><Search size={22} /></button>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search"><X size={22} /></button>
          </form>
          <div aria-live="polite">
            {q.trim() && results.length === 0 && <p className="muted" style={{ marginTop: '1rem' }}>No candles match “{q}”. Try another word, or <Link to="/shop" onClick={onClose}>browse all candles</Link>.</p>}
            {results.length > 0 && (
              <ul className="search-results">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.slug}`} onClick={onClose}>
                      <span className="thumb"><ProductImage src={p.image} alt="" label="" /></span>
                      <span><strong style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 500 }}>{p.name}</strong><br /><span className="muted">{formatPrice(p.price)}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
