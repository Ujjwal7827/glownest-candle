import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { business } from '../config/business';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__line">{business.brandLine}</p>
          <h1 id="hero-title">Little moments deserve a little glow. ✨</h1>
          <p className="hero__lead">Handmade candles designed to make your everyday moments feel special.</p>
          <div className="btn-row">
            <Link to="/shop" className="btn btn--gold">SHOP COLLECTION</Link>
            <Link to="/gifts" className="btn btn--outline">EXPLORE GIFTING</Link>
          </div>
          <p className="hero__sign">{business.brandName} — {business.tagline}</p>
        </div>
        <div className="hero__media">
          {/* Add a real peony / tulip candle photo at public/images/hero.jpg */}
          <ProductImage src="/images/hero.jpg" alt="Handmade GLOWNEST floral candle glowing in warm candlelight" label="Hero candle photo" dark loading="eager" />
        </div>
      </div>
    </section>
  );
}
