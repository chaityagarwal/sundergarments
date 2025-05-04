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
      <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <FeaturedProductSlider featuredProducts={featuredProducts} />
          <Categories categories={categories} />
          <ProductsGridView products={products} />
        </main>
        <Footer />
      </div>
    );
    
}
