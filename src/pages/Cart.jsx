import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import CartItem from '../components/CartItem';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import { orderMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';

export default function Cart() {
  usePageMeta('Your Cart', 'Review the candles in your GLOWNEST cart.');
  const { lines, subtotal, clear } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="container empty" style={{ padding: '6rem 1rem' }}>
        <ShoppingBag size={40} aria-hidden="true" />
        <h1 style={{ fontSize: '2.6rem' }}>Your cart is empty</h1>
        <p className="muted">Find a candle that feels like you.</p>
        <Link to="/shop" className="btn btn--dark">SHOP GLOWNEST</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-head"><div className="container"><h1>Your cart</h1></div></div>
      <div className="container layout-2">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {lines.map((l) => <CartItem key={l.id} line={l} />)}
          <li style={{ paddingTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Link to="/shop" className="btn btn--ghost">← Continue shopping</Link>
            {confirmClear ? (
              <span role="alert">Clear all items? <button type="button" className="link-btn" onClick={() => { clear(); setConfirmClear(false); }}>Yes, clear</button> · <button type="button" className="link-btn" onClick={() => setConfirmClear(false)}>Keep</button></span>
            ) : <button type="button" className="link-btn" onClick={() => setConfirmClear(true)}>Clear cart</button>}
          </li>
        </ul>
        <aside className="card sticky-card" aria-label="Order summary">
          <h2 style={{ fontSize: '1.7rem' }}>Summary</h2>
          <div className="totals">
            <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div><span>Shipping</span><span className="muted">Confirmed before order acceptance</span></div>
          </div>
          <Link to="/checkout" className="btn btn--gold btn--block">PROCEED TO CHECKOUT</Link>
          <p style={{ marginTop: '.8rem' }}>
            <WhatsAppLink className="btn btn--outline btn--block" style={{ color: 'var(--text)' }} message={orderMessage({ lines, subtotal })}><MessageCircle size={16} aria-hidden="true" /> ORDER ON WHATSAPP</WhatsAppLink>
          </p>
          <p className="muted" style={{ fontSize: '.82rem' }}>Opening WhatsApp doesn’t place an order. You send the message, then GLOWNEST confirms availability, delivery and payment with you.</p>
        </aside>
      </div>
    </>
  );
}
