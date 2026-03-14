import { createContext, useContext, useState } from 'react';
// Import your API function (renamed locally to avoid conflict)
import { getSku } from '../../../api/sku.api';

interface Product {
  id: number;
  name: string;
  price: number;
  skus: any[];
}

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  product: Product | null;
  loading: boolean;
  fetchProduct: (id: string ) => Promise<void>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Define the function that components will actually call
  const fetchProduct = async (keyword: string) => {
    if (!keyword) return;
    
    setLoading(true);
    try {
      const response = await getSku(keyword);
      
      setProduct(response.data); 
    } catch (error) {
      console.error("Search failed:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isOpen,
        open: () => setIsOpen(true),
        close: () => {
            setIsOpen(false);
            setQuery(''); // Clear search on close
            setProduct(null); // Clear results on close
        },
        product,
        loading,
        fetchProduct // Use this name in the value
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
  return ctx;
}