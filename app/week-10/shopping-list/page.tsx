"use client";

import { useState, useEffect } from "react";
import NewItem from "./new-item";
import { ItemList } from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  async function loadItems() {
    if (!user) return;

    const userItems = await getItems(user.uid);
    setItems(userItems);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  if (!user) {
    return (
      <main className="p-4">
        <p>You must be logged in to view the shopping list.</p>
      </main>
    );
  }

  async function handleAddItem(newItem) {
    const id = await addItem(user.uid, newItem);
    setItems((prevItems) => [...prevItems, { id, ...newItem }]);
  }

  function cleanItemName(name) {
    let text = name.split(",")[0];
    text = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g,
      ""
    );
    return text.trim();
  }

  function handleItemSelect(item) {
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