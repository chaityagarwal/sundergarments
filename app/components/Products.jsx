import Link from "next/link";
import AuthContextProvider from "@/contexts/AuthContext";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.productId} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.productImages[0]}
          className="rounded-lg h-48 w-full object-cover"
          alt={product?.productName}
        />
      </div>
      <Link href={`/products/${product?.productId}`}>
        <h1 className="font-semibold line-clamp-2 text-sm">
          {product?.productName}
        </h1>
      </Link>
      <div className="">
        {product?.isSale ? (
          <h2 className="text-green-500 text-sm font-semibold">
            ₹ {product?.salePrice}{" "}
            <span className="line-through text-xs text-gray-600">
              ₹ {product?.fullPrice}
            </span>
          </h2>
        ) : (
          <h2 className="text-green-500 text-sm font-semibold">
            ₹ {product?.fullPrice}
          </h2>
        )}
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.productDescription}
      </p>
      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
          <AuthContextProvider>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/919830464031?text=${encodeURIComponent(
                  `Hello Sunder Garments \nI want to know about this product \n${product?.productName} \n${product?.productId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                  BUY NOW
                </button>
              </a>
            </div>
          </AuthContextProvider>
        </div>
      </div>
    </div>
  );
}
