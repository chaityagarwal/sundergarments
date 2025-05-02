"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!user?.uid) {
        router.push("/login");
        toast.error("Please log in first");
        return;
      }

      const uid = user.uid;
      const productId = product?.productId?.toString();

      const docRef = doc(db, "cart", uid, "cartOrders", productId);
      const docSnap = await getDoc(docRef);

      const productPrice = parseFloat(
        product.isSale ? product.salePrice : product.fullPrice
      );

      if (docSnap.exists()) {
        const currentQuantity = docSnap.data().productQuantity || 1;
        const newQuantity = currentQuantity + 1;

        await updateDoc(docRef, {
          productQuantity: newQuantity,
          productTotalPrice: productPrice * newQuantity,
        });

        toast.success("Product quantity updated in cart");
      } else {
        await setDoc(doc(db, "cart", uid), {
          uId: uid,
          createdAt: new Date(),
        });

        await setDoc(docRef, {
          productId: product.productId,
          categoryId: product.categoryId,
          productName: product.productName,
          categoryName: product.categoryName,
          salePrice: product.salePrice,
          fullPrice: product.fullPrice,
          productImages: product.productImages,
          deliveryTime: product.deliveryTime,
          isSale: product.isSale,
          productDescription: product.productDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
          productQuantity: 1,
          productTotalPrice: productPrice,
        });

        toast.success("Product added to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-blue-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg"
    >
      {isLoading ? "Loading..." : "Add to Cart"}
    </button>
  );
}
