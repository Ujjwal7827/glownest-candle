import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import FormField from '../components/FormField';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { occasions } from '../data/collections';
import { catalogue } from '../data/products';
import { business } from '../config/business';
import { required, validEmail, validPhone, positiveInt, futureDate, hasErrors } from '../utils/validation';
import { buildWhatsAppUrl, quoteMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';

const initial = { name: '', phone: '', email: '', eventType: '', quantity: '', candle: '', colour: '', fragrance: '', date: '', message: '' };

const validate = (f) => ({
  name: required(f.name, 'Name'),
  phone: validPhone(f.phone, 'WhatsApp number'),
  email: validEmail(f.email, { optional: true }),
  eventType: required(f.eventType, 'Event type'),
  quantity: positiveInt(f.quantity, 'Quantity'),
  date: futureDate(f.date),
});

export default function BulkOrders() {
  usePageMeta('Bulk & Custom Orders', 'Request a bulk or custom candle quote from GLOWNEST for return gifts, weddings, birthdays, festive and corporate gifting.');
  const [f, setF] = useState(initial);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const today = new Date().toISOString().slice(0, 10);

  const onChange = (e) => { const { name, value } = e.target; setF((s) => ({ ...s, [name]: value })); setPrepared(null); };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (hasErrors(errs)) {
      setPrepared(null);
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const url = buildWhatsAppUrl(quoteMessage(f));
    setPrepared(url ? { url } : { error: true });
  };

  return (
    <>
      <div className="page-head"><div className="container"><h1>Bulk & Custom Orders</h1>
        <p>Need candles for an event, celebration or business?</p>
        <p style={{ marginTop: '.5rem' }}>Tell us what you’re looking for and we’ll help create a GLOWNEST order that fits your occasion.</p></div></div>
      <div className="container section">
        <ul className="chips" style={{ marginTop: 0, marginBottom: '2rem' }} aria-label="Occasions">{occasions.map((o) => <li className="chip" key={o}>{o}</li>)}</ul>

        <form onSubmit={submit} noValidate className="card" aria-labelledby="quote-title">
          <h2 id="quote-title" style={{ fontSize: '2rem' }}>Request a quote</h2>
          {hasErrors(errors) && <div className="notice notice--err" role="alert">Please fix the highlighted fields and try again.</div>}
          <div className="form-grid">
            <FormField label="Name" name="name" value={f.name} onChange={onChange} error={errors.name} required autoComplete="name" />
            <FormField label="WhatsApp number" name="phone" type="tel" inputMode="tel" value={f.phone} onChange={onChange} error={errors.phone} required autoComplete="tel" hint="10-digit Indian mobile number" />
            <FormField label="Email" name="email" type="email" value={f.email} onChange={onChange} error={errors.email} autoComplete="email" hint="Optional" />
            <FormField label="Event type" name="eventType" as="select" value={f.eventType} onChange={onChange} error={errors.eventType} required options={[{ value: '', label: 'Select an occasion' }, ...occasions]} />
            <FormField label="Quantity required" name="quantity" type="number" min="1" step="1" inputMode="numeric" value={f.quantity} onChange={onChange} error={errors.quantity} required />
            <FormField label="Preferred candle" name="candle" as="select" value={f.candle} onChange={onChange} options={[{ value: '', label: 'Not sure yet' }, ...catalogue.map((p) => p.name), 'Custom design']} />
            <FormField label="Preferred colour" name="colour" value={f.colour} onChange={onChange} />
            <FormField label="Fragrance preference" name="fragrance" value={f.fragrance} onChange={onChange} />
            <FormField label="Required delivery date" name="date" type="date" min={today} value={f.date} onChange={onChange} error={errors.date} hint="Optional" />
            <FormField label="Message" name="message" as="textarea" value={f.message} onChange={onChange} className="full" />
          </div>
          <div className="btn-row" style={{ marginTop: 0 }}>
            <button type="submit" className="btn btn--dark">REQUEST A QUOTE</button>
            <WhatsAppLink className="btn btn--outline" style={{ color: 'var(--text)' }} message={`Hi ${business.brandName}! I'm planning a bulk/custom order.`}><MessageCircle size={16} aria-hidden="true" /> CHAT ON WHATSAPP</WhatsAppLink>
          </div>
          <p className="muted" style={{ marginTop: '1rem' }}>WhatsApp: {business.whatsappNumber}</p>
        </form>

        {prepared?.url && (
          <div className="notice notice--ok" role="status" style={{ marginTop: '1.5rem' }}>
            <strong>Your quote request is ready — it hasn’t been sent yet.</strong>
            <p style={{ margin: '.5rem 0 1rem' }}>Open WhatsApp and press send on the prepared message. We’ll reply there once we’ve seen it.</p>
            <a className="btn btn--gold" href={prepared.url} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> OPEN WHATSAPP TO SEND</a>
          </div>
        )}
        {prepared?.error && <div className="notice notice--err" role="alert" style={{ marginTop: '1.5rem' }}>We couldn’t prepare the WhatsApp message because the business number isn’t configured correctly. Please contact the store another way.</div>}
      </div>
    </>
  );
}
