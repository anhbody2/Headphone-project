import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// Assuming these exist in your api file
import {
    getOrderList,
    updateOrderStatus,
    deleteOrder
} from "../../api/order.api";
export const STATUS_FLOW: Record<Order['status'], Order['status'][]> = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["shipping", "cancelled"],
    shipping: ["completed", "cancelled"],
    completed: ["refunded"],
    cancelled: ["completed"],
    refunded: ["completed"],
};

// Helper for styling
export const STATUS_STYLES: Record<Order['status'], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipping: "bg-indigo-100 text-indigo-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700",
};
export interface Order {
    id: number;
    // customer_name: string;
    total_price: number;
    status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled" | "refunded";
    user: {
        user_name: string;
        email: string;
    };
    created_at: string;
    items_count: number;
    payment: {
        phone_number?: string;
        address?: string;
    };
    notes?: string;
    items?: Array<{
        id: number;
        sku: {
            img: string;
            name: string;
        };
        quantity: number;
        price: number;
    }>;
}

export function AdminOrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 8;
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // New State

    const handleRowClick = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrderList();
            if (Array.isArray(res)) {
                setOrders(res);
            } else {
                setOrders([]);
            }
        } catch (error) {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    // 1. Filter the orders based on search term
    const filteredOrders = orders.filter((order) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            order.status.toLowerCase().includes(searchLower) ||
            order.user.user_name.toLowerCase().includes(searchLower) ||
            order.id.toString().includes(searchLower) // Added ID search
        );
    });

    // 2. Calculate pagination based on the FILTERED list
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;

    // 3. Slice the filtered list for the current page
    const paginatedOrders = filteredOrders.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleStatusUpdate = async (id: number, newStatus: Order['status']) => {
        try {
            await updateOrderStatus(id, newStatus);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
            toast.success(`Order #${id} updated`);
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Prevents opening the modal
        if (!confirm("Delete this order?")) return;
        try {
            await deleteOrder(id);
            setOrders(prev => prev.filter(o => o.id !== id));
            toast.success("Order deleted");
        } catch (error) {
            toast.error("Error deleting order");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Admin – Order Management
                    </h1>
                    <button
                        onClick={fetchOrders}
                        className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
                    >
                        Refresh List
                    </button>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by SKU name or Product ID..."
                            className="w-full border p-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1); // Reset to first page on search
                            }}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>
                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <th className="border p-3 text-left">Order ID</th>
                                <th className="border p-3 text-left">Customer</th>
                                <th className="border p-3 text-left">Date</th>
                                <th className="border p-3 text-right">Total</th>
                                <th className="border p-3 text-center">Status</th>
                                <th className="border p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center">Loading orders...</td>
                                </tr>
                            ) : paginatedOrders.length > 0 ? (
                                paginatedOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition cursor-pointer"
                                        onClick={() => handleRowClick(order)}
                                    >
                                        <td className="border p-3 text-sm font-mono">#{order.id}</td>
                                        <td className="border p-3 font-medium">{order.user.user_name}</td>
                                        <td className="border p-3 text-sm">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="border p-3 text-right font-semibold">
                                            ${order.total_price}
                                        </td>
                                        <td className="border p-3 text-center ">
                                            <select
                                                value={order.status}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                                                className={` text-center text-xs font-semibold rounded-full px-3 py-1 border-none cursor-pointer transition-colors ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {/* Always show current status */}
                                                <option value={order.status}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </option>

                                                {/* Map only allowed next steps */}
                                                {STATUS_FLOW[order.status].map((nextStep) => (
                                                    <option key={nextStep} value={nextStep} className="bg-white text-gray-800">
                                                        → Move to {nextStep.charAt(0).toUpperCase() + nextStep.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border p-3 text-center space-x-3">
                                            <button
                                                onClick={(e) => handleDelete(e, order.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* This runs only if NOT loading AND length is 0 */
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-gray-500">
                                        No orders found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-xl font-bold">Order Details</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Top Row: Quick Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b">
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Order ID</p>
                                        <p className="text-sm font-mono font-bold">#{selectedOrder.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Status</p>
                                        <span className="text-sm capitalize px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Date</p>
                                        <p className="text-sm">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Total Price</p>
                                        <p className="text-sm font-bold text-green-600">${selectedOrder.total_price}</p>
                                    </div>
                                </div>

                                {/* Middle Section: Customer & Shipping */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Information */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs uppercase text-gray-800 font-bold tracking-wider">Customer Info</h4>
                                        <div className="text-sm space-y-1">
                                            <p className="font-semibold text-gray-800">{selectedOrder.user.user_name}</p>
                                            <p className="text-gray-600">{selectedOrder.user.email}</p>
                                            <p className="text-gray-600">{selectedOrder.payment.phone_number || 'No phone provided'}</p>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs uppercase text-gray-800 font-bold tracking-wider">Shipping Address</h4>
                                        <div className="text-sm text-gray-600 leading-relaxed">
                                            {selectedOrder.payment.address ? (
                                                <>
                                                    <p>{selectedOrder.payment.address}</p>

                                                </>
                                            ) : (
                                                <p className="italic text-gray-400">No address provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom: Internal Notes */}
                                <div className="pt-4 border-t mt-4">
                                    <p className="text-[10px] uppercase text-gray-400 font-bold mb-2">Order Items</p>

                                    <div className="space-y-3">
                                        {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                            selectedOrder.items.map((item, index) => (
                                                <div
                                                    key={item.id || index}
                                                    className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {/* Optional: item Image */}
                                                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                                                            <img src={`${item.sku.img}`} alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">{item.sku.name}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">No products found in this order.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-500">
                        Total: {orders.length} orders
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-30"
                        >
                            Previous
                        </button>
                        <span className="font-medium text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-30"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}