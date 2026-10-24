import { useEffect, useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import MobileNavigation from './MobileNavigation';
import SearchBar from './SearchBar';
import { mainNav } from '../config/nav';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { count, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <button type="button" className="icon-btn header__menu header__menu-desktop-hide" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
          <Menu size={24} />
        </button>
        <Logo className="header__logo-link" />
        <nav className="header__nav" aria-label="Main">
          {mainNav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <button type="button" className="icon-btn header__search" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={21} /></button>
          <Link to="/contact" className="icon-btn header__account" aria-label="Account help and contact"><User size={21} /></Link>
          <button type="button" className="icon-btn" onClick={openDrawer} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
            <ShoppingBag size={21} />
            {count > 0 && <span className="badge" aria-hidden="true">{count}</span>}
          </button>
        </div>
      </div>
    </header>
    {/* Rendered outside <header>: backdrop-filter would otherwise trap position:fixed overlays inside it. */}
    <MobileNavigation open={menuOpen} onClose={closeMenu} onSearch={() => { closeMenu(); setSearchOpen(true); }} />
    <SearchBar open={searchOpen} onClose={closeSearch} />
    </>
  );
}
