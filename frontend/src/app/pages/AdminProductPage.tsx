import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../api/product.api";

export interface Product {
    id: number;
    name: string;
    description: string;
    category_id: number;
    active: boolean;
}

interface ProductForm {
    name?: string;
    description?: string;
    category_id?: number;
    active?: boolean;
}

export function AdminProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState<ProductForm>({ active: true });
    const [editingId, setEditingId] = useState<number | null>(null);
    const ITEMS_PER_PAGE = 5;
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        const res = await getProducts();
        console.log(res);
        setProducts(res);
        
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const buildPayload = () => ({   
        name: form.name!,
        description: form.description || "",
    });

    const handleCreate = async () => {
        try {
            await createProduct(buildPayload());
            setForm({ active: true });
            toast.success("Product created successfully");
            fetchProducts();
        } catch (error) {
            toast.error("Error creating product");
        }
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        if (!confirm("Update this product?")) return; 

        try {
            await updateProduct(editingId, buildPayload());
            setForm({ active: true });
            setEditingId(null);
            toast.success("Product updated successfully");
            fetchProducts();
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleEdit = (product: Product) => {
        setForm({ ...product });
        setEditingId(product.id);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure? This may affect linked SKUs.")) return;
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts();
    };

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
    const paginatedProducts = products.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Admin – Product Management
                </h1>

                {/* Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <input
                        className="border p-2 rounded col-span-1 md:col-span-2"
                        placeholder="Product Name"
                        value={form.name || ""}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Product Option"
                        type="number"
                        value={form.category_id || ""}
                        onChange={(e) => setForm({ ...form, category_id: +e.target.value })}
                    />
                    <select 
                        className="border p-2 rounded bg-white"
                        value={form.active ? "true" : "false"}
                        onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <textarea
                        className="border p-2 rounded col-span-1 md:col-span-4"
                        placeholder="Product Description"
                        rows={2}
                        value={form.description || ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </div>

                <div className="text-center mb-8 space-x-3">
                    <button
                        onClick={handleCreate}
                        disabled={editingId !== null}
                        className={`px-8 py-2 rounded text-white font-medium transition
                            ${editingId ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}
                        `}
                    >
                        Create Product
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={editingId === null}
                        className={`px-8 py-2 rounded text-white font-medium transition
                            ${!editingId ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
                        `}
                    >
                        Update Product
                    </button>
                    
                    {editingId && (
                        <button 
                            onClick={() => { setEditingId(null); setForm({ active: true }); }}
                            className="text-gray-500 underline text-sm"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <th className="border p-3 text-left">ID</th>
                                <th className="border p-3 text-left">Product Name</th>
                                <th className="border p-3 text-left">Product Options</th>
                                <th className="border p-3 text-center">Status</th>
                                <th className="border p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedProducts.map((prod) => (
                                <tr key={prod.id} className="hover:bg-gray-50 transition">
                                    <td className="border p-3 text-sm">{prod.id}</td>
                                    <td className="border p-3 font-medium">{prod.name}</td>
                                    <td className="border p-3 text-sm"> {prod.category_id}</td>
                                    <td className="border p-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${prod.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {prod.active ? "Active" : "Hidden"}
                                        </span>
                                    </td>
                                    <td className="border p-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(prod)}
                                            className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prod.id)}
                                            className="text-red-600 hover:text-red-900 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-500">
                        Showing {paginatedProducts.length} of {products.length} products
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-30"
                        >
                            Previous
                        </button>
                        <span className="font-medium">
                            {page} / {totalPages}
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