import toast from "react-hot-toast";

export function ProductDetails({
  product,
  selectedSku,
  setSelectedSku,
  quantity,
  setQuantity,
}: any) {
  if (!product || !product.skus) return null;
  console.log("Full Product:", product);
  console.log("Selected SKU:", selectedSku);

  const discountPercentage = parseFloat(selectedSku?.promotion) || 0;
  const hasPromotion = discountPercentage > 0;
  const originalPrice = Number(selectedSku.price);

  // 2. Calculate the discounted price (After)
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  const handleSelectSku = (sku: any) => {
    setSelectedSku(sku);
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (quantity < selectedSku.stock) {
      setQuantity((q: number) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q: number) => q - 1);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.sku_id === selectedSku.id);

    // Use the discounted price if it exists, otherwise use original
    const finalPrice = hasPromotion ? discountedPrice : originalPrice;

    if (existing) {
      existing.quantity += quantity; // Fixed: Use the 'quantity' state instead of hardcoded 1
      existing.subtotal = existing.quantity * finalPrice;
    } else {
      cart.push({
        sku_id: selectedSku.id,
        name: product.name,
        product_id: product.id,
        price: finalPrice,
        image: selectedSku.img?.[0],
        quantity: quantity,
        subtotal: quantity * finalPrice,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!");
  };



  return (
    <aside className="col-span-4">
      <div className="sticky top-24 space-y-8">

        {/* PRODUCT */}
        <section>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            {hasPromotion ? (
              <>
                {/* NEW PRICE */}
                <span className="text-2xl font-bold text-orange-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                {/* OLD PRICE */}
                <span className="text-lg text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                {/* BADGE */}
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* OPTIONS */}
          <div className="flex gap-3 mt-4">
            {product.skus.map((sku: any) => {
              const img = sku.img?.[0];

              return (
                <button
                  key={sku.id}
                  onClick={() => handleSelectSku(sku)}
                  className={`relative border rounded-lg overflow-hidden transition
                    ${sku.id === selectedSku.id
                      ? "border-black ring-2 ring-black"
                      : "border-gray-200 hover:border-black"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={sku.name}
                    className="aspect-square object-cover"
                  />

                  {/* label */}
                  <span className="absolute bottom-1 left-1 text-xs bg-white/80 px-1 rounded">
                    {sku.name.split(" ").slice(-2).join(" ")}
                  </span>

                  {/* sold out */}
                  {sku.stock === 0 && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-medium">
                      SOLD
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
        {/* DESCRIPTION */}
        <section className="space-y-2">
          <p className="text-sm text-gray-600">{product.description}</p>
        </section>
        {/* QUANTITY */}
        <section className="space-y-4 flex gap-4 ">
          <div className="flex items-center gap-4 m-0">
            <button onClick={handleDecrease} className="w-10 h-10 border rounded-full">−</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease} className="w-10 h-10 border rounded-full">+</button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={selectedSku.stock === 0}
            className="w-full py-4 bg-orange-500 text-white rounded-full disabled:opacity-40"
          >
            {selectedSku.stock === 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </section>

        {/* DETAILS */}
        <section className="divide-y">
          {["Delivery & Return", "Quality Details", "Specifications"].map(t => (
            <details key={t} className="py-4">
              <summary className="cursor-pointer font-medium">{t}</summary>
              <p className="mt-2 text-sm text-gray-600">
                High-end Sony ANC headphones with premium materials.
              </p>
            </details>
          ))}
        </section>

      </div>
    </aside>
  );
}


export function ProductGallery({ skus }: any) {
  if (!Array.isArray(skus)) return null;
  const images = skus.flatMap((sku: any) => sku.img);

  return (
    <section className="col-span-8">
      {images.map((src: string, i: number) => (
        <img
          key={i}
          src={src}
          className="w-full rounded-lg object-contain"
        />
      ))}
    </section>
  );
}
