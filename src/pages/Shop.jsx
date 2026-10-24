import CatalogueView from '../components/CatalogueView';
import { catalogue } from '../data/products';
import { usePageMeta } from '../utils/usePageMeta';

export default function Shop() {
  usePageMeta('Shop Candles', 'Browse handmade floral, festive and statement candles from GLOWNEST. Search, filter and sort to find your glow.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>Shop the collection</h1><p>Handmade, aesthetic candles for gifting, décor and cozy corners.</p></div></div>
      <CatalogueView baseProducts={catalogue} />
    </>
  );
}
