import { getProduct } from "@/lib/firestore/products/read_server";
import Photos from "./components/Photos";
import Details from "./components/Details";
import RelatedProducts from "./components/RelatedProducts";

export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return {
    title: `${product?.title} | Product`,
    description: product?.shortDescription ?? "",
    openGraph: {
      images: [product?.featureImageURL],
    },
  };
}

export default async function Page({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });
  return (
    <main className="p-5 md:p-10">
      <section className="flex flex-col-reverse md:flex-row gap-3">
        <Photos
          imageList={[product?.featureImageURL, ...(product?.productImages ?? [])].filter(Boolean)}
        />
        <Details product={product} />
      </section>
      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
}