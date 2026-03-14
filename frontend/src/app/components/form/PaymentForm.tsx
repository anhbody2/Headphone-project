import React, { useState, useEffect } from "react";
import { Input, Checkbox } from "../../components/ui/input";
import { sendPayment } from "../../../api/payment";
import { Button } from "../../components/ui/button";
import { getCart } from "../../../api/cart.api";
import { createOrder } from "../../../api/order.api"
import { useAuth } from '../../../hook/authContext';
import { CartService } from "../../pages/CartPage/CartServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
type PaymentMethod = "paypal" | "card" | "gpay";

export default function PaymentForm({ onOrderSuccess }: { onOrderSuccess?: () => void }) {
    const [method, setMethod] = useState<PaymentMethod>("card");
    const [items, setItems] = useState<any>({ items: [], total: 0.0 });
    const { user, authReady } = useAuth();
    const navigator = useNavigate();
    // Fetch items on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await getCart();
                console.log("Items loaded from cart:", cartData); // Debug log
                setItems(cartData);
            } catch (err) {
                console.error("Failed to fetch cart:", err);
            }
        };
        loadCart();
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!authReady || !user) {
            toast.error("Your are not log in. Redirect...");
            navigator("/login");
            return;
        }
        const form = e.currentTarget;
        const formData = new FormData(form);

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phonenumber") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const apartment = formData.get("apartment") as string;
        const city = formData.get("city") as string;
        const postal = formData.get("postal") as string;

        const fullAddress = [
            address,
            apartment,
            city,
            postal,
            country,
        ]
            .filter(Boolean)
            .join(", ");

        const fullName = `${firstName} ${lastName}`.trim();

        const paymentData = {
            email: email,
            user_name: fullName,
            phone: phone,
            address: fullAddress,
        };
        localStorage.setItem("paymentform", JSON.stringify(paymentData));
        const orderItems = items?.items || (Array.isArray(items) ? items : []);
        const orderTotal = items?.total || 0;

        if (orderItems.length === 0) {
            toast.error("Your Cart Is Emty.");  
            return;
        }
        // 2. This is the final object sent to createOrder
        const finalOrderPayload = {
            user_id: user.id,
            items: orderItems,
            total: orderTotal
        };
        try {
            console.log(finalOrderPayload);
            await createOrder(finalOrderPayload);
            await sendPayment(paymentData);
            const res = await CartService.clear(user);
            console.log("Response from Clear:", res);
            window.dispatchEvent(new Event("cartUpdated"));
            setItems({
                items: [],
                total: 0.0
            });
            if (onOrderSuccess) {
                onOrderSuccess();
            }
            form.reset();
            setMethod("card");
            console.log(paymentData);

        } catch (error) {
            console.error("Payment failed:", error);
        }
    };




    const methodStyle = (type: PaymentMethod) =>
        `px-6 py-2 rounded-full text-xs font-semibold transition
        ${method === type
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* PAY BY */}
            <section>
                <h2 className="text-sm tracking-widest font-semibold text-center mb-4">
                    PAY BY
                </h2>

                <div className="flex justify-center gap-4 mb-4">
                    <Button
                        type="button"
                        onClick={() => setMethod("paypal")}
                        className={methodStyle("paypal")}
                    >
                        PAYPAL
                    </Button>

                    <Button
                        type="button"
                        variant="orange" rounded="full" className="w-32"
                        onClick={() => setMethod("card")}
                    >
                        VISA/MC
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setMethod("gpay")}
                        className={methodStyle("gpay")}
                    >
                        GPAY
                    </Button>
                </div>

                <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <div className="flex-1 h-px bg-gray-300" />
                    OR
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
            </section>

            {/* CONTACT */}
            <section className="space-y-4">
                <h3 className="text-sm tracking-widest font-semibold">CONTACT</h3>
                <Input name="email" type="email" placeholder="Email address" />
            </section>

            {/* DELIVERY */}
            <section className="space-y-4">
                <h3 className="text-sm tracking-widest font-semibold">DELIVERY</h3>

                <Input name="country" placeholder="Country" />

                <div className="grid grid-cols-2 gap-4">
                    <Input name="firstName" placeholder="First Name" />
                    <Input name="lastName" placeholder="Last Name" />
                </div>

                <Input name="address" placeholder="Address" />
                <Input name="apartment" placeholder="Apartment, suite, etc." />

                <div className="grid grid-cols-2 gap-4">
                    <Input name="city" placeholder="City" />
                    <Input name="postal" placeholder="Postal Code" />
                </div>
            </section>

            {/* PAYMENT (only show if card selected) */}
            {method === "card" && (
                <section className="space-y-4">
                    <h3 className="text-sm tracking-widest font-semibold">PAYMENT</h3>

                    <Input name="cardNumber" placeholder="Card Number" />

                    <div className="grid grid-cols-2 gap-4">
                        <Input name="expiry" placeholder="MM/YY" />
                        <Input name="cvc" placeholder="CVC" />
                    </div>

                    <Input name="cardName" placeholder="Name on Card" />
                </section>
            )}
            {/* REMEMBER ACCOUNT */}
            <section className="space-y-4">
                <Checkbox name="remember" placeholder="Remember my account" />
                <Input
                    name="phonenumber"
                    type="tel"
                    placeholder="Phone number"
                />
                <Input
                    name="firstname"
                    type="text"
                    placeholder="First name"
                />
            </section>

            {/* SUBMIT */}
            <Button variant="orange" rounded="full" className="w-full"
                type="submit"
            >
                PAY
            </Button>
        </form>
    );
}
