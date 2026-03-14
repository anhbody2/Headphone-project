import React, { useEffect, useState } from "react";
import PaymentForm from "../components/form/PaymentForm";
import { bootstrapCart } from "../../localStorage/cart.bootstrap";
import { getMe } from "../../api/user-profile";
import { type CartItem } from "../../api/cart.api";

export default function PaymentPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const handleClearUI = () => {
    setItems([]);
    setTotal(0);
  };
  useEffect(() => {
    async function loadOrderDetails() {
      try {
        const token = localStorage.getItem("token");
        let user = null;
        if (token) {
          user = await getMe().catch(() => null);
        }
        if (user) {
          localStorage.removeItem("cart");
          localStorage.removeItem("cart.items");
        }
        const res = await bootstrapCart(user);
        setItems(res.items);
        setTotal(res.total);
      } catch (error) {
        console.error("Failed to load cart", error);
      } finally {
        setLoading(false);
      }
    }

    loadOrderDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT SECTION (Order Summary) */}
        <div className="hidden lg:block bg-gray-50 p-10 border-r border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {loading ? (
            <p>Loading items...</p>
          ) : items.length > 0 ? (
            <div className="p-6">
              <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3">
                    <div className="flex gap-6 items-center">
                      <div className="relative">
                        <img
                          src={item.image ?? "/placeholder.png"}
                          className="w-16 h-16 object-cover rounded-md border"
                          alt={item.name}
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.variant}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-sm">
                      ${Number(item.subtotal ?? 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* RIGHT SECTION (Form) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 lg:hidden">Payment Details</h2>
          <PaymentForm onOrderSuccess={handleClearUI} />
        </div>
      </div>
    </div>
  );
}