import { getCategory } from "@/lib/firestore/categories/read_server";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "@/app/components/AddToCartButton";
import Link from "next/link";

export default function Details({ product }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-3">
        <Category categoryId={product?.categoryId} />
      </div>
      <h1 className="font-semibold text-xl md:text-4xl">
        {product?.productName}
      </h1>
      <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">
        {product?.productDescription}
      </h2>
      {product?.isSale ? (
        <h3 className="text-green-500 font-bold text-lg">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-gray-700 text-sm">
            ₹ {product?.fullPrice}
          </span>
        </h3>
      ) : (
        <h3 className="text-green-500 font-bold text-lg">
          ₹ {product?.fullPrice}
        </h3>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <AuthContextProvider>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/919830464031?text=${encodeURIComponent(
                `Hello Sunder Garments \nI want to know about this product \n${product?.productName} \n${product?.productId} \n Product Image: ${product.productImages[0]}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                WhatsApp
              </button>
            </a>
          </div>
        </AuthContextProvider>
        <AuthContextProvider>
          <AddToCartButton product={{
      ...product,
      createdAt: product.createdAt?.toDate?.() ?? null,
      updatedAt: product.updatedAt?.toDate?.() ?? null,
    }}/>
        </AuthContextProvider>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
}

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
        <img className="h-4" src={category?.categoryImg} alt="" />
        <h4 className="text-xs font-semibold">{category?.categoryName}</h4>
      </div>
    </Link>
  );
}
