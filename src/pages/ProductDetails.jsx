import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import QuantitySelector from '../components/QuantitySelector';
import ProductImage from '../components/ProductImage';
import ProductGrid from '../components/ProductGrid';
import Accordion from '../components/Accordion';
import { WhatsAppLink } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { getProductBySlug, catalogue } from '../data/products';
import { productFaq } from '../data/faq';
import { formatPrice } from '../utils/currency';
import { productEnquiryMessage } from '../utils/whatsapp';
import { usePageMeta } from '../utils/usePageMeta';
import NotFound from './NotFound';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => { setQty(1); setActive(0); }, [slug]);
  usePageMeta(product?.name || 'Product not found', product?.description);

  // Basic Product structured data (no ratings, reviews or stock claims).
  useEffect(() => {
    if (!product) return undefined;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description,
      brand: { '@type': 'Brand', name: 'GLOWNEST' }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price } });
    document.head.appendChild(el);
    return () => el.remove();
  }, [product]);

  if (!product) return <NotFound title="We couldn’t find that candle." />;

  const images = product.gallery?.length ? [product.image, ...product.gallery] : [product.image];
  const soldOut = product.available === false;
  const related = catalogue.filter((p) => p.id !== product.id && (p.category === product.category || p.moods.some((m) => product.moods.includes(m)))).slice(0, 4);
  const fallbackRelated = related.length ? related : catalogue.filter((p) => p.id !== product.id).slice(0, 4);

  const add = () => addItem(product, qty);
  const buyNow = () => { addItem(product, qty); navigate('/checkout'); };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.name }]} />
      <div className="container pdp">
        <div>
          <div className="pdp__main"><ProductImage src={images[active]} alt={`${product.name}`} label={product.name} loading="eager" /></div>
          {images.length > 1 && (
            <div className="pdp__thumbs">
              {images.map((src, i) => (
                <button key={src + i} type="button" className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-pressed={i === active}>
                  <ProductImage src={src} alt="" label="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>{product.name}</h1>
          {/* Rating intentionally omitted: shown only when genuine review data exists. */}
          <p className="pdp__price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          {product.customisation && <p className="muted">{product.customisation}</p>}
          {product.bulkPricing && (
            <div className="card" style={{ margin: '1rem 0' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>Bulk pricing</h2>
              <table className="spec" style={{ margin: 0 }}>
                <tbody>
                  {product.bulkPricing.map((b) => (
                    <tr key={b.qty}><th scope="row">{b.qty} pcs</th><td>{formatPrice(b.total)} <span className="muted">(about {formatPrice(Math.round(b.total / b.qty))} each)</span></td></tr>
                  ))}
                </tbody>
              </table>
              <p style={{ margin: '.8rem 0 0' }}>
                <WhatsAppLink className="btn btn--outline btn--small" style={{ color: 'var(--text)' }}
                  message={`Hi GLOWNEST! I'd like a bulk quote for the ${product.name}: ${product.bulkPricing.map((b) => `${b.qty} pcs`).join(' / ')}.`}>
                  Ask for a bulk quote
                </WhatsAppLink>
              </p>
            </div>
          )}

          {/* Variant pickers are intentionally not rendered: the cart stores product + quantity only, so a chosen variant would be lost. Configured variants are listed below as text. */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.2rem 0' }}>
            <QuantitySelector value={qty} onChange={setQty} />
            {soldOut && <span className="muted">Currently unavailable</span>}
          </div>
          <div className="btn-row" style={{ marginTop: 0 }}>
            <button type="button" className="btn btn--dark" onClick={add} disabled={soldOut}>Add to Cart</button>
            <button type="button" className="btn btn--gold" onClick={buyNow} disabled={soldOut}>Buy Now</button>
          </div>
          <p style={{ marginTop: '1rem' }}>
            <WhatsAppLink className="btn btn--ghost" message={productEnquiryMessage(product)}>Ask about this candle on WhatsApp</WhatsAppLink>
          </p>

          <table className="spec">
            <tbody>
              <tr><th scope="row">Product</th><td>{product.name}</td></tr>
              <tr><th scope="row">Type</th><td>{product.type}</td></tr>
              {product.material && <tr><th scope="row">Material</th><td>{product.material}</td></tr>}
              {product.fragrances?.length > 0 && <tr><th scope="row">Fragrance</th><td>{product.fragrances.join(', ')}</td></tr>}
              {product.colours?.length > 0 && <tr><th scope="row">Colour</th><td>{product.colours.join(', ')}</td></tr>}
              <tr><th scope="row">Suitable for</th><td>{product.suitableFor}</td></tr>
            </tbody>
          </table>

          <Accordion items={[
            { q: 'Candle care', a: <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>{product.care.map((c) => <li key={c}>{c}</li>)}</ul> },
            { q: productFaq[1].q, a: <><p>Orders are carefully packed before dispatch.</p><p>Shipping charges are calculated according to delivery location/order value.</p></> },
          ]} />
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', marginTop: '1.5rem' }}>Add this little glow to your collection. ✨</p>
        </div>
      </div>

      <section className="section section--ivory" aria-labelledby="rel-title">
        <div className="container">
          <div className="section-head"><h2 id="rel-title">You might also like</h2></div>
          <ProductGrid products={fallbackRelated} wide />
          <div className="btn-row"><Link to="/shop" className="btn btn--ghost">← Back to shop</Link></div>
        </div>
      </section>
    </>
  );
}
