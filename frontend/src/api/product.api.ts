import api from "./axios";

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}
export async function getProductById(id: number | string) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}
export const createProduct = (data: {
  name: string;
  description:string;
}) => api.post("/products", data);

export const updateProduct = (id: number, data: {
    name: string;
    description: string;
    // price: number;
    // stock: number;
    // product_id: number;
    // img?: string[];
}) =>
    api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) =>
    api.delete(`/products/${id}`);