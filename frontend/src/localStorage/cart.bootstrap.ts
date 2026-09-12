import api from "../api/axios";
import { getGuestCart, clearGuestCart } from "../localStorage/guessCart";

export const bootstrapCart = async (user: any) => {
  const guestCart = getGuestCart();

  const userCartFromApi = user?.cart || user?.data?.cart;
  console.log(userCartFromApi);
  if (!user) return Array.isArray(guestCart) ? guestCart : [];

  if (!guestCart.items || guestCart.items.length === 0) {
    return userCartFromApi;
  }

  try {

    const response = await api.post("/cart/merge", {
      items: guestCart.items.map((i: any) => ({
        sku_id: i.sku_id,
        quantity: i.quantity,
      })),
    });

    clearGuestCart();
    return response.data?.items|| []; 
  } catch (error) {
    console.error("Merge failed", error);
    return userCartFromApi || { items: [] };
  }
};