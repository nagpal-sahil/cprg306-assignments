// _services/shopping-list-service.js
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Get all items for a user
export async function getItems(userId) {
  const items = [];

  const itemsColRef = collection(db, "users", userId, "items");
  const q = query(itemsColRef);

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return items;
}

// Add a new item for a user
export async function addItem(userId, item) {
  const itemsColRef = collection(db, "users", userId, "items");

  const docRef = await addDoc(itemsColRef, item);

  return docRef.id;
}
