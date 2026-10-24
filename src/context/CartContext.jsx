import { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react';
import { cartReducer, sanitizeCart, deriveLines, cartCount, cartSubtotal, CART_KEY } from './cartReducer';
import { readJSON, writeJSON } from '../utils/storage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => sanitizeCart(readJSON(CART_KEY, [])));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { writeJSON(CART_KEY, items); }, [items]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) {
        try { dispatch({ type: 'HYDRATE', items: JSON.parse(e.newValue || '[]') }); }
        catch { dispatch({ type: 'HYDRATE', items: [] }); }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD', id: product.id, quantity });
    setToast(`${product.name} added to your cart`);
  }, []);

  const value = useMemo(() => ({
    items,
    lines: deriveLines(items),
    count: cartCount(items),
    subtotal: cartSubtotal(items),
    addItem,
    increment: (id) => dispatch({ type: 'INCREMENT', id }),
    decrement: (id) => dispatch({ type: 'DECREMENT', id }),
    setQuantity: (id, quantity) => dispatch({ type: 'SET_QTY', id, quantity }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    toast,
  }), [items, addItem, drawerOpen, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
