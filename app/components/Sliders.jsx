"use client";

import Link from "next/link";
import Slider from "react-slick";
import AuthContextProvider from "@/contexts/AuthContext";
//import AddToCartButton from "./AddToCartButton";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {featuredProducts?.map((product) => {
          return (
            <div key={product.productId}>
              <div className="flex flex-col-reverse md:flex-row gap-4 bg-blue-100  p-5 md:px-24 md:py-20 w-full">
                <div className="flex-1 flex flex-col md:gap-10 gap-4">
                  <h2 className="text-gray-500 text-xs md:text-base">
                    SUNDER GARMENTS
                  </h2>
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product?.productId}`}>
                      <h1 className="md:text-4xl text-xl font-semibold">
                        {product?.productName}
                      </h1>
                    </Link>
                    <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
                      {product?.productDescription}
                    </h1>
                  </div>
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
                <div className="">
                  <Link href={`/products/${product?.productId}`}>
                    <img
                      className="h-[14rem] md:h-[23rem]"
                      src={product?.productImages[0]}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
