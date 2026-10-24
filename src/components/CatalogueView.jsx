import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import { filterProducts, sortProducts } from '../utils/shopFilters';

// Shared by /shop and /under-99. `baseProducts` is the pool; `maxPrice` (numeric) is applied on top.
export default function CatalogueView({ baseProducts, maxPrice = null }) {
  const [params, setParams] = useSearchParams();
  const values = {
    q: params.get('q') || '', category: params.get('category') || '',
    mood: params.get('mood') || '', sort: params.get('sort') || 'featured',
  };
  const hasFilters = Boolean(values.q || values.category || values.mood || values.sort !== 'featured');

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => { if (!v || v === 'featured') next.delete(k); else next.set(k, v); });
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () => sortProducts(filterProducts(baseProducts, { query: values.q, category: values.category, mood: values.mood, maxPrice }), values.sort),
    [baseProducts, maxPrice, values.q, values.category, values.mood, values.sort] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="container section" style={{ paddingTop: '2rem' }}>
      <ProductFilters values={values} onChange={update} onClear={() => setParams({}, { replace: true })} hasFilters={hasFilters} />
      <p className="result-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? 'candle' : 'candles'}</p>
      {results.length ? <ProductGrid products={results} wide /> : (
        <div className="empty">
          <h2>No candles match that.</h2>
          <p className="muted">Try a different word or clear your filters.</p>
          <button type="button" className="btn btn--dark" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
          <p style={{ marginTop: '1rem' }}><Link to="/bulk-orders" className="btn btn--ghost">Looking for something custom?</Link></p>
        </div>
      )}
    </div>
  );
}
