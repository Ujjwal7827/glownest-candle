import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { mainNav } from '../config/nav';
import { LogoImage } from './Logo';

export default function MobileNavigation({ open, onClose, onSearch }) {
  const location = useLocation();
  const closeRef = useRef(null);

  useEffect(() => { onClose(); }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <nav className="panel panel--left" role="dialog" aria-modal="true" aria-label="Main menu">
        <div className="panel__head">
          <LogoImage height={56} />
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close menu"><X size={22} /></button>
        </div>
        <div className="panel__body mobile-nav">
          <button type="button" className="btn btn--outline btn--block" onClick={onSearch} style={{ marginBottom: '1rem' }}>
            <Search size={16} aria-hidden="true" /> Search candles
          </button>
          {mainNav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>{n.label}</NavLink>
          ))}
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'is-active' : '')}>Contact</NavLink>
        </div>
      </nav>
    </>
  );
}
