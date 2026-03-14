import { getCart, updateCartQty, removeCartItem, type CartItem, clearCart } from "../../../api/cart.api";
import { getGuestCart, updateGuestQty, deleteGuestCart, clearGuestCart } from "../../../localStorage/guessCart";

export const CartService = {
  async get(user: any) {
    if (user) return await getCart();
    return getGuestCart();
  },

  async updateQty(user: any, item: CartItem, delta: number) {
    if(user) updateCartQty(item.sku_id, delta);
    return updateGuestQty(user, item.sku_id, delta);
  },

  async remove(user: any, item: CartItem) {
    if (user) {
      return await removeCartItem(item.id!)
        .then(res => res.data);
    }
    deleteGuestCart(user, item.sku_id);
    return getGuestCart();
  },
  async clear(user: any) {
    if (user) {
      return await clearCart()
    }
    clearGuestCart();
    return { items: [], total: 0 };
  }
};
