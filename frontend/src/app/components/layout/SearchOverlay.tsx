import { Search, X } from 'lucide-react';
import { useSearch } from '../layout/Search'; // Adjust path
import { ProductCard } from '../ecommerce/ProductCard';
export function SearchOverlay() {
  const { isOpen, close, query, setQuery, loading, product, fetchProduct } = useSearch();

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {

      fetchProduct(query);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center pt-24 animate-in fade-in duration-300">
      <button
        onClick={close}
        className="absolute top-6 right-10 p-2 hover:bg-gray-100 rounded-full"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full px-6">
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl flex justify-self-center">
          <input
            autoFocus
            type="text"
            placeholder="Search by name..."
            className="w-full text-4xl border-b-2 border-black outline-none pb-4 pr-12 font-serif"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-2">
            <Search className="w-8 h-8" />
          </button>
        </form>

        <div className="mt-12 justify-items-center ">
          {loading && <p className="text-gray-500 italic">Searching...</p>}

          {product && Array.isArray(product) && <div className="max-w-7xl flex w-max">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.map((item: any) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          }
          {product && !Array.isArray(product) && (
              <ProductCard product={product} />
            )
          }
        </div>
      </div>
    </div>
  );
}