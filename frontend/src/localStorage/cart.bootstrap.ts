import api from "../api/axios";
import { getGuestCart, clearGuestCart } from "../localStorage/guessCart";

export const bootstrapCart = async (user: any) => {
  const guestCart = getGuestCart();
  
  // 1. Get the cart that we already fetched inside the getMe() call
  // Adjust the path based on your API response structure (e.g., user.cart or user.data.cart)
  const userCartFromApi = user?.cart || user?.data?.cart;
  console.log(userCartFromApi);
  if (!user) return guestCart;

  // 2. If guest cart is empty, don't call the API again! 
  // Use the data we already have from the login/me call.
  if (!guestCart.items || guestCart.items.length === 0) {
    return userCartFromApi || { items: [] };
  }

  // 3. If there are items to merge, do it once.
  try {
    // Send the merge request
    const response = await api.post("/cart/merge", {
      items: guestCart.items.map((i: any) => ({
        sku_id: i.sku_id,
        quantity: i.quantity,
      })),
    });

    clearGuestCart();
    
    // Return the merged cart from the POST response 
    // (Ensure your Backend's /cart/merge returns the full updated cart)
    return response.data; 
  } catch (error) {
    console.error("Merge failed", error);
    return userCartFromApi || { items: [] };
  }
};