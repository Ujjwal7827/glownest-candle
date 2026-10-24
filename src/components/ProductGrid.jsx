import ProductCard from './ProductCard';

export default function ProductGrid({ products, wide = false }) {
  return (
    <div className={`grid grid--products ${wide ? 'is-wide' : ''}`}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
