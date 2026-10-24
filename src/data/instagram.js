import { business } from '../config/business';

// Six editable tiles. They reuse GLOWNEST product photos that already ship with the site.
// To use real Instagram photos later, change `image` and optionally set `url` to the specific post.
// No live Instagram feed is fetched.
const photos = [
  ['/images/products/tulip-bouquet.jpg', 'Tulip bouquet candles'],
  ['/images/products/teddy-rose.jpg', 'Teddy rose candle'],
  ['/images/products/hamper-349.jpg', 'Festive gift hamper of candles'],
  ['/images/products/heart-bubble.jpg', 'Heart bubble candles'],
  ['/images/products/daisy-sunflower.jpg', 'Sunflower candles'],
  ['/images/products/peony-rose.jpg', 'Peony rose candle'],
];

export const instagramTiles = photos.map(([image, alt], i) => ({
  id: i + 1,
  image,
  alt: `GLOWNEST — ${alt}`,
  url: business.instagramUrl,
}));
