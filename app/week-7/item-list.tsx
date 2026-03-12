import { useState } from "react";
import { Item } from "./item";

export function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 border rounded ${
            sortBy === "name" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setSortBy("name")}
        >
          Sort by name
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            sortBy === "category" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setSortBy("category")}
        >
          Sort by category
        </button>
      </div>

      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}
