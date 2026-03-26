"use client";

import { useState, useEffect } from "react";
// remove this line:
// import itemsData from "./items.json";
import NewItem from "./new-item";
import { ItemList } from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user } = useUserAuth() as { user: any };
  const [items, setItems] = useState<any[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Load items from Firestore for this user
  const loadItems = async () => {
    if (!user) return;
    const data = await getItems(user.uid);
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, [user]); // reload when user changes/logs in

  if (!user) {
    return (
      <main className="p-4">
        <p>You must be logged in to view the shopping list.</p>
      </main>
    );
  }

  // Add item to Firestore and local state
  async function handleAddItem(newItem: any) {
    if (!user) return;

    // newItem currently comes from <NewItem /> without an id
    const itemToSave = { ...newItem };
    const id = await addItem(user.uid, itemToSave);
    const itemWithId = { id, ...itemToSave };

    setItems((prevItems) => [...prevItems, itemWithId]);
  }

  function cleanItemName(name: string) {
    let text = name.split(",")[0];
    text = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g,
      ""
    );
    return text.trim();
  }

  function handleItemSelect(item: any) {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
