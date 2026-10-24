import { Link } from 'react-router-dom';
import { LogoImage } from './Logo';
import { footerNav } from '../config/nav';
import { business } from '../config/business';
import { buildWhatsAppUrl, generalMessage } from '../utils/whatsapp';

const LinkList = ({ items }) => (
  <ul>{items.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}</ul>
);

export default function Footer() {
  const wa = buildWhatsAppUrl(generalMessage());
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <LogoImage />
            <p style={{ color: 'var(--on-dark-muted)', maxWidth: '30ch' }}>{business.brandLine}</p>
          </div>
          <nav aria-label="Shop"><h4>Shop</h4><LinkList items={footerNav.shop} /></nav>
          <nav aria-label="Help"><h4>Help</h4><LinkList items={footerNav.help} /></nav>
          <nav aria-label="GLOWNEST">
            <h4>GLOWNEST</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href={business.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            </ul>
          </nav>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>WhatsApp: {business.whatsappNumber}</li>
              <li>Instagram: <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer">{business.instagramHandle}</a></li>
              {business.email && <li><a href={`mailto:${business.email}`}>{business.email}</a></li>}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{business.brandName} — {business.tagline}</span>
          <span>© {new Date().getFullYear()} {business.brandName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
