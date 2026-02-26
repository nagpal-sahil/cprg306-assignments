"use client";

import { useState } from "react";
import Item from "./item";
import rawItems from "./items.json";

type SortMode = "name" | "category" | "group";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

const items: ItemType[] = rawItems;

export default function ItemList() {
  const [sortBy, setSortBy] = useState<SortMode>("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    }
    // for "group", we will handle separately
    return 0;
  });

  // group by category when sortBy === "group"
  const grouped = items
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce<Record<string, ItemType[]>>((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

  const categoryOrder = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b)
  );

  const baseBtn =
    "px-3 py-1 rounded border text-sm mr-2 mb-2 transition-colors";
  const active = "bg-blue-600 text-white border-blue-600";
  const inactive = "bg-white text-gray-700 border-gray-300";

  return (
    <section>
      <div className="mb-4">
        <button
          className={`${baseBtn} ${
            sortBy === "name" ? active : inactive
          }`}
          onClick={() => setSortBy("name")}
        >
          Sort by Name
        </button>
        <button
          className={`${baseBtn} ${
            sortBy === "category" ? active : inactive
          }`}
          onClick={() => setSortBy("category")}
        >
          Sort by Category
        </button>
        <button
          className={`${baseBtn} ${
            sortBy === "group" ? active : inactive
          }`}
          onClick={() => setSortBy("group")}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "group" ? (
        <div className="space-y-4">
          {categoryOrder.map((cat) => (
            <div key={cat}>
              <h2 className="font-bold capitalize mb-1">{cat}</h2>
              <ul className="pl-4 list-disc">
                {grouped[cat]
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </section>
  );
}