import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ecommerce/ProductCard";
import { getSkus } from "../../../api/sku.api";
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
export function RecommendedProducts() {
    const [product, setProduct] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const products = await getSkus();
                setProduct(products.data.data ?? products.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);
    return (
        <section className="mt-32">
            <h2 className="text-xl font-semibold mb-8">
                Recommended Products
            </h2>

            <div className="max-w-7xl mx-auto my-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.slice(0, 4).map((item: any) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/series">
                  <Button variant= "orange" className="px-6 py-3 text-white rounded-full" >
                    See More
                  </Button>
                </Link>
              </div>
            </div>
        </section>
    );
}
