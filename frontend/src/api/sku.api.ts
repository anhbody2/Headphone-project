import api from "./axios";

export async function getSkus() {
    const res = await api.get("/skus");
    console.log(res.data);
    return res.data;
}
export async function getSku(id: string) {
    const res = await api.get(`/skus/${id}`);
    console.log(res.data);
    return res.data;
}
export const createSku = (data: {
    name: string;
    price: number;
    stock: number;
    product_id: number;
    img?: string[];
}) => api.post("/skus", data);

export const updateSku = (id: number, data: {
    name: string;
    price: number;
    stock: number;
    product_id: number;
    img?: string[];
}) =>
    api.put(`/skus/${id}`, data);

export const deleteSku = (id: number) =>
    api.delete(`/skus/${id}`);