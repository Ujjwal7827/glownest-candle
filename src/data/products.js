// Product catalogue — prices are initial business-provided values and are editable.
// Images: drop real photos into /public/images/products/<slug>.jpg (or change `image`).
// A missing image shows a clearly marked placeholder, never a fake photo.
//
// Optional fields (leave out unless the owner confirms them):
//   gallery: ['/images/products/peony-rose-2.jpg'], fragrances: ['Rose'], colours: ['Pink'],
//   available: false (marks sold out). Nothing here is invented: no stock, weights, burn times.

const DEFAULT_CARE = [
  'Place on a heat-resistant surface.',
  'Keep away from children and pets.',
  'Never leave a burning candle unattended.',
  'Keep away from curtains and other flammable objects.',
  'Trim the wick before lighting when applicable.',
];

const base = {
  type: 'Decorative Candle',
  material: 'Wax',
  suitableFor: 'Décor & gifting',
  care: DEFAULT_CARE,
  fragrances: [],
  colours: [],
  available: true,
  published: true,
};

export const products = [
  {
    ...base, id: 'gn-laadu', slug: 'laadu', name: 'Laadu Candle', price: 39,
    category: 'Festive', moods: ['cute'],
    description: 'A cute laadu-shaped decorative candle, made for festive gifting.',
    image: '/images/products/laadu.jpg',
  },
  {
    ...base, id: 'gn-modak', slug: 'modak', name: 'Modak Candle', price: 39,
    category: 'Festive', moods: [],
    description: 'A modak-shaped decorative candle, made for festive gifting.',
    image: '/images/products/modak.jpg',
  },
  {
    ...base, id: 'gn-daisy-sunflower', slug: 'daisy-sunflower', name: 'Daisy/Sunflower Candle', price: 49,
    category: 'Floral', moods: ['cute'],
    description: 'A cheerful floral candle to brighten everyday corners.',
    image: '/images/products/daisy-sunflower.jpg',
  },
  {
    ...base, id: 'gn-peony-rose', slug: 'peony-rose', name: 'Peony Rose Candle', price: 59,
    category: 'Floral', moods: ['romantic'],
    description: 'A delicate floral candle made to add a soft, beautiful glow to your space.',
    image: '/images/products/peony-rose.jpg',
  },
  {
    ...base, id: 'gn-teddy-rose', slug: 'teddy-rose', name: 'Teddy Rose Candle', price: 129,
    category: 'Cute & Character', moods: ['romantic'],
    description: 'A little teddy, a little rose, and a whole lot of cute.',
    image: '/images/products/teddy-rose.jpg',
  },
  {
    ...base, id: 'gn-tulip-bouquet', slug: 'tulip-bouquet', name: 'Tulip Bouquet Candle', price: 149,
    category: 'Floral', moods: ['statement'],
    description: 'A bouquet that never fades — beautifully crafted for gifting and décor.',
    image: '/images/products/tulip-bouquet.jpg',
  },
  {
    ...base, id: 'gn-heart-bubble', slug: 'heart-bubble', name: 'Heart Bubble Candle', price: 199,
    category: 'Statement', moods: ['statement'],
    description: 'A bubbly little statement piece made for love, gifting and cozy corners.',
    image: '/images/products/heart-bubble.jpg',
  },

  // ---- HAMPERS (prices and bulk totals as provided by the owner; contents as pictured) ----
  {
    ...base, id: 'gn-hamper-299', slug: 'laddu-diya-hamper', name: 'Laddu & Diya Hamper', price: 299,
    category: 'Hampers', moods: [], type: 'Gift Hamper', material: null, suitableFor: 'Festive gifting',
    description: 'A white gift box with two diya-style candles and six laddu candles.',
    image: '/images/products/hamper-299.jpg',
    bulkPricing: [{ qty: 50, total: 14000 }, { qty: 100, total: 29000 }],
  },
  {
    ...base, id: 'gn-hamper-349', slug: 'festive-moments-hamper', name: 'Festive Moments Hamper', price: 349,
    category: 'Hampers', moods: [], type: 'Gift Hamper', material: null, suitableFor: 'Festive gifting',
    description: 'A festive gift box of sweet-shaped candles: diamond, modak, laddu, flower and gujiya styles.',
    image: '/images/products/hamper-349.jpg',
    bulkPricing: [{ qty: 50, total: 17000 }, { qty: 100, total: 34000 }],
  },
  {
    ...base, id: 'gn-hamper-499', slug: 'golden-bloom-hamper', name: 'Golden Bloom Hamper', price: 499,
    category: 'Hampers', moods: [], type: 'Gift Hamper', material: null, suitableFor: 'Gifting & celebrations',
    description: 'A white gift box with two flower-shaped dish candles and four laddu candles.',
    image: '/images/products/hamper-499.jpg',
    bulkPricing: [{ qty: 50, total: 21500 }, { qty: 100, total: 44000 }],
  },
  {
    ...base, id: 'gn-hamper-649', slug: 'teddy-tulip-hamper', name: 'Teddy & Tulip Hamper', price: 649,
    category: 'Hampers', moods: [], type: 'Gift Hamper', material: null, suitableFor: 'Gifting & celebrations',
    description: 'A kraft gift box with a teddy rose candle, a tulip bouquet candle, a jar candle and two tealights.',
    customisation: 'The jar candle can be replaced with a bubble candle, and the tealights with daisy flower candles.',
    image: '/images/products/hamper-649.jpg',
    bulkPricing: [{ qty: 50, total: 30000 }, { qty: 100, total: 62000 }],
  },

  // ---- SAMPLE TEMPLATE (hidden: published:false). Copy it to add a new product. ----
  {
    ...base, id: 'gn-sample', slug: 'sample-product', name: 'SAMPLE PRODUCT (template)', price: 0,
    category: 'Floral', moods: [], published: false, isSample: true,
    description: 'Template entry showing every supported field. Not shown on the site.',
    image: '/images/products/sample.jpg',
    gallery: [], fragrances: [], colours: [],
  },
];

export const catalogue = products.filter((p) => p.published);
export const getProductBySlug = (slug) => catalogue.find((p) => p.slug === slug);
export const getProductById = (id) => catalogue.find((p) => p.id === id);
export const categories = [...new Set(catalogue.map((p) => p.category))];

// Explicit curated lists — NOT popularity data.
export const bestSellerSlugs = ['peony-rose', 'tulip-bouquet', 'teddy-rose', 'heart-bubble'];
export const under99Slugs = ['daisy-sunflower', 'peony-rose', 'laadu', 'modak'];
export const UNDER_LIMIT = 99;

export const bySlugs = (slugs) => slugs.map(getProductBySlug).filter(Boolean);
