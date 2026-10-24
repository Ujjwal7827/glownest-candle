import { useState } from 'react';
import { MessageCircle, Instagram, Mail } from 'lucide-react';
import FormField from '../components/FormField';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { business } from '../config/business';
import { required, validEmail, validPhone, hasErrors } from '../utils/validation';
import { buildWhatsAppUrl, contactMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';

export default function Contact() {
  usePageMeta('Contact Us', 'Contact GLOWNEST on WhatsApp or Instagram for candle enquiries, orders and gifting.');
  const [f, setF] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState(null);
  const onChange = (e) => { setF((s) => ({ ...s, [e.target.name]: e.target.value })); setUrl(null); };

  const submit = (e) => {
    e.preventDefault();
    const errs = { name: required(f.name, 'Name'), message: required(f.message, 'Message'),
      email: validEmail(f.email, { optional: true }), phone: f.phone.trim() ? validPhone(f.phone) : '' };
    setErrors(errs);
    if (hasErrors(errs)) { requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus()); return; }
    setUrl(buildWhatsAppUrl(contactMessage(f)) || 'error');
  };

  return (
    <>
      <div className="page-head"><div className="container"><h1>Say hello to GLOWNEST</h1><p>Questions about a candle, an order or a gift? We’re happy to help.</p></div></div>
      <div className="container layout-2">
        <form onSubmit={submit} noValidate className="card" aria-labelledby="contact-title">
          <h2 id="contact-title" style={{ fontSize: '2rem' }}>Send an enquiry</h2>
          <FormField label="Name" name="name" value={f.name} onChange={onChange} error={errors.name} required autoComplete="name" />
          <FormField label="Mobile number" name="phone" type="tel" value={f.phone} onChange={onChange} error={errors.phone} autoComplete="tel" hint="Optional" />
          <FormField label="Email" name="email" type="email" value={f.email} onChange={onChange} error={errors.email} autoComplete="email" hint="Optional" />
          <FormField label="Message" name="message" as="textarea" value={f.message} onChange={onChange} error={errors.message} required />
          <button type="submit" className="btn btn--dark">PREPARE WHATSAPP MESSAGE</button>
          {url && url !== 'error' && (
            <div className="notice notice--ok" role="status" style={{ marginTop: '1.2rem' }}>
              <strong>Your message is ready — it hasn’t been sent yet.</strong>
              <p style={{ margin: '.5rem 0 1rem' }}>Open WhatsApp and press send to reach us.</p>
              <a className="btn btn--gold" href={url} target="_blank" rel="noopener noreferrer">OPEN WHATSAPP TO SEND</a>
            </div>
          )}
          {url === 'error' && <div className="notice notice--err" role="alert" style={{ marginTop: '1.2rem' }}>The WhatsApp number isn’t configured correctly, so we couldn’t prepare your message.</div>}
        </form>
        <aside>
          <h2 style={{ fontSize: '1.8rem' }}>Reach us directly</h2>
          <p>GLOWNEST makes handmade, aesthetic and giftable candles. Message us for orders, gifting ideas and custom requests.</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li><WhatsAppLink className="btn btn--dark btn--block"><MessageCircle size={16} aria-hidden="true" /> WhatsApp {business.whatsappNumber}</WhatsAppLink></li>
            <li><a className="btn btn--outline btn--block" style={{ color: 'var(--text)' }} href={business.instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={16} aria-hidden="true" /> {business.instagramHandle}</a></li>
            {business.email && <li><a className="btn btn--outline btn--block" style={{ color: 'var(--text)' }} href={`mailto:${business.email}`}><Mail size={16} aria-hidden="true" /> {business.email}</a></li>}
          </ul>
        </aside>
      </div>
    </>
  );
}
