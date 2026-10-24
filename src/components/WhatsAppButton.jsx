import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, generalMessage } from '../utils/whatsapp';

// Reusable link. If the configured number is invalid, it renders a disabled notice instead of a broken URL.
export function WhatsAppLink({ message, children, className = 'btn btn--outline', ...rest }) {
  const href = buildWhatsAppUrl(message ?? generalMessage());
  if (!href) return <span className={`${className} btn--disabled`} aria-disabled="true">WhatsApp not configured</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

export default function WhatsAppButton() {
  const href = buildWhatsAppUrl(generalMessage());
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat with GLOWNEST on WhatsApp">
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
