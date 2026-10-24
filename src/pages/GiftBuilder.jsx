import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import ProductImage from '../components/ProductImage';
import FormField from '../components/FormField';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { catalogue } from '../data/products';
import { packagingOptions } from '../data/collections';
import { formatPrice } from '../utils/currency';
import { giftMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';

export default function GiftBuilder() {
  usePageMeta('Create a Gift Box', 'Choose GLOWNEST candles, packaging and a gift message to build a custom gift box.');
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState({});
  const [packagingId, setPackagingId] = useState(packagingOptions[0].id);
  const [note, setNote] = useState('');

  const lines = useMemo(() => catalogue.filter((p) => qty[p.id] > 0).map((p) => ({ ...p, quantity: qty[p.id], lineTotal: p.price * qty[p.id] })), [qty]);
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const packaging = packagingOptions.find((o) => o.id === packagingId);
  const set = (id, n) => setQty((q) => ({ ...q, [id]: Math.max(0, n) }));

  const addToCart = () => { lines.forEach((l) => addItem(l, l.quantity)); navigate('/cart'); };

  return (
    <>
      <div className="page-head"><div className="container"><h1>Create a gift box</h1><p>Choose your candles, add a message, and we’ll confirm packaging and the final price with you.</p></div></div>
      <div className="container layout-2">
        <div>
          <h2 style={{ fontSize: '1.9rem' }}>1. Choose candles</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {catalogue.map((p) => (
              <li key={p.id} className="cart-item" style={{ gridTemplateColumns: '64px 1fr auto', alignItems: 'center' }}>
                <div className="cart-item__img" style={{ width: 64, height: 80 }}><ProductImage src={p.image} alt={p.name} label="" /></div>
                <div><div className="cart-item__name">{p.name}</div><span className="muted">{formatPrice(p.price)}</span></div>
                <div className="qty" role="group" aria-label={`Quantity for ${p.name}`}>
                  <button type="button" onClick={() => set(p.id, (qty[p.id] || 0) - 1)} disabled={!qty[p.id]} aria-label={`Decrease ${p.name}`}>−</button>
                  <output>{qty[p.id] || 0}</output>
                  <button type="button" onClick={() => set(p.id, Math.min(99, (qty[p.id] || 0) + 1))} aria-label={`Increase ${p.name}`}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <h2 style={{ fontSize: '1.9rem', marginTop: '2rem' }}>2. Packaging & message</h2>
          <FormField label="Gift packaging" name="packaging" as="select" value={packagingId} onChange={(e) => setPackagingId(e.target.value)} options={packagingOptions.map((o) => ({ value: o.id, label: o.label }))} hint="Packaging prices are not configured yet, so we’ll confirm the cost with you." />
          <FormField label="Gift message (optional)" name="note" as="textarea" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} hint={`${note.length}/200`} />
        </div>
        <aside className="card sticky-card" aria-label="Gift box summary">
          <h2 style={{ fontSize: '1.7rem' }}>Your gift box</h2>
          {lines.length === 0 ? <p className="muted">Pick at least one candle to see your summary.</p> : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {lines.map((l) => <li key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span>{l.name} × {l.quantity}</span><span>{formatPrice(l.lineTotal)}</span></li>)}
              </ul>
              <div className="totals"><div className="grand"><span>Provisional candle subtotal</span><span>{formatPrice(subtotal)}</span></div></div>
              <p className="notice">Packaging and the final gift box price will be confirmed by GLOWNEST. This subtotal covers candles only.</p>
              <button type="button" className="btn btn--dark btn--block" onClick={addToCart}>Add candles to cart</button>
              <p className="muted" style={{ fontSize: '.82rem' }}>Your gift message and packaging choice aren’t saved in the cart — send them via the quote request below.</p>
              <WhatsAppLink className="btn btn--gold btn--block" message={giftMessage({ lines, subtotal, packaging: packaging?.label, giftNote: note })}>Request custom quote on WhatsApp</WhatsAppLink>
            </>
          )}
          <p style={{ marginTop: '1rem' }}><Link to="/gifts" className="btn btn--ghost">← Back to gift boxes</Link></p>
        </aside>
      </div>
    </>
  );
}
