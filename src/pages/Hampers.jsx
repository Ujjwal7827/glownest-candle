import CatalogueView from '../components/CatalogueView';
import { catalogue } from '../data/products';
import { usePageMeta } from '../utils/usePageMeta';

const hampers = catalogue.filter((p) => p.category === 'Hampers');

export default function Hampers() {
  usePageMeta('Gift Hampers', 'GLOWNEST gift hampers of handmade candles, with bulk pricing for 50 and 100 pieces.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>Gift Hampers</h1><p>Beautifully boxed candle sets for festivals, celebrations and thoughtful gifting. Ordering 50 or 100? See bulk pricing on each hamper.</p></div></div>
      <CatalogueView baseProducts={hampers} />
    </>
  );
}
