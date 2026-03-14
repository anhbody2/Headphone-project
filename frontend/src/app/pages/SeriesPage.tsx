import { useEffect, useState } from "react";
import { getSkus } from "../../api/sku.api";
import { ProductCard } from "../components/ecommerce/ProductCard";
import RandomizeText from "../components/effect/randomizetext";

export function SeriesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getSkus();
        const data = response.data.data ?? response.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of grid when page changes
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-pixels">
        <p className="animate-pulse">Loading Collection...</p>
      </div>
    );
  }

  return (
    <div className="font-pixels bg-white min-h-screen">
      {/* --- Entry Banner --- */}
      <section className="relative h-[40vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/p3.png" 
            alt="Banner" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-2">
            The Collection
          </h1>
          <div className="h-6">
            <RandomizeText text="Precision engineering for the modern audiophile." />
          </div>
        </div>
      </section>

      {/* --- Product Grid --- */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-10">
          <h2 className="text-xl font-bold uppercase tracking-widest">
            All Products <span className="text-gray-400 ml-2">[{products.length}]</span>
          </h2>
          <p className="text-xs text-gray-500 uppercase">Page {currentPage} of {totalPages}</p>
        </div>

        {currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {currentItems.map((item) => (
                <div key={item.id} className="transition-transform duration-300 hover:-translate-y-2">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>

            {/* --- Pagination Controls --- */}
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
              >
                PREV
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 border ${currentPage === i + 1 ? 'bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
              >
                NEXT
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 italic">No products currently in stock.</p>
          </div>
        )}
      </main>

      <footer className="py-10 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 tracking-[0.5em] uppercase">
          Sony © 2026 - Elevated Sound
        </p>
      </footer>
    </div>
  );
}