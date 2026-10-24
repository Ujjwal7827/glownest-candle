import { instagramTiles } from '../data/instagram';
import { business } from '../config/business';
import ProductImage from './ProductImage';

export default function InstagramGrid() {
  return (
    <div className="insta-grid">
      {instagramTiles.map((t) => (
        <a key={t.id} href={t.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.alt} — open ${business.instagramHandle} on Instagram`}>
          <ProductImage src={t.image} alt={t.alt} label="GLOWNEST" dark />
        </a>
      ))}
    </div>
  );
}
