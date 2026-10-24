import { formatPrice } from '../utils/currency';

// Shop-by-mood cards and gift offerings. All copy and prices are editable.
export const moods = [
  { id: 'romantic', title: 'Soft & Romantic', items: 'Peony Rose, Teddy Rose', button: 'SHOP ROMANTIC', to: '/shop?mood=romantic', image: '/images/moods/romantic.jpg' },
  { id: 'cute', title: 'Cute & Cheerful', items: 'Daisy, Sunflower, Laadu', button: 'SHOP CUTE', to: '/shop?mood=cute', image: '/images/moods/cute.jpg' },
  { id: 'gift', title: 'Made to Gift', items: 'Gift Combos, Gift Boxes', button: 'SHOP GIFTS', to: '/gifts', image: '/images/moods/gift.jpg' },
  { id: 'statement', title: 'Statement Pieces', items: 'Heart Bubble, Tulip Bouquet', button: 'SHOP STATEMENT', to: '/shop?mood=statement', image: '/images/moods/statement.jpg' },
];

export const moodLabels = { romantic: 'Soft & Romantic', cute: 'Cute & Cheerful', statement: 'Statement Pieces' };

export const occasions = [
  'Return Gifts', 'Weddings & Engagements', 'Birthdays',
  'Festive Gifting', 'Corporate Gifting', 'Events & Celebrations',
];

// priceType: 'fixed' | 'from' | 'custom'. startingPrice is numeric; never parse "₹299+".
// confirmed:false => proposed sample price awaiting owner approval.
export const giftBoxes = [
  { id: 'mini-glow', name: 'Mini Glow', priceType: 'fixed', startingPrice: 149, confirmed: false,
    description: 'A small, thoughtful gift to say it with a glow.', details: 'Contents to be confirmed by the owner.', image: '/images/gifts/mini-glow.jpg' },
  { id: 'love-bloom', name: 'Love & Bloom', priceType: 'fixed', startingPrice: 249, confirmed: false,
    description: 'A floral-led gift for the people you love.', details: 'Contents to be confirmed by the owner.', image: '/images/gifts/love-and-bloom.jpg' },
  { id: 'celebration', name: 'Celebration Box', priceType: 'from', startingPrice: 299, confirmed: false,
    description: 'For birthdays, celebrations and little surprises.', details: 'Final price depends on the candles and packaging you choose.', image: '/images/gifts/celebration-box.jpg' },
  { id: 'custom', name: 'Custom Gift Box', priceType: 'custom', startingPrice: null, confirmed: false,
    description: 'Tell us what you have in mind and we will help shape it.', details: 'Priced after we confirm your selection and packaging.', image: '/images/gifts/custom-box.jpg' },
];

// Gift builder packaging. Empty prices = not yet configured, so no final price is ever claimed.
export const packagingOptions = [
  { id: 'standard', label: 'Gift box (price to be confirmed)', price: null },
  { id: 'none', label: 'No gift packaging', price: 0 },
];

export const giftPriceLabel = (g) => {
  if (g.priceType === 'custom') return 'Custom price';
  return g.priceType === 'from' ? `From ${formatPrice(g.startingPrice)}` : formatPrice(g.startingPrice);
};
