"use client";

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;

    const ordersRef = collection(db, 'orders', user.uid, 'confirmOrders');
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const orderData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {loading ? (
        <div className="text-center py-4">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-4">No orders found!</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded p-4 flex items-center space-x-4"
            >
              <img
                src={order.productImages?.[0]}
                alt="Product"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{order.productName}</h3>
                <div className="text-sm text-gray-600">
                  ₹{order.productTotalPrice} —{' '}
                  {order.status === 0 ? (
                    <span className="text-blue-500">In Process..</span>
                  ) : order.status === 1 ? (
                    <span className="text-green-600">Delivered</span>
                  ) : (
                    <span className="text-red-600">Cancelled</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
