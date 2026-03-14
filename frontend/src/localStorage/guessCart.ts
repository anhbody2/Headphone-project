import { type CartItem, type CartResponse } from "../api/cart.api";
const KEY = "cart";

/**
 * Helper to extract the items array regardless of storage format.
 * Your storage currently looks like: {"items": [...], "total": 0} 
 * OR sometimes just [...]
 */
const getItemsFromStorage = (raw: string | null): CartItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    // If it's the Object format { items: [], total: 0 }
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
      return parsed.items;
    }
    // If it's just the Array format [...]
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    console.error("Cart parse error", e);
  }
  return [];
};

export const getGuestCart = (user?: any): CartResponse => {
  const raw = localStorage.getItem(KEY);
  const items = getItemsFromStorage(raw);

  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) * (item.quantity ?? 0)),
    0
  );

  return {
    items,
    total: Number(total.toFixed(2)),
  };
};

export const saveGuestCart = (cartResponse: CartResponse, user?: any) => {
  // If user exists, we always save as Object structure
  localStorage.setItem(KEY, JSON.stringify(cartResponse));
  // Notify the UI to update
  window.dispatchEvent(new Event("cartUpdated"));
};

export const updateGuestQty = (user: any, skuId: number, delta: number) => {
  const currentCart = getGuestCart(user);
  const items = [...currentCart.items];

  const index = items.findIndex((i) => i.sku_id === skuId);
  if (index === -1) return currentCart;

  items[index].quantity += delta;

  if (items[index].quantity <= 0) {
    items.splice(index, 1);
  } else {
    items[index].subtotal = Number(items[index].price) * items[index].quantity;
  }

  const updatedCart: CartResponse = {
    items,
    total: items.reduce((sum, i) => sum + (i.subtotal ?? 0), 0)
  };

  saveGuestCart(updatedCart, user);
  return updatedCart;
};

export const deleteGuestCart = (user: any, skuId: number) => {
  const currentCart = getGuestCart(user);
  const updatedItems = currentCart.items.filter((i) => i.sku_id !== skuId);

  const updatedCart: CartResponse = {
    items: updatedItems,
    total: updatedItems.reduce((sum, i) => sum + (i.subtotal ?? 0), 0)
  };

  saveGuestCart(updatedCart, user);
  return updatedCart;
};

export const clearGuestCart = () => {
  return localStorage.removeItem(KEY);
};