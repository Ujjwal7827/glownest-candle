import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import QuantitySelector from './QuantitySelector';
import ProductImage from './ProductImage';

export default function CartItem({ line, onNavigate }) {
  const { setQuantity, removeItem } = useCart();
  return (
    <li className="cart-item">
      <div className="cart-item__img"><ProductImage src={line.image} alt={line.name} label={line.name} /></div>
      <div>
        <div className="cart-item__top">
          <Link to={`/product/${line.slug}`} className="cart-item__name" onClick={onNavigate}>{line.name}</Link>
          <strong>{formatPrice(line.lineTotal)}</strong>
        </div>
        <div className="muted" style={{ fontSize: '.88rem' }}>{formatPrice(line.price)} each</div>
        <div className="cart-item__bottom">
          <QuantitySelector value={line.quantity} onChange={(q) => setQuantity(line.id, q)} label={`Quantity for ${line.name}`} />
          <button type="button" className="link-btn" onClick={() => removeItem(line.id)} aria-label={`Remove ${line.name}`}>
            <Trash2 size={14} aria-hidden="true" style={{ verticalAlign: '-2px' }} /> Remove
          </button>
        </div>
      </div>
    </li>
  );
}
