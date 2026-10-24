import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppLink } from './WhatsAppButton';
import { readSession, writeSession } from '../utils/storage';
import { business } from '../config/business';

const KEY = 'glownest.updates.dismissed';

// Honest opt-in: there is no subscription backend, so this does NOT collect or store anything.
// "STAY CONNECTED" opens a WhatsApp message the customer chooses to send themselves.
export default function NewsletterForm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readSession(KEY)) return undefined;
    let shown = false;
    const show = () => { if (!shown) { shown = true; setOpen(true); } };
    const timer = setTimeout(show, 25000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.6) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const dismiss = () => { writeSession(KEY, '1'); setOpen(false); };
  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={dismiss} aria-hidden="true" />
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="updates-title">
        <button type="button" className="icon-btn" onClick={dismiss} aria-label="Close"><X size={20} /></button>
        <h2 id="updates-title" style={{ fontSize: '2rem' }}>A little glow for your inbox. ✨</h2>
        <p className="muted">Get updates about new collections, gift ideas and GLOWNEST launches.</p>
        <p style={{ fontSize: '.85rem' }} className="muted">
          We don’t collect your details here. This opens a WhatsApp message you can choose to send to {business.brandName}.
        </p>
        <WhatsAppLink className="btn btn--gold btn--block" message={`Hi ${business.brandName}! Please keep me updated about new collections, gift ideas and launches.`} onClick={dismiss}>
          STAY CONNECTED
        </WhatsAppLink>
      </div>
    </>
  );
}
