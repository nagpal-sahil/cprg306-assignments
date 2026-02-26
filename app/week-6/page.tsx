"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList, { ItemType } from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(() =>
    itemsData.map((item) => ({ ...item }))
  );

  function handleAddItem(item: Omit<ItemType, "id">) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };

    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping List</h1>

        <NewItem onAddItem={handleAddItem} />

        <ItemList items={items} />
      </div>
    </main>
  );
}