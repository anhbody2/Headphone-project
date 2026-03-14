import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    getSkus,
    createSku,
    updateSku,
    deleteSku,
} from "../../api/sku.api";

export interface Sku {
    id: number;
    name: string;
    price: number;
    promotion?: number;
    stock: number;
    product_id: number;
    img?: string[];
}

interface SkuForm {
    name?: string;
    price?: number;
    promotion?: number;
    stock?: number;
    product_id?: number;
    img?: string;
}

export function AdminSkuPage() {
    const [skus, setSkus] = useState<Sku[]>([]);
    const [form, setForm] = useState<SkuForm>({});
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState(""); // New State
    const ITEMS_PER_PAGE = 5;
    const [page, setPage] = useState(1);

    const fetchSkus = async () => {
        const res = await getSkus();
        setSkus(res.data.data ?? res.data);
    };

    useEffect(() => {
        fetchSkus();
    }, []);

    // --- Search Logic ---
    const filteredSkus = skus.filter((sku) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            sku.name.toLowerCase().includes(searchLower) ||
            sku.product_id.toString().includes(searchLower)
        );
    });

    // Pagination based on filtered results
    const totalPages = Math.ceil(filteredSkus.length / ITEMS_PER_PAGE) || 1;
    const paginatedSkus = filteredSkus.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    // --- Rest of your handlers ---
    const buildPayload = () => ({
        name: form.name!,
        price: form.price!,
        promotion: form.promotion!,
        stock: form.stock!,
        product_id: form.product_id!,
        img: form.img ? [form.img] : undefined,
    });

    const handleCreate = async () => {
        await createSku(buildPayload());
        setForm({});
        toast.success("SKU created successfully");
        fetchSkus();
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        if (!confirm("Update this SKU?")) return;
        await updateSku(editingId, buildPayload());
        setForm({});
        toast.success("SKU updated successfully");
        setEditingId(null);
        fetchSkus();
    };

    const handleEdit = (sku: Sku) => {
        setForm({
            ...sku,
            img: sku.img && sku.img.length > 0 ? sku.img[0] : ''
        });
        setEditingId(sku.id);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this SKU?")) return;
        await deleteSku(id);
        toast.success("SKU deleted successfully");
        fetchSkus();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-[100px]">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Admin – SKU Management
                </h1>

                {/* Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    <input
                        className="border p-2 rounded"
                        placeholder="SKU Code"
                        value={form.name || ""}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Price"
                        type="number"
                        value={form.price || ""}
                        onChange={(e) => setForm({ ...form, price: +e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Stock"
                        type="number"
                        value={form.stock || ""}
                        onChange={(e) => setForm({ ...form, stock: +e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Product ID"
                        type="number"
                        value={form.product_id || ""}
                        onChange={(e) => setForm({ ...form, product_id: +e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Promotion"
                        type="number"
                        value={form.promotion || ""}
                        onChange={(e) => setForm({ ...form, promotion: +e.target.value })}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Image URL"
                        type="url"
                        value={form.img || ""}
                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                    />
                </div>

                <div className="text-center mb-10 space-x-3">
                    <button
                        onClick={handleCreate}
                        disabled={editingId !== null}
                        className={`px-6 py-2 rounded text-white ${editingId ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:opacity-80"}`}
                    >
                        Create SKU
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={editingId === null}
                        className={`px-6 py-2 rounded text-white ${!editingId ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:opacity-80"}`}
                    >
                        Update SKU
                    </button>
                </div>

                {/* Search Bar Section */}
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

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">SKU</th>
                                <th className="border p-2">Product</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Promotion</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSkus.length > 0 ? (
                                paginatedSkus.map((sku) => (
                                    <tr key={sku.id} className="text-center hover:bg-gray-50">
                                        <td className="border p-2 font-medium">{sku.name}</td>
                                        <td className="border p-2">{sku.product_id}</td>
                                        <td className="border p-2">${sku.price}</td>
                                        <td className="border p-2">{sku.promotion}%</td>
                                        <td className="border p-2">{sku.stock}</td>
                                        <td className="border p-2">
                                            {sku.img?.[0] ? (
                                                <img src={sku.img[0]} className="w-12 h-12 object-cover mx-auto rounded" />
                                            ) : (
                                                <span className="text-gray-400 italic">No Image</span>
                                            )}
                                        </td>
                                        <td className="border p-2 space-x-2">
                                            <button
                                                onClick={() => handleEdit(sku)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(sku.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center p-4 text-gray-500">
                                        No SKUs found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-1 border rounded shadow-sm disabled:opacity-30 hover:bg-gray-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages || totalPages === 0}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-1 border rounded shadow-sm disabled:opacity-30 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
