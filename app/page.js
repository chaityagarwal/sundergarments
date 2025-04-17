export const dynamic = "force-dynamic";

import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import { getCategories } from "@/lib/firestore/categories/read_server";
import Categories from "./components/Categories";
import ProductsGridView from "./components/Products";
import Footer from "./components/Footer";

export default async function Home() {
  const [featuredProducts, categories, products] =
    await Promise.all([
      getFeaturedProducts(),
      getCategories(),
      getProducts(),
    ]);
                                                           
  return (
    <main className="w-screen h-screen overflow-x-hidden overflow-y-auto"> 
      <Header />
      <FeaturedProductSlider featuredProducts={featuredProducts} />
      <Categories categories={categories} />
      <ProductsGridView products={products} />
      <Footer />
    </main>
  );
}
