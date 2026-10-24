import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutStepper from '../components/CheckoutStepper';
import FormField from '../components/FormField';
import ProductImage from '../components/ProductImage';
import { LogoImage } from '../components/Logo';
import { useCart } from '../context/CartContext';
import { business } from '../config/business';
import { formatPrice } from '../utils/currency';
import { required, validEmail, validPhone, validPin, hasErrors } from '../utils/validation';
import { buildWhatsAppUrl, orderMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';

const STEPS = ['Cart review', 'Contact', 'Address', 'Delivery', 'Payment', 'Place order'];

// Shipping is only ever derived from configuration — never invented.
export const resolveShipping = (subtotal, selectedId) => {
  const { options, freeShippingThreshold } = business.shipping;
  if (typeof freeShippingThreshold === 'number' && subtotal >= freeShippingThreshold) return { label: 'Free shipping', price: 0 };
  if (!options.length) return null;
  const opt = options.length === 1 ? options[0] : options.find((o) => o.id === selectedId);
  return opt ? { label: opt.label, price: opt.price } : null;
};

export default function Checkout() {
  usePageMeta('Checkout', 'Review your GLOWNEST order and prepare your order request.');
  const navigate = useNavigate();
  const { lines, subtotal } = useCart();
  const [step, setStep] = useState(0);
  // Personal details live in component state only — never written to localStorage.
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [address, setAddress] = useState({ line1: '', area: '', city: '', state: '', pin: '' });
  const [shippingId, setShippingId] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  if (lines.length === 0) {
    return (
      <div className="container empty" style={{ padding: '6rem 1rem' }}>
        <h1 style={{ fontSize: '2.6rem' }}>Nothing to check out yet</h1>
        <p className="muted">Add a candle to your cart first.</p>
        <Link to="/shop" className="btn btn--dark">SHOP GLOWNEST</Link>
      </div>
    );
  }

  const shipping = resolveShipping(subtotal, shippingId);
  const needsChoice = business.shipping.options.length > 1 && !(typeof business.shipping.freeShippingThreshold === 'number' && subtotal >= business.shipping.freeShippingThreshold);
  const total = shipping ? subtotal + shipping.price : null;

  const validators = {
    1: () => ({ name: required(contact.name, 'Full name'), phone: validPhone(contact.phone), email: validEmail(contact.email) }),
    2: () => ({ line1: required(address.line1, 'House/Flat number'), area: required(address.area, 'Street/Area'), city: required(address.city, 'City'), state: required(address.state, 'State'), pin: validPin(address.pin) }),
    3: () => (needsChoice ? { shipping: shipping ? '' : 'Choose a delivery option.' } : {}),
  };
  const focusError = () => requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());

  const next = () => {
    const errs = validators[step] ? validators[step]() : {};
    setErrors(errs);
    if (hasErrors(errs)) { focusError(); return; }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
    window.scrollTo({ top: 0 });
  };
  const back = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)); };

  const placeRequest = () => {
    const all = { ...validators[1](), ...validators[2](), ...validators[3]() };
    setErrors(all);
    if (hasErrors(all)) { setStep(all.name || all.phone || all.email ? 1 : all.shipping ? 3 : 2); return; }
    const message = orderMessage({ lines, subtotal, shipping, customer: contact, address, notes });
    const url = buildWhatsAppUrl(message);
    if (!url) { setErrors({ submit: 'The store’s WhatsApp number isn’t configured correctly, so we can’t prepare your order message.' }); return; }
    // A local reference only. It is NOT an order number and does not mean the store has received anything.
    const id = `REQ-${Date.now().toString(36).toUpperCase()}`;
    navigate(`/order-confirmation/${id}`, { state: { order: { id, url, lines: lines.map((l) => ({ name: l.name, quantity: l.quantity, price: l.price, lineTotal: l.lineTotal })), subtotal, shipping, total, customerName: contact.name } } });
  };

  const setC = (e) => setContact((s) => ({ ...s, [e.target.name]: e.target.value }));
  const setA = (e) => setAddress((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="page-head"><div className="container"><LogoImage height={110} /><h1 style={{ marginTop: '1rem' }}>Checkout</h1></div></div>
      <div className="container layout-2">
        <div>
          <CheckoutStepper steps={STEPS} current={step} />

          {step === 0 && (
            <section aria-labelledby="s0">
              <h2 id="s0" style={{ fontSize: '1.9rem' }}>Review your cart</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {lines.map((l) => (
                  <li key={l.id} className="cart-item" style={{ gridTemplateColumns: '64px 1fr auto' }}>
                    <div className="cart-item__img" style={{ width: 64, height: 80 }}><ProductImage src={l.image} alt={l.name} label="" /></div>
                    <div><div className="cart-item__name">{l.name}</div><span className="muted">{l.quantity} × {formatPrice(l.price)}</span></div>
                    <strong>{formatPrice(l.lineTotal)}</strong>
                  </li>
                ))}
              </ul>
              <p><Link to="/cart" className="btn btn--ghost">Edit cart</Link></p>
            </section>
          )}

          {step === 1 && (
            <section aria-labelledby="s1">
              <h2 id="s1" style={{ fontSize: '1.9rem' }}>Contact information</h2>
              <FormField label="Full name" name="name" value={contact.name} onChange={setC} error={errors.name} required autoComplete="name" />
              <FormField label="Mobile number" name="phone" type="tel" inputMode="tel" value={contact.phone} onChange={setC} error={errors.phone} required autoComplete="tel" hint="10-digit Indian mobile number" />
              <FormField label="Email" name="email" type="email" value={contact.email} onChange={setC} error={errors.email} required autoComplete="email" />
            </section>
          )}

          {step === 2 && (
            <section aria-labelledby="s2">
              <h2 id="s2" style={{ fontSize: '1.9rem' }}>Delivery address</h2>
              <div className="form-grid">
                <FormField label="House / Flat number" name="line1" value={address.line1} onChange={setA} error={errors.line1} required autoComplete="address-line1" />
                <FormField label="Street / Area" name="area" value={address.area} onChange={setA} error={errors.area} required autoComplete="address-line2" />
                <FormField label="City" name="city" value={address.city} onChange={setA} error={errors.city} required autoComplete="address-level2" />
                <FormField label="State" name="state" value={address.state} onChange={setA} error={errors.state} required autoComplete="address-level1" />
                <FormField label="PIN code" name="pin" inputMode="numeric" maxLength={6} value={address.pin} onChange={setA} error={errors.pin} required autoComplete="postal-code" />
              </div>
            </section>
          )}

          {step === 3 && (
            <section aria-labelledby="s3">
              <h2 id="s3" style={{ fontSize: '1.9rem' }}>Delivery</h2>
              {business.shipping.options.length === 0 && !shipping && (
                <p className="notice">Shipping will be confirmed before order acceptance. We’ll share the charge with you on WhatsApp.</p>
              )}
              {shipping && !needsChoice && <p className="notice">{shipping.label}: {shipping.price === 0 ? 'free' : formatPrice(shipping.price)}</p>}
              {needsChoice && (
                <fieldset style={{ border: 0, padding: 0 }}>
                  <legend className="sr-only">Delivery option</legend>
                  {business.shipping.options.map((o) => (
                    <label key={o.id} className="radio-card">
                      <input type="radio" name="shipping" value={o.id} checked={shippingId === o.id} onChange={() => setShippingId(o.id)} />
                      <span>{o.label} — {formatPrice(o.price)}</span>
                    </label>
                  ))}
                  {errors.shipping && <span className="field__error" role="alert">{errors.shipping}</span>}
                </fieldset>
              )}
              <FormField label="Order notes (optional)" name="notes" as="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </section>
          )}

          {step === 4 && (
            <section aria-labelledby="s4">
              <h2 id="s4" style={{ fontSize: '1.9rem' }}>Payment</h2>
              <p className="notice">Online payment isn’t available yet, so nothing is charged on this website. After you send your order request on WhatsApp, GLOWNEST will confirm availability and share payment details with you.</p>
            </section>
          )}

          {step === 5 && (
            <section aria-labelledby="s5">
              <h2 id="s5" style={{ fontSize: '1.9rem' }}>Place your order request</h2>
              <p className="notice">This prepares a WhatsApp message with your order. <strong>Your order isn’t placed until you send that message and GLOWNEST confirms it.</strong></p>
              <p><strong>{contact.name}</strong> · {contact.phone}<br />{[address.line1, address.area, address.city, address.state, address.pin].join(', ')}</p>
              {errors.submit && <div className="notice notice--err" role="alert">{errors.submit}</div>}
            </section>
          )}

          <div className="btn-row">
            {step > 0 && <button type="button" className="btn btn--outline" style={{ color: 'var(--text)' }} onClick={back}>Back</button>}
            {step < STEPS.length - 1
              ? <button type="button" className="btn btn--dark" onClick={next}>{step === 0 ? 'Proceed to checkout' : 'Continue'}</button>
              : <button type="button" className="btn btn--gold" onClick={placeRequest}>PREPARE ORDER ON WHATSAPP</button>}
          </div>
        </div>

        <aside className="card sticky-card" aria-label="Order summary">
          <h2 style={{ fontSize: '1.6rem' }}>Order summary</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lines.map((l) => <li key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span>{l.name} × {l.quantity}</span><span>{formatPrice(l.lineTotal)}</span></li>)}
          </ul>
          <div className="totals">
            <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div><span>Shipping</span><span>{shipping ? (shipping.price === 0 ? 'Free' : formatPrice(shipping.price)) : 'To be confirmed'}</span></div>
            <div className="grand"><span>Total</span><span>{total !== null ? formatPrice(total) : 'After shipping is confirmed'}</span></div>
          </div>
        </aside>
      </div>
    </>
  );
}
