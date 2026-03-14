import { useQuery } from "react-query";
import { getProducts } from "../api/product.api";

export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  });
}
