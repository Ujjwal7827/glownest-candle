import { Link } from 'react-router-dom';
import { LogoImage } from '../components/Logo';
import ProductImage from '../components/ProductImage';
import { usePageMeta } from '../utils/usePageMeta';

const values = [
  { t: 'Handmade', d: 'Made with care, one candle at a time.' },
  { t: 'Aesthetic', d: 'Designed to look beautiful even before it’s lit.' },
  { t: 'Giftable', d: 'Made for birthdays, celebrations and little surprises.' },
  { t: 'Thoughtful', d: 'Because small moments can mean a lot.' },
];

export default function About() {
  usePageMeta('About Us', 'GLOWNEST is a decorative candle brand creating handmade, aesthetic and giftable candles for little moments of glow.');
  return (
    <>
      <div className="page-head"><div className="container"><LogoImage height={180} /><h1 style={{ marginTop: '1.5rem' }}>More than candles. Little moments of glow.</h1></div></div>
      <section className="section">
        <div className="container split">
          <div className="prose">
            <p>GLOWNEST is a decorative candle brand created around a simple idea — beautiful moments can come from the smallest things.</p>
            <p>We create handmade, aesthetic and giftable candles designed to bring warmth, personality and beauty into everyday spaces.</p>
            <p>From a little floral candle to a thoughtful gift box, every GLOWNEST creation is made with attention to detail.</p>
            <p>Whether you’re gifting someone special or creating a cozy corner for yourself, we want every GLOWNEST candle to feel like a little moment worth remembering.</p>
            <div className="signature" style={{ color: 'var(--text)' }}><strong>GLOWNEST</strong><span style={{ color: 'var(--muted)' }}>light up your moments.</span></div>
          </div>
          <div className="split__media"><ProductImage src="/images/about.jpg" alt="Handmade GLOWNEST candles in warm light" label="Lifestyle photo" /></div>
        </div>
      </section>
      <section className="section section--charcoal" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head"><h2 id="values-title">What we care about</h2></div>
          <div className="grid feature-grid">{values.map((v) => <div className="feature" key={v.t}><h3>{v.t}</h3><p>{v.d}</p></div>)}</div>
        </div>
      </section>
      <section className="section section--ivory" aria-labelledby="process-title">
        <div className="container prose">
          <h2 id="process-title">How our candles are made</h2>
          {/* Editable: add the owner's accurate description of the making process here (materials, finishing). Only claims the owner can stand behind. */}
          <p>Every GLOWNEST candle is handmade with attention to detail.</p>
          <div className="btn-row"><Link to="/shop" className="btn btn--dark">SHOP THE COLLECTION</Link></div>
        </div>
      </section>
    </>
  );
}
