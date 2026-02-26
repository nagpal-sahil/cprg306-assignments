"use client";

import { useState } from "react";
import Item from "./item";

export type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category" | "grouped">("name");

  // never mutate props: work on a copy
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    // for grouped, we still want alphabetical inside groups
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const groupedByCategory = sortedItems.reduce<Record<string, ItemType[]>>(
    (groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {}
  );

  return (
    <section className="mt-8">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSortBy("name")}
          className={`px-3 py-1 rounded text-sm border ${
            sortBy === "name"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300"
          }`}
        >
          Sort by Name
        </button>
        <button
          type="button"
          onClick={() => setSortBy("category")}
          className={`px-3 py-1 rounded text-sm border ${
            sortBy === "category"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300"
          }`}
        >
          Sort by Category
        </button>
        <button
          type="button"
          onClick={() => setSortBy("grouped")}
          className={`px-3 py-1 rounded text-sm border ${
            sortBy === "grouped"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300"
          }`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "grouped" ? (
        <div className="space-y-6">
          {Object.keys(groupedByCategory)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="text-lg font-semibold capitalize mb-2">
                  {category}
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedByCategory[category].map((item) => (
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
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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