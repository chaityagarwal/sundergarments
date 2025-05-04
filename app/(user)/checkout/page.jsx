"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const user = auth.currentUser;
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(
      collection(db, "cart", user.uid, "cartOrders"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setTotal(
          items.reduce(
            (sum, item) => sum + parseFloat(item.productTotalPrice || 0),
            0
          )
        );
      }
    );
    return () => unsub();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "cart", user.uid, "cartOrders", id));
  };

  const openWhatsApp = (productName, productId) => {
    const number = "+919830464031";
    const message = `Hello Sunder Garments\nOrder placed for this product:\n${productName} ${productId}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const generateOrderId = () => {
    const now = Date.now(); // milliseconds since epoch
    const randomNumber = Math.floor(Math.random() * 99999); // random number 0–99998
    return `${now}_${randomNumber}`;
  };

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const querySnapshot = await getDocs(
        collection(db, "cart", user.uid, "cartOrders")
      );

      const orderMeta = {
        uId: user.uid,
        customerName: form.name,
        customerPhone: form.phone,
        customerAddress: form.address,
        customerDeviceToken: "",
        orderStatus: 0,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "orders", user.uid), orderMeta);

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();

        const orderData = {
          productId: data.productId,
          categoryId: data.categoryId,
          productName: data.productName,
          categoryName: data.categoryName,
          salePrice: data.salePrice,
          fullPrice: data.fullPrice,
          productImages: data.productImages,
          deliveryTime: data.deliveryTime,
          isSale: data.isSale,
          productDescription: data.productDescription,
          createdAt: new Date(),
          updatedAt: data.updatedAt,
          productQuantity: data.productQuantity,
          productTotalPrice: parseFloat((data.productTotalPrice || 0).toString()) + 0.00001,
          customerId: user.uid,
          status: 0,
          customerName: form.name,
          customerPhone: form.phone,
          customerAddress: form.address,
          customerDeviceToken: "",
        };

        const orderId = generateOrderId();
        await setDoc(
          doc(db, "orders", user.uid, "confirmOrders", orderId),
          orderData
        );
        await deleteDoc(doc(db, "cart", user.uid, "cartOrders", docSnap.id));
        openWhatsApp(orderData.productName, orderData.productId);
      }

      toast.success("Order Placed Successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>No products found!</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg p-3 shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productImages[0]}
                    alt={item.productName}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm">Rs. {item.productTotalPrice}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-semibold">
              Total: Rs. {total.toFixed(2)}
            </p>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border p-2 rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                placeholder="Address"
                className="w-full border p-2 rounded"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
