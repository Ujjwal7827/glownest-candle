import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

export default function NotFound({ title = 'This page has gone out.' }) {
  usePageMeta('Page not found', 'The page you were looking for could not be found.');
  return (
    <div className="section section--dark" style={{ minHeight: '60vh', display: 'grid', alignContent: 'center' }}>
      <div className="container cta-final">
        <p className="hero__line">404</p>
        <h1>{title}</h1>
        <p style={{ color: 'var(--on-dark-muted)' }}>Let’s get you back to something glowing.</p>
        <div className="btn-row">
          <Link to="/shop" className="btn btn--gold">SHOP GLOWNEST</Link>
          <Link to="/" className="btn btn--outline">GO HOME</Link>
        </div>
        <div className="signature" style={{ marginTop: '2rem' }}><strong>GLOWNEST</strong><span>light up your moments.</span></div>
      </div>
    </div>
  );
}
