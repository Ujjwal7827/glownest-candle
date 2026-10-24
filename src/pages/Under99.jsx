import CatalogueView from '../components/CatalogueView';
import { catalogue, UNDER_LIMIT } from '../data/products';
import { usePageMeta } from '../utils/usePageMeta';

export default function Under99() {
  usePageMeta('Candles Under ₹99', 'Little GLOWNEST candles under ₹99 — easy, beautiful gifting without the big price tag.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>Little candles. Easy gifting. 🤍</h1><p>Beautiful little gifts without the big price tag. Every candle here is priced under ₹99.</p></div></div>
      {/* Numeric limit: products priced at ₹99 or more are always excluded */}
      <CatalogueView baseProducts={catalogue} maxPrice={UNDER_LIMIT} />
    </>
  );
}
