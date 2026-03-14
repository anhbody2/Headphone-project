import { useEffect, useState } from "react";
import {
  type CartItem
} from "../../../api/cart.api";
import { bootstrapCart } from "../../../localStorage/cart.bootstrap";
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { updateCartQty } from "../../../api/cart.api";
import { useAuth } from "../../../hook/authContext";
export function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState(false);
  const [selectedProduct, setProduct] = useState<any>();
  const { user } = useAuth();
  // Derived state: Calculate total on the fly to avoid desync bugs
  const total = items.reduce((acc, item) => acc + (Number(item.price || 0) * (item.quantity || 0)), 0);




  useEffect(() => {
    if (!user) return;

    const syncCart = async () => {
      setLoading(true);
      try {
        if (user) {
          localStorage.removeItem("cart");
          localStorage.removeItem("cart.items");
        }
        const res = await bootstrapCart(user);
        setItems(res || []);
      } finally {
        setLoading(false);
      }
    };

    syncCart();
  }, [authReady, user]);
  // 4. Auto-select first item when cart loads
  useEffect(() => {
    if (items.length > 0 && !selectedProduct) {
      setProduct(items[0]);
    } else if (items.length === 0) {
      setProduct(null);
    }
  }, [items]);


  const updateCart = async (newItems: CartItem[], targetSkuId?: number) => {
    // 1. Update UI immediately
    const previousItems = [...items];
    setItems(newItems);

    // 2. Update LocalStorage (Single Source of Truth)
    const cartData = {
      items: newItems,
      total: newItems.reduce((acc, i) => acc + (Number(i.price) * i.quantity), 0)
    };
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (user && targetSkuId) {
      const targetItem = newItems.find(i => i.sku_id === targetSkuId);
      console.log(targetItem);
      if (targetItem) {
        try {
          await updateCartQty(targetSkuId, targetItem.quantity);
        } catch (error: any) {
          if (error.response?.status === 422) {
            alert(error.response.data.message);
            setItems(previousItems);
            console.error("Backend sync failed.", error);
          }
        }
      }
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update changeQty to pass the sku_id
  const changeQty = (item: CartItem, delta: number) => {
    const updatedItems = items.map((i) => {
      if (i.sku_id === item.sku_id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty, subtotal: newQty * Number(i.price) };
      }
      return i;
    });

    updateCart(updatedItems, item.sku_id);
  };

  const removeItem = (item: CartItem) => {
    const updatedItems = items.filter((i) => i.sku_id !== item.sku_id);
    updateCart(updatedItems);
  };

  const clearAll = () => {
    if (window.confirm("Are you sure?")) {
      setItems([]);
      localStorage.removeItem("cart");
      localStorage.removeItem("cart.items");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  return (
    <div className="grid grid-cols-2 gap-8 p-10 my-10">

      {/* LEFT */}
      <div>
        {selectedProduct?.image ? (
          <img
            src={selectedProduct.image}
            className="w-72 mx-auto"
            alt=""
          />
        ) : (
          <div className="w-72 h-72 mx-auto bg-gray-100 rounded-lg" />
        )}

        {selectedProduct && (
          <div className="flex justify-center gap-4 mt-6">
            <button type="button"
              disabled={loading}
              onClick={() => changeQty(selectedProduct, -1)}
              className="px-4 py-2 rounded-full bg-gray-200"
            >
              -
            </button>

            <div className="px-6 py-2 bg-red-500 text-white rounded-full">
              {items.find(i => i.sku_id === selectedProduct.sku_id)?.quantity || 0}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => changeQty(selectedProduct, 1)}
              className="px-4 py-2 rounded-full bg-gray-200"
            >
              +
            </button>
          </div>
        )}

        <div className="mt-6 text-xl">
          TOTAL: <b>{Number(total ?? 0).toFixed(2)}$</b>
        </div>


        <Link
          to="/payment"

        >
          <Button
            disabled={!items?.length}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full disabled:opacity-50"
          >
            Checkout
          </Button>
        </Link>
        <Button
          variant="outline"
          disabled={!items?.length || loading}
          onClick={clearAll}
          className="px-6 py-3 border-gray-300 text-gray-600 rounded-full hover:bg-gray-100"
        >
          CLEAR ALL
        </Button>
      </div>

      {/* RIGHT */}
      <div className="space-y-6 ">
        {loading ? (
          <div className="text-gray-400 text-center animate-pulse">
            Loading your cart...
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.sku_id} className={`flex justify-between items-center p-3 rounded-xl transition-all cursor-pointer border-2 ${selectedProduct?.sku_id === item.sku_id
              ? "border-red-500 bg-red-50"
              : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => setProduct(item)}>
              <div className="flex gap-4 items-center">
                <img
                  src={item.image ?? "/placeholder.png"}
                  className="w-12"
                  alt={item.name}
                />
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.variant}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>x{item.quantity}</div>
                <div>{Number(item.subtotal ?? 0).toFixed(2)}$</div>
                <button
                  onClick={() => removeItem(item)}
                  className="hover:text-red-500 transition-colors"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center">
            Your cart is currently empty.
          </div>
        )}
      </div>
    </div>

  );
}
