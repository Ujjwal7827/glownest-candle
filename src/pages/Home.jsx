import { Link } from 'react-router-dom';
import { Hand, Sparkles, Gift, Heart, MessageCircle, Instagram } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import InstagramGrid from '../components/InstagramGrid';
import ProductImage from '../components/ProductImage';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { bySlugs, bestSellerSlugs, under99Slugs } from '../data/products';
import { moods, occasions } from '../data/collections';
import { business } from '../config/business';
import { usePageMeta } from '../utils/usePageMeta';

const why = [
  { icon: Hand, title: 'Handmade', text: 'Made with care, one candle at a time.' },
  { icon: Sparkles, title: 'Aesthetic', text: 'Designed to look beautiful even before it’s lit.' },
  { icon: Gift, title: 'Giftable', text: 'Made for birthdays, celebrations and little surprises.' },
  { icon: Heart, title: 'Thoughtful', text: 'Because small moments can mean a lot.' },
];

export default function Home() {
  usePageMeta('Handmade Scented Giftable Candles', 'GLOWNEST — handmade, aesthetic and giftable candles. Floral candles, gift boxes and bulk orders. light up your moments.');
  const best = bySlugs(bestSellerSlugs);
  const under = bySlugs(under99Slugs);

  return (
    <div className="home">
      <div className="home__s home__s--hero"><HeroSection /></div>

      <section className="section home__s home__s--mood" aria-labelledby="mood-title">
        <div className="container">
          <div className="section-head"><h2 id="mood-title">Find your kind of glow. ✨</h2></div>
          <div className="grid mood-grid">
            {moods.map((m) => (
              <article className="mood-card" key={m.id}>
                <ProductImage src={m.image} alt={`${m.title} candles`} label={m.title} dark />
                <div className="mood-card__body">
                  <h3>{m.title}</h3>
                  <p>{m.items}</p>
                  <Link to={m.to} className="btn btn--gold btn--small">{m.button}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory home__s home__s--best" aria-labelledby="best-title">
        <div className="container">
          <div className="section-head"><h2 id="best-title">Made to be noticed. ✨</h2><p>Our most-loved GLOWNEST creations.</p></div>
          <ProductGrid products={best} wide />
          <div className="btn-row"><Link to="/shop" className="btn btn--ghost">VIEW ALL CANDLES →</Link></div>
        </div>
      </section>

      <section className="section home__s home__s--under" aria-labelledby="under-title">
        <div className="container">
          <div className="section-head"><h2 id="under-title">Little candles. Easy gifting. 🤍</h2><p>Beautiful little gifts without the big price tag.</p></div>
          <ProductGrid products={under} wide />
          <div className="btn-row"><Link to="/under-99" className="btn btn--dark">SHOP UNDER ₹99</Link></div>
        </div>
      </section>

      <section className="section section--charcoal home__s home__s--gift" aria-labelledby="gift-title">
        <div className="container split split--reverse">
          <div className="split__media split__media--wide"><ProductImage src="/images/gifts/gift-box.jpg" alt="A GLOWNEST candle in beautiful gift packaging" label="Gift box photo" dark /></div>
          <div>
            <h2 id="gift-title">Give a little glow. 🎁</h2>
            <p>Looking for a small gift that feels personal?</p>
            <p>Choose a GLOWNEST candle, add beautiful packaging and turn an ordinary moment into something memorable.</p>
            <div className="btn-row">
              <Link to="/gifts" className="btn btn--gold">SHOP GIFT COMBOS</Link>
              <Link to="/gifts/build" className="btn btn--outline">CREATE A GIFT BOX</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark home__s home__s--why" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head section-head--center"><h2 id="why-title">Why GLOWNEST?</h2></div>
          <div className="grid feature-grid">
            {why.map(({ icon: Icon, title, text }) => (
              <div className="feature" key={title}><Icon size={28} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark home__s home__s--story" aria-labelledby="story-title" style={{ borderTop: '1px solid #2c2726' }}>
        <div className="container split">
          <div className="split__media"><ProductImage src="/images/story.jpg" alt="A handmade GLOWNEST candle glowing in a dim room" label="Brand story photo" dark /></div>
          <div>
            <h2 id="story-title">It started with a little glow.</h2>
            <div className="prose" style={{ color: 'var(--on-dark-muted)' }}>
              <p>We believe that beautiful moments don’t always need a big occasion.</p>
              <p>Sometimes, it’s a small gift.</p>
              <p>A cozy evening.</p>
              <p>A thoughtful surprise.</p>
              <p>Or simply a moment for yourself.</p>
              <p>GLOWNEST was created to bring those little moments to life through handmade, aesthetic and giftable candles.</p>
              <p>Every candle is made with care, creativity and a little glow.</p>
            </div>
            <div className="signature"><strong>GLOWNEST</strong><span>light up your moments.</span></div>
            <div className="btn-row"><Link to="/about" className="btn btn--outline">MEET GLOWNEST →</Link></div>
          </div>
        </div>
      </section>

      <section className="section section--ivory home__s home__s--insta" aria-labelledby="insta-title">
        <div className="container">
          <div className="section-head"><h2 id="insta-title">See what’s glowing. ✨</h2><p>Follow our candle journey on Instagram.</p></div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem' }}>{business.instagramHandle}</p>
          <InstagramGrid />
          <div className="btn-row">
            <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark"><Instagram size={16} aria-hidden="true" /> FOLLOW US ON INSTAGRAM</a>
          </div>
        </div>
      </section>

      {/* No review cards: authentic customer reviews must be supplied by the owner before any are shown. */}
      <section className="section home__s home__s--reviews" aria-labelledby="rev-title">
        <div className="container section-head section-head--center" style={{ marginBottom: 0 }}>
          <h2 id="rev-title">Your glow, your words.</h2>
          <p>Tried a GLOWNEST candle? We’d love to hear how it made your moment feel. Share your thoughts and photos with us on Instagram or WhatsApp.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">SHARE ON INSTAGRAM</a>
            <WhatsAppLink message={`Hi ${business.brandName}! I'd like to share feedback about my candle.`} className="btn btn--outline">SHARE ON WHATSAPP</WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="section section--charcoal home__s home__s--bulk" aria-labelledby="bulk-title">
        <div className="container">
          <div className="section-head"><h2 id="bulk-title">Planning something special?</h2>
            <p>From intimate celebrations to large gifting orders, GLOWNEST creates beautiful candles for every occasion.</p></div>
          <ul className="chips">{occasions.map((o) => <li className="chip" key={o}>{o}</li>)}</ul>
          <div className="btn-row">
            <Link to="/bulk-orders" className="btn btn--gold">REQUEST BULK QUOTE</Link>
            <WhatsAppLink className="btn btn--outline" message={`Hi ${business.brandName}! I'm planning a bulk/custom order.`}><MessageCircle size={16} aria-hidden="true" /> WHATSAPP US</WhatsAppLink>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--on-dark-muted)' }}>WhatsApp: {business.whatsappNumber}</p>
        </div>
      </section>

      <section className="section section--dark cta-final home__s home__s--final" aria-labelledby="final-title">
        <div className="container">
          <h2 id="final-title">Ready to light up your moment? ✨</h2>
          <p style={{ color: 'var(--on-dark-muted)' }}>Find a candle that feels like you.</p>
          <div className="btn-row">
            <Link to="/shop" className="btn btn--gold">SHOP GLOWNEST</Link>
            <WhatsAppLink className="btn btn--outline">ORDER ON WHATSAPP</WhatsAppLink>
          </div>
          <div className="signature" style={{ marginTop: '2.5rem' }}><strong>GLOWNEST</strong><span>light up your moments.</span></div>
        </div>
      </section>
    </div>
  );
}
