"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch cart items
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = collection(db, "cart", user.uid, "cartOrders");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Calculate total price
  useEffect(() => {
    const fetchTotal = async () => {
      const db = getFirestore();
      const user = getAuth().currentUser;
      const snapshot = await getDocs(
        collection(db, "cart", user.uid, "cartOrders")
      );
      let sum = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        sum += data.productTotalPrice || 0;
      });
      setTotalPrice(sum);
    };

    fetchTotal();
  }, [cartItems]);

  // Increment product quantity
  const incrementQty = async (item) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const ref = doc(db, "cart", user.uid, "cartOrders", item.productId);
    const newQty = item.productQuantity + 1;
    const unitPrice = item.isSale ? item.salePrice : item.fullPrice;
    const newTotal = newQty * parseFloat(unitPrice);

    await updateDoc(ref, {
      productQuantity: newQty,
      productTotalPrice: parseFloat(newTotal),
    });
  };

  // Decrement product quantity
  const decrementQty = async (item) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const ref = doc(db, "cart", user.uid, "cartOrders", item.productId);
    const newQty = item.productQuantity - 1;

    if (newQty <= 0) {
      await deleteDoc(ref);
    } else {
      const unitPrice = item.isSale ? item.salePrice : item.fullPrice;
      const newTotal = newQty * parseFloat(unitPrice);
      await updateDoc(ref, {
        productQuantity: newQty,
        productTotalPrice: parseFloat(newTotal),
      });
    }
  };

  // Delete item from cart
  const deleteItem = async (productId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const ref = doc(db, "cart", user.uid, "cartOrders", productId);
    await deleteDoc(ref);
  };

  // If loading
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="border p-4 mb-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex items-center space-x-4 w-full">
                {item.productImages && item.productImages[0] && (
                  <img
                    src={item.productImages[0]}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex flex-col space-y-1">
                  <h2 className="font-medium text-sm">{item.productName}</h2>
                  <p className="text-xs text-gray-600">
                    Total: Rs.{item.productTotalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrementQty(item)}
                  className="p-2 border rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span>{item.productQuantity}</span>
                <button
                  onClick={() => incrementQty(item)}
                  className="p-2 border rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteItem(item.productId)}
                  className="p-2 border rounded bg-red-500 text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: Rs.{totalPrice.toFixed(2)}
            </p>
            <button
              className="mt-4 p-3 bg-blue-500 text-white rounded"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
