import { WhatsAppLink } from './WhatsAppButton';
import { business } from '../config/business';
import { usePageMeta } from '../utils/usePageMeta';

// Shared layout for the editable policy pages. `draft` shows an owner-review notice.
export default function PolicyPage({ title, description, body, draft = true, extra = null, contact = false }) {
  usePageMeta(title, description);
  return (
    <>
      <div className="page-head"><div className="container"><h1>{title}</h1></div></div>
      <div className="container section">
        {draft && <p className="notice" role="note"><strong>Draft policy.</strong> This text is an editable business draft and must be reviewed by the owner against actual business practices and applicable law before publication.</p>}
        <div className="prose">
          {body.split('\n\n').map((p) => <p key={p}>{p}</p>)}
          {extra}
          {contact && (
            <p>
              Contact us: <WhatsAppLink className="btn btn--ghost" message={`Hi ${business.brandName}! I need help with an order.`}>WhatsApp {business.whatsappNumber}</WhatsAppLink>
              {business.email && <> or <a href={`mailto:${business.email}`} style={{ textDecoration: 'underline' }}>{business.email}</a></>}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
