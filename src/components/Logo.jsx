import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

// The ORIGINAL logo file, used as-is: never recoloured, cropped or redrawn.
export function LogoImage({ className = '', height }) {
  return (
    <img
      src={brand.logo}
      alt={brand.logoAlt}
      className={`logo-img ${className}`}
      style={height ? { height } : undefined}
      width="1254"
      height="1254"
    />
  );
}

export default function Logo({ className = '', height }) {
  return (
    <Link to="/" className={`header__logo ${className}`} aria-label="GLOWNEST home">
      <LogoImage height={height} />
    </Link>
  );
}
