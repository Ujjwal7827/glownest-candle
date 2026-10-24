import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import ProductImage from './ProductImage';

export default function ProductCard({ product, showActions = true }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const soldOut = product.available === false;

  const buyNow = () => { addItem(product, 1); navigate('/checkout'); };

  return (
    <article className="pcard">
      <Link to={`/product/${product.slug}`} className="pcard__media" aria-label={`View ${product.name}`}>
        <ProductImage src={product.image} alt={product.name} label={product.name} />
      </Link>
      <div className="pcard__body">
        <h3 className="pcard__name"><Link to={`/product/${product.slug}`}>{product.name}</Link></h3>
        <span className="pcard__price">{formatPrice(product.price)}</span>
        <p className="pcard__desc">{product.description}</p>
        {product.bulkPricing && <p className="muted" style={{ fontSize: '.8rem', margin: '-.3rem 0 .6rem' }}>Bulk: {product.bulkPricing.map((b) => `${b.qty} pcs ${formatPrice(b.total)}`).join(' · ')}</p>}
        {showActions && (
          <div className="pcard__actions">
            <button type="button" className="btn btn--dark btn--small" onClick={() => addItem(product, 1)} disabled={soldOut}>
              {soldOut ? 'Unavailable' : 'Add to Cart'}
            </button>
            <button type="button" className="btn btn--outline btn--small" onClick={buyNow} disabled={soldOut}>Buy Now</button>
          </div>
        )}
      </div>
    </article>
  );
}
