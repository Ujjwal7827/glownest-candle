import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { giftBoxes, giftPriceLabel } from '../data/collections';
import { business } from '../config/business';
import { usePageMeta } from '../utils/usePageMeta';

export default function Gifts() {
  usePageMeta('Gift Boxes & Combos', 'GLOWNEST gift boxes: Mini Glow, Love & Bloom, Celebration Box and custom gift boxes. Sometimes the smallest gift says the most.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>GLOWNEST Gift Boxes</h1><p>Sometimes the smallest gift says the most.</p></div></div>
      <div className="container section">
        <p className="notice" role="note">
          Gift box prices shown here are proposed sample prices and are not final. We’ll confirm the contents, packaging and final price with you before your order is accepted.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {giftBoxes.map((g) => (
            <article className="pcard" key={g.id}>
              <div className="pcard__media"><ProductImage src={g.image} alt={`${g.name} gift box`} label={g.name} /></div>
              <div className="pcard__body">
                <h2 className="pcard__name">{g.name}</h2>
                <span className="pcard__price">{giftPriceLabel(g)}</span>
                <p className="muted" style={{ fontSize: '.8rem', margin: 0 }}>Sample price — not confirmed</p>
                <p className="pcard__desc">{g.description}</p>
                <p className="muted" style={{ fontSize: '.85rem' }}>{g.details}</p>
                <div className="pcard__actions">
                  {g.priceType === 'custom'
                    ? <Link to="/gifts/build" className="btn btn--dark btn--small">Build your own</Link>
                    : <WhatsAppLink className="btn btn--dark btn--small" message={`Hi ${business.brandName}! I'm interested in the ${g.name} gift box. Could you share the contents and the final price?`}>Ask about this box</WhatsAppLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="btn-row"><Link to="/gifts/build" className="btn btn--gold">CREATE A GIFT BOX</Link><Link to="/bulk-orders" className="btn btn--outline" style={{ color: 'var(--text)' }}>BULK GIFTING</Link></div>
      </div>
    </>
  );
}
