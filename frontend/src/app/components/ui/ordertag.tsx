import { useState } from 'react';
import { type LucideIcon, Package, CheckCircle, Clock, XCircle, Truck, RotateCcw } from "lucide-react";
export type OrderItem = {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    sku: {
        name: string;
    };
};

export type Order = {
    id: number;
    status: OrderStatus;
    total_price: number;
    created_at: string;
    items: OrderItem[]; // Added items
};
export type OrderStatus = "pending" | "confirmed" | "shipping" | "completed" | "cancelled" | "refunded";

// Define the prop type to include the click handler
interface OrderTagProps {
    order: Order;
    onClick?: (status: OrderStatus) => void;
}
const USER_STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
    // User can cancel if the admin hasn't processed it yet
    pending: ["cancelled"],
    // Usually, "confirmed" by admin means they accepted it. 
    // If you want the USER to "Confirm Receipt" once it's shipping:
    shipping: ["completed"],
    // User can request a refund only after completion
    completed: ["refunded"],
    // Terminal states
    confirmed: [],
    cancelled: [],
    refunded: [],
};


function OrderTag({ order, onClick }: OrderTagProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statusConfig: Record<OrderStatus, { color: string; icon: LucideIcon; label: string }> = {
        pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock, label: "Pending" },
        confirmed: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle, label: "Confirmed" },
        shipping: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Truck, label: "Shipping" },
        completed: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle, label: "Completed" },
        cancelled: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle, label: "Cancelled" },
        refunded: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: RotateCcw, label: "Refunded" },
    };

    const { color, icon: Icon, label } = statusConfig[order.status] || statusConfig.pending;

    // Get the next possible action for the user
    const nextActions = USER_STATUS_FLOW[order.status] || [];
    const hasAction = nextActions.length > 0;

    return (
        <div className="flex flex-col border rounded-lg w-full max-w-md bg-white overflow-hidden transition-all shadow-sm hover:shadow-md">
            <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${color.split(' ')[0]} bg-opacity-50`}>
                        <Package className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <div>
                        <p className="font-semibold text-gray-900 leading-none mb-1">Order #{order.id}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-gray-900">
                        ${order.total_price.toLocaleString()}
                    </span>
                    {/* Visual Badge Only */}
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${color}`}>
                        <Icon className="w-3 h-3" />
                        {label}
                    </div>
                </div>
            </div>

            {/* User Action Buttons (Step-by-Step) */}
            {hasAction && (
                <div className="px-4 pb-4 flex gap-2">
                    {nextActions.map((nextStatus) => (
                        <button
                            key={nextStatus}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to change status to ${nextStatus}?`)) {
                                    onClick?.(nextStatus);
                                }
                            }}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors shadow-sm
                                ${nextStatus === 'cancelled' ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' :
                                    nextStatus === 'completed' ? 'bg-green-600 text-white hover:bg-green-700' :
                                        'bg-gray-800 text-white hover:bg-gray-900'}
                            `}
                        >
                            {nextStatus === 'cancelled' && "Cancel Order"}
                            {nextStatus === 'completed' && "Confirm Receipt"}
                            {nextStatus === 'refunded' && "Request Refund"}
                        </button>
                    ))}
                </div>
            )}

            {/* Expanded Section: Product Details */}
            {isExpanded && (
                <div className="bg-gray-50 border-t p-4 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items</p>
                    <ul className="space-y-2">
                        {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <div className="text-gray-700">
                                    <span className="font-medium">{item.quantity}x</span> {item.sku.name}
                                </div>
                                <span className="text-gray-500">${(item.price * item.quantity).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-semibold">
                        <span>Total Price</span>
                        <span>${order.total_price.toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export { OrderTag };