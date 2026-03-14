import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useEffect, useState, useCallback, useMemo } from "react"; // Added useMemo
import { OrderTag, type OrderStatus } from "../components/ui/ordertag"; // Import type
import { Button } from "../components/ui/button";
import { useAuth } from "../../hook/authContext";
import { updateOrderStatus } from "../../api/order.api";
import { toast } from "react-hot-toast";
export function UserProfilePage() {
    const { user, logout, setUser } = useAuth();
    const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);

    const allItems = user?.data?.orders.map((order: any) => order.items);
    console.log(allItems);

    const filteredOrders = useMemo(() => {
        const allOrders = user?.data?.orders || [];
        if (!statusFilter) return allOrders;
        return allOrders.filter((order: any) => order.status === statusFilter);
    }, [user, statusFilter]);
    const handleActionUpdate = async (orderId: number, nextStatus: OrderStatus) => {
        try {
            // 2. Call the real API
            await updateOrderStatus(orderId, nextStatus);
            
            // 3. Update the local AuthContext state
            setUser((prevUser: any) => {
                if (!prevUser) return prevUser;
                
                // Map through the orders and update the specific one
                const updatedOrders = prevUser.data.orders.map((order: any) =>
                    order.id === orderId ? { ...order, status: nextStatus } : order
                );

                return {
                    ...prevUser,
                    data: {
                        ...prevUser.data,
                        orders: updatedOrders
                    }
                };
            });

            toast.success(`Order #${orderId} updated to ${nextStatus}`);
        } catch (error) {
            toast.error("Failed to update order status");
            console.error(error);
        }
    };
    if (!user) return (
        <div className="h-screen flex items-center justify-center font-pixels">
            <p className="animate-pulse">Loading Profile...</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-24">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-6">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop" />
                        <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>

                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={logout}
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-500 transition-all"
                >
                    Logout
                </Button>
            </div>

            {/* Orders Section */}
            <div className="max-w-2xl">
                <div className="max-w-2xl">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">My Orders</h2>
                        {statusFilter && (
                            <p className="text-sm text-gray-500">
                                Showing <b>{statusFilter}</b> orders
                            </p>
                        )}
                    </div>
                    {statusFilter && (
                        <button onClick={() => setStatusFilter(null)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                            Show all orders
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order: any) => (
                            <OrderTag
                                key={order.id}
                                order={order}
                                onClick={(nextStatus) => handleActionUpdate(order.id, nextStatus)}
                            />
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed rounded-xl">
                            <p className="text-gray-400">No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}