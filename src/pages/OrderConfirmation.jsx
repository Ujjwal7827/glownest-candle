import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { LogoImage } from '../components/Logo';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import { usePageMeta } from '../utils/usePageMeta';

// Honest states only: this is an order *request*. Nothing here claims the store received or confirmed it.
export default function OrderConfirmation() {
  usePageMeta('Your order request', 'Send your GLOWNEST order request on WhatsApp.');
  const { orderId } = useParams();
  const { state } = useLocation();
  const { clear } = useCart();
  const [cleared, setCleared] = useState(false);
  const order = state?.order && state.order.id === orderId ? state.order : null;

  if (!order) {
    return (
      <div className="container empty" style={{ padding: '6rem 1rem' }}>
        <h1 style={{ fontSize: '2.4rem' }}>We can’t find that order request</h1>
        <p className="muted">For your privacy we don’t keep your delivery details on this device, so a refreshed or reopened page can’t rebuild the message. Head back to checkout to prepare it again.</p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Link to="/checkout" className="btn btn--dark">GO TO CHECKOUT</Link>
          <WhatsAppLink>CHAT ON WHATSAPP</WhatsAppLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head"><div className="container"><LogoImage height={110} /><h1 style={{ marginTop: '1rem' }}>Your GLOWNEST order request is ready.</h1>
        <p>Please send your order message through WhatsApp and wait for the store to confirm availability, delivery, and payment.</p></div></div>
      <div className="container layout-2">
        <div>
          <p className="notice"><strong>Not sent yet.</strong> Opening WhatsApp doesn’t send anything — you need to press send in WhatsApp. Your order is only accepted once GLOWNEST confirms it with you.</p>
          <a className="btn btn--gold" href={order.url} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> OPEN WHATSAPP TO SEND</a>
          <p className="muted" style={{ marginTop: '1.5rem' }}>Request reference: <strong>{order.id}</strong> (for your own reference — it isn’t an order number).</p>
          <div className="btn-row">
            <Link to="/shop" className="btn btn--outline" style={{ color: 'var(--text)' }}>CONTINUE SHOPPING</Link>
            <WhatsAppLink className="btn btn--ghost">Chat on WhatsApp</WhatsAppLink>
          </div>
          <div style={{ marginTop: '2rem' }}>
            {cleared ? <p className="notice notice--ok" role="status">Your cart has been cleared.</p> : (
              <button type="button" className="link-btn" onClick={() => { clear(); setCleared(true); }}>I’ve sent my message — clear my cart</button>
            )}
          </div>
        </div>
        <aside className="card" aria-label="Request summary">
          <h2 style={{ fontSize: '1.6rem' }}>Request summary</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {order.lines.map((l) => <li key={l.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span>{l.name} × {l.quantity}</span><span>{formatPrice(l.lineTotal)}</span></li>)}
          </ul>
          <div className="totals">
            <div><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div><span>Shipping</span><span>{order.shipping ? (order.shipping.price === 0 ? 'Free' : formatPrice(order.shipping.price)) : 'To be confirmed'}</span></div>
            {order.total !== null && <div className="grand"><span>Total</span><span>{formatPrice(order.total)}</span></div>}
          </div>
        </aside>
      </div>
    </>
  );
}
