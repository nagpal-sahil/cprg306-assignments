// app/week-10/_services/shopping-list-service.js
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Get all items for a specific user
export async function getItems(userId) {
  const items = [];

  // users/{userId}/items
  const itemsColRef = collection(db, "users", userId, "items");
  const q = query(itemsColRef);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return items;
}

// Add a new item for a specific user
export async function addItem(userId, item) {
  const itemsColRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsColRef, item);
  return docRef.id;
}
