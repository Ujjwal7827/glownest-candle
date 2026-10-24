import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, count } = useCart();
  const location = useLocation();
  const closeRef = useRef(null);

  useEffect(() => { closeDrawer(); }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;
  return (
    <>
      <div className="overlay" onClick={closeDrawer} aria-hidden="true" />
      <aside className="panel panel--right" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="panel__head">
          <h2 className="panel__title">Your cart ({count})</h2>
          <button ref={closeRef} type="button" className="icon-btn" onClick={closeDrawer} aria-label="Close cart"><X size={22} /></button>
        </div>
        <div className="panel__body">
          {lines.length === 0 ? (
            <div className="empty">
              <ShoppingBag size={36} aria-hidden="true" />
              <h2>Your cart is empty</h2>
              <p className="muted">Find a candle that feels like you.</p>
              <Link to="/shop" className="btn btn--dark" onClick={closeDrawer}>Shop candles</Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {lines.map((l) => <CartItem key={l.id} line={l} onNavigate={closeDrawer} />)}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="panel__foot">
            <div className="totals"><div className="grand"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div></div>
            <p className="muted" style={{ fontSize: '.85rem' }}>Shipping is confirmed before your order is accepted.</p>
            <Link to="/checkout" className="btn btn--gold btn--block" onClick={closeDrawer}>Checkout</Link>
            <div className="btn-row" style={{ marginTop: '.8rem' }}>
              <Link to="/cart" className="btn btn--ghost" onClick={closeDrawer}>View cart</Link>
              <button type="button" className="btn btn--ghost" onClick={closeDrawer}>Continue shopping</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
