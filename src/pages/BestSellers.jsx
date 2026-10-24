import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { bySlugs, bestSellerSlugs } from '../data/products';
import { usePageMeta } from '../utils/usePageMeta';

export default function BestSellers() {
  usePageMeta('Best Sellers', 'Our most-loved GLOWNEST creations: peony rose, tulip bouquet, teddy rose and heart bubble candles.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>Made to be noticed. ✨</h1><p>Our most-loved GLOWNEST creations.</p></div></div>
      <div className="container section" style={{ paddingTop: '2.5rem' }}>
        <ProductGrid products={bySlugs(bestSellerSlugs)} wide />
        <div className="btn-row"><Link to="/shop" className="btn btn--ghost">VIEW ALL CANDLES →</Link></div>
      </div>
    </>
  );
}
