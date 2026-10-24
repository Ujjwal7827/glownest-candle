import { business } from '../config/business';
import { formatPrice } from './currency';
import { normalizePhone } from './validation';

// Returns '91XXXXXXXXXX' or null when the configured number is invalid / a placeholder.
export const getWhatsAppNumber = (number = business.whatsappNumber) => {
  const n = normalizePhone(number);
  if (!/^[6-9]\d{9}$/.test(n) || /^(\d)\1{9}$/.test(n)) return null;
  return `91${n}`;
};

export const buildWhatsAppUrl = (message = '', number) => {
  const intl = getWhatsAppNumber(number);
  if (!intl) return null;
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
};

export const generalMessage = () =>
  `Hi ${business.brandName}! I'd like to know more about your candles.`;

export const productEnquiryMessage = (product) =>
  `Hi ${business.brandName}! I'm interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`;

const orderLines = (lines) =>
  lines.map(
    (l, i) =>
      `${i + 1}. ${l.name} — ${l.quantity} × ${formatPrice(l.price)} = ${formatPrice(l.price * l.quantity)}`
  );

// lines: [{name, price, quantity}]; customer/address optional; shipping: {label, price}|null
export const orderMessage = ({ lines, subtotal, shipping = null, customer = {}, address = {}, notes = '' }) => {
  const out = [`Hi ${business.brandName}! I'd like to request this order:`, ''];
  if (customer.name) out.push(`Name: ${customer.name}`);
  if (customer.phone) out.push(`Mobile: ${customer.phone}`);
  if (customer.email) out.push(`Email: ${customer.email}`);
  if (customer.name || customer.phone || customer.email) out.push('');
  out.push(...orderLines(lines), '', `Subtotal: ${formatPrice(subtotal)}`);
  if (shipping && typeof shipping.price === 'number') {
    out.push(`Shipping (${shipping.label}): ${formatPrice(shipping.price)}`);
    out.push(`Total: ${formatPrice(subtotal + shipping.price)}`);
  } else {
    out.push('Shipping: to be confirmed');
  }
  const addr = [address.line1, address.area, address.city, address.state, address.pin].filter(Boolean);
  if (addr.length) out.push('', `Delivery address: ${addr.join(', ')}`);
  if (notes) out.push('', `Notes: ${notes}`);
  out.push('', 'Please confirm availability, delivery and payment details.');
  return out.join('\n');
};

export const quoteMessage = (f) =>
  [
    `Hi ${business.brandName}! I'd like a bulk/custom quote:`,
    '',
    `Name: ${f.name}`,
    `WhatsApp: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
    `Event type: ${f.eventType}`,
    `Quantity: ${f.quantity}`,
    f.candle ? `Preferred candle: ${f.candle}` : null,
    f.colour ? `Preferred colour: ${f.colour}` : null,
    f.fragrance ? `Fragrance preference: ${f.fragrance}` : null,
    f.date ? `Required by: ${f.date}` : null,
    f.message ? `\nMessage: ${f.message}` : null,
  ].filter((x) => x !== null).join('\n');

export const contactMessage = (f) =>
  [`Hi ${business.brandName}!`, `Name: ${f.name}`, f.phone ? `Mobile: ${f.phone}` : null,
   f.email ? `Email: ${f.email}` : null, '', f.message].filter((x) => x !== null).join('\n');

export const giftMessage = ({ lines, subtotal, packaging, giftNote }) =>
  [
    `Hi ${business.brandName}! I'd like to build a gift box:`, '',
    ...orderLines(lines), '',
    `Provisional candle subtotal: ${formatPrice(subtotal)}`,
    packaging ? `Packaging: ${packaging}` : 'Packaging: to be discussed',
    giftNote ? `Gift message: ${giftNote}` : null,
    '', 'Please confirm packaging cost and the final price.',
  ].filter((x) => x !== null).join('\n');
