import { RecommendedProducts } from "./Rcproducts";
import { ProductDetails, ProductGallery } from "./ProductSectionDetails";
import { useEffect, useState } from "react";
import { getProducts } from "../../../api/product.api";
import { useParams } from "react-router-dom";
export default function ProductPage() {
  const [product, setProduct] = useState<any>(null);
  const [selectedSku, setSelectedSku] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    async function load() {
      try {
        const products = await getProducts();
        const targetProduct = products.find((p: any) => p.id.toString() === productId);
        setProduct(targetProduct);
        setSelectedSku(targetProduct.skus[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="h-screen text-center mt-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">No product found</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6">
      <section className="grid grid-cols-12 gap-12">
        <ProductDetails
          image={selectedSku.image}
          product={product}
          selectedSku={selectedSku}
          setSelectedSku={setSelectedSku}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <ProductGallery skus={product.skus} />
      </section>

      <RecommendedProducts />
    </main>
  );
}

