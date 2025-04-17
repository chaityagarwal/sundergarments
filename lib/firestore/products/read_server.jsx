import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isSale", "==", true))
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
    };
  });
};

export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("updatedAt", "desc"))
  );
  return list.docs.map((snap) => snap.data());
};

export const getProductsByCategory = async ({ categoryId }) => {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where("categoryId", "==", categoryId)
    )
  );
  return list.docs.map((snap) => snap.data());
};
