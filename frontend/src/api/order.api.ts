import api from "./axios";
import toast from "react-hot-toast";
export const createOrder = async (data: any) => {
    const res = await api.post("/orders", data);
    toast.success("Order processed successfully");
    return res.data;
}

export async function getOrderList() {
    const res = await api.get("/orders");
    console.log(res);
    return res.data;
}
export const updateOrderStatus = async (id: number | string, status: string) => {
    const res = await api.patch(`/orders/${id}/status`, { status });
    return res.data;
}
export const deleteOrder = (id: number) =>
    api.delete(`/orders/${id}`);