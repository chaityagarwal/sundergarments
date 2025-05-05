import Link from "next/link";
import AuthContextProvider from "@/contexts/AuthContext";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg text-red-500">Products</h1>
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
    <Link href={`/products/${product?.productId}`}>
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.productImages[0]}
          className="rounded-lg h-48 w-full object-cover"
          alt={product?.productName}
        />
      </div>
        <h1 className="font-semibold line-clamp-2 text-sm">
          {product?.productName}
        </h1>
      <div className="">
        {product?.isSale ? (
          <h2 className="text-green-500 text-sm font-semibold">
            Rs. {product?.salePrice}{" "}
            <span className="line-through text-xs text-gray-600">
              Rs. {product?.fullPrice}
            </span>
          </h2>
        ) : (
          <h2 className="text-green-500 text-sm font-semibold">
            Rs. {product?.fullPrice}
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
                <button className="bg-red-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                  BUY NOW
                </button>
            </div>
          </AuthContextProvider>
        </div>
      </div>
    </div>
    </Link>
  );
}
