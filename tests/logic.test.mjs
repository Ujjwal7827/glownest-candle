import test from 'node:test';
import assert from 'node:assert/strict';
import { cartReducer, sanitizeCart, deriveLines, cartSubtotal, cartCount } from '../src/context/cartReducer.js';
import { catalogue, bySlugs, bestSellerSlugs, under99Slugs, UNDER_LIMIT } from '../src/data/products.js';
import { filterProducts, sortProducts } from '../src/utils/shopFilters.js';
import { getWhatsAppNumber, buildWhatsAppUrl, orderMessage, quoteMessage } from '../src/utils/whatsapp.js';
import * as v from '../src/utils/validation.js';

test('add duplicate merges quantity', () => {
  let s = cartReducer([], { type: 'ADD', id: 'gn-peony-rose' });
  s = cartReducer(s, { type: 'ADD', id: 'gn-peony-rose', quantity: 2 });
  assert.deepEqual(s, [{ id: 'gn-peony-rose', quantity: 3 }]);
});
test('decrement never below 1, remove deletes', () => {
  let s = cartReducer([], { type: 'ADD', id: 'gn-laadu' });
  s = cartReducer(s, { type: 'DECREMENT', id: 'gn-laadu' });
  assert.equal(s[0].quantity, 1);
  assert.deepEqual(cartReducer(s, { type: 'REMOVE', id: 'gn-laadu' }), []);
});
test('unknown product ignored', () => assert.deepEqual(cartReducer([], { type: 'ADD', id: 'nope' }), []));
test('sanitize handles malformed and outdated data', () => {
  assert.deepEqual(sanitizeCart('junk'), []);
  assert.deepEqual(sanitizeCart(null), []);
  const out = sanitizeCart([{ id: 'gn-modak', quantity: '2' }, { id: 'gn-modak', quantity: 1 }, { id: 'old', quantity: 4 }, { id: 'gn-laadu', quantity: -3 }, null, { quantity: 2 }, { id: 'gn-laadu', quantity: 'abc' }]);
  assert.deepEqual(out, [{ id: 'gn-modak', quantity: 3 }]);
});
test('prices come from product data, not storage', () => {
  const lines = deriveLines([{ id: 'gn-peony-rose', quantity: 2, price: 1 }]);
  assert.equal(lines[0].price, 59);
  assert.equal(cartSubtotal([{ id: 'gn-peony-rose', quantity: 2 }, { id: 'gn-heart-bubble', quantity: 1 }]), 59 * 2 + 199);
  assert.equal(cartCount([{ id: 'a', quantity: 2 }, { id: 'b', quantity: 3 }]), 5);
});
test('sample product is hidden from catalogue', () => assert.ok(!catalogue.some((p) => p.isSample)));
test('under 99 excludes >= 99 and uses numbers', () => {
  const r = filterProducts(catalogue, { maxPrice: UNDER_LIMIT });
  assert.ok(r.length > 0 && r.every((p) => typeof p.price === 'number' && p.price < 99));
  assert.deepEqual(r.map((p) => p.slug).sort(), [...under99Slugs].sort());
  assert.ok(!r.some((p) => p.slug === 'teddy-rose'));
});
test('curated bestsellers resolve', () => assert.equal(bySlugs(bestSellerSlugs).length, 4));
test('search is case-insensitive partial; filters + sort combine', () => {
  assert.deepEqual(filterProducts(catalogue, { query: 'ROS' }).map((p) => p.slug).sort(), ['peony-rose', 'teddy-rose']);
  const r = sortProducts(filterProducts(catalogue, { mood: 'romantic', maxPrice: 200 }), 'price-desc');
  assert.deepEqual(r.map((p) => p.slug), ['teddy-rose', 'peony-rose']);
  assert.equal(filterProducts(catalogue, { query: 'zzz' }).length, 0);
});
test('whatsapp number + url', () => {
  assert.equal(getWhatsAppNumber('7840867583'), '917840867583');
  assert.equal(getWhatsAppNumber('0000000000'), null);
  assert.equal(getWhatsAppNumber('1234567890'), null);
  assert.equal(getWhatsAppNumber('+91 78408 67583'), '917840867583');
  const url = buildWhatsAppUrl('Hi & bye\nline 2');
  assert.ok(url.startsWith('https://wa.me/917840867583?text='));
  assert.ok(url.includes(encodeURIComponent('Hi & bye\nline 2')));
  assert.equal(buildWhatsAppUrl('x', '123'), null);
});
test('order message has items, totals, and no invented shipping', () => {
  const lines = deriveLines([{ id: 'gn-peony-rose', quantity: 2 }, { id: 'gn-teddy-rose', quantity: 1 }]);
  const m = orderMessage({ lines, subtotal: 247, customer: { name: 'Asha' } });
  assert.match(m, /Peony Rose Candle — 2 × ₹59 = ₹118/);
  assert.match(m, /Subtotal: ₹247/);
  assert.match(m, /Shipping: to be confirmed/);
  assert.doesNotMatch(m, /Total:/);
  const m2 = orderMessage({ lines, subtotal: 247, shipping: { label: 'Courier', price: 60 } });
  assert.match(m2, /Total: ₹307/);
});
test('quote message carries event type + quantity', () => {
  const m = quoteMessage({ name: 'A', phone: '9876543210', eventType: 'Weddings & Engagements', quantity: '50' });
  assert.match(m, /Event type: Weddings & Engagements/); assert.match(m, /Quantity: 50/);
});
test('validators', () => {
  assert.equal(v.validEmail('a@b.co'), ''); assert.ok(v.validEmail('a@b'));
  assert.equal(v.validEmail('', { optional: true }), '');
  assert.equal(v.validPhone('98765 43210'), ''); assert.ok(v.validPhone('12345')); assert.equal(v.validPhone('+919876543210'), '');
  assert.equal(v.validPin('302001'), ''); assert.ok(v.validPin('012345'));
  assert.equal(v.positiveInt('25'), ''); assert.ok(v.positiveInt('0')); assert.ok(v.positiveInt('2.5')); assert.ok(v.positiveInt('-1'));
  assert.ok(v.futureDate('2020-01-01')); assert.equal(v.futureDate(''), '');
  const t = new Date(); t.setDate(t.getDate() + 3);
  assert.equal(v.futureDate(t.toISOString().slice(0, 10)), '');
});

test('hampers: category, owner bulk totals, never under 99', () => {
  const h = catalogue.filter((p) => p.category === 'Hampers');
  assert.deepEqual(h.map((p) => p.price).sort((a, b) => a - b), [299, 349, 499, 649]);
  const totals = Object.fromEntries(h.map((p) => [p.price, p.bulkPricing.map((b) => b.total)]));
  assert.deepEqual(totals, { 299: [14000, 29000], 349: [17000, 34000], 499: [21500, 44000], 649: [30000, 62000] });
  assert.ok(h.every((p) => p.bulkPricing.map((b) => b.qty).join() === '50,100'));
  assert.ok(!filterProducts(catalogue, { maxPrice: 99 }).some((p) => p.category === 'Hampers'));
  assert.equal(filterProducts(catalogue, { category: 'Hampers' }).length, 4);
});
