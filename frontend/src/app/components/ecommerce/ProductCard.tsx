
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
export type Props = {
  product: any;
};

export function ProductCard({ product }: Props) {
  const firstImage = product.img?.[0];

  const hasPromotion = product.promotion && product.promotion !== "0.00";

  const originalPrice = parseFloat(product.price);
  const discountPercentage = parseFloat(product.promotion);
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <a
      href={`/product/${product.product_id}`}
      className="relative border rounded-md p-4 block hover:shadow-lg transition-shadow duration-300"
    >
      {/* SALE BADGE */}
      {hasPromotion && (
        <span className="absolute top-2 left-2 z-10 bg-orange-600 text-white text-[12px] font-bold px-2 py-[2px] rounded">
          -{product.promotion}%
        </span>
      )}

      {firstImage && (
        <img
          src={firstImage}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-base font-medium mb-1 truncate">
        {product.name}
      </h3>

      <div className="flex items-center gap-2">
        {hasPromotion ? (
          <>
            {/* New Discounted Price */}
            <p className="text-lg font-bold text-orange-600">
              ${discountedPrice.toFixed(2)}
            </p>
            {/* Old Original Price */}
            <p className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </p>
          </>
        ) : (
          /* Normal Price if no sale */
          <p className="text-lg font-bold">
            ${originalPrice.toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex justify-left mt-8">
        <Link to={`/product/${product.product_id}`}>
          <Button variant="orange" className="px-6 py-3 text-white rounded-full" >
            See More
          </Button>
        </Link>
      </div>
    </a>
  );
}