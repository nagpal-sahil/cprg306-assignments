"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./new-item";
import { ItemList } from "./item-list";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function cleanItemName(name) {
    // remove everything after comma (like ", 1 kg 🍗")
    let text = name.split(",")[0];

    // remove emojis (simplified version based on common emoji ranges)
    text = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g,
      ""
    ); // pattern inspired by StackOverflow examples.[web:17]

    // trim whitespace
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
