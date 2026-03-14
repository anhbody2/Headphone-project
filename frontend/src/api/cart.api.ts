import { clearGuestCart, getGuestCart, saveGuestCart } from '../localStorage/guessCart';
import api from './axios';

export type CartItem = {
  id: number;
  sku_id: number;
  name: string;
  variant?: string;
  price: number | string;
  quantity: number;
  subtotal: number;
  image?: string | null;
};

export type CartResponse = {
  items: CartItem[];
  total: number;
};

export const getCart = async () => {
  const res = await api.get("/cart");
  saveGuestCart(res.data);
  return res.data;
};

export const updateCartQty = async (
  id: number,
  quantity: number
) => {
  const res = await api.patch(`/cart/item/${id}`, { quantity });
  return res.data;
};

export const removeCartItem = async (
  id: number
) => {
  const res = await api.delete(`/cart/item/${id}`);
  return res.data;
};
export const mergeGuestCart = async () => {
  const guestCart = getGuestCart();

  if (!guestCart.items.length) return;

  await api.post("/cart/merge", {
    items: guestCart.items.map(i => ({
      sku_id: i.sku_id,
      quantity: i.quantity,
    })),
  });

  clearGuestCart();
};  
export const clearCart = async () => {
    const res = await api.delete("/cart/clear");
    return res.data;
    
}