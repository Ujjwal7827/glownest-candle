// Pure cart logic. The cart stores ONLY { id, quantity }; names and prices are derived
// from the product data so stale or tampered localStorage can never change a price.
import { getProductById } from '../data/products';

export const MAX_QTY = 99;
export const CART_KEY = 'glownest.cart.v1';

const clamp = (n) => Math.min(MAX_QTY, Math.max(1, Math.floor(n)));

export const sanitizeCart = (raw) => {
  if (!Array.isArray(raw)) return [];
  const merged = new Map();
  for (const item of raw) {
    if (!item || typeof item.id !== 'string') continue;
    if (!getProductById(item.id)) continue; // outdated product
    const q = Number(item.quantity);
    if (!Number.isFinite(q) || q < 1) continue;
    merged.set(item.id, clamp((merged.get(item.id) || 0) + q));
  }
  return [...merged].map(([id, quantity]) => ({ id, quantity }));
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      if (!getProductById(action.id)) return state;
      const qty = clamp(action.quantity ?? 1);
      const found = state.find((i) => i.id === action.id);
      if (found) return state.map((i) => (i.id === action.id ? { ...i, quantity: clamp(i.quantity + qty) } : i));
      return [...state, { id: action.id, quantity: qty }];
    }
    case 'INCREMENT':
      return state.map((i) => (i.id === action.id ? { ...i, quantity: clamp(i.quantity + 1) } : i));
    case 'DECREMENT': // never below 1; use REMOVE to delete
      return state.map((i) => (i.id === action.id ? { ...i, quantity: clamp(i.quantity - 1) } : i));
    case 'SET_QTY':
      return state.map((i) => (i.id === action.id ? { ...i, quantity: clamp(action.quantity) } : i));
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return sanitizeCart(action.items);
    default:
      return state;
  }
};

export const deriveLines = (items) =>
  items
    .map((i) => {
      const p = getProductById(i.id);
      return p ? { ...p, productId: p.id, quantity: i.quantity, lineTotal: p.price * i.quantity } : null;
    })
    .filter(Boolean);

export const cartCount = (items) => items.reduce((n, i) => n + i.quantity, 0);
export const cartSubtotal = (items) => deriveLines(items).reduce((s, l) => s + l.lineTotal, 0);
