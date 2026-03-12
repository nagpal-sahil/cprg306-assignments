"use client";

import { useState, FormEvent } from "react";

export type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type NewItemProps = {
  onAddItem: (item: Omit<ItemType, "id">) => void;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const isNameInvalid = !name || name.trim().length < 2;
  const isFormInvalid = isNameInvalid || quantity < 1 || quantity > 99;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isNameInvalid) {
      alert("Name must be at least 2 characters.");
      return;
    }

    const item = {
      name: name.trim(),
      quantity,
      category,
    };

    onAddItem(item);

    // reset fields
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">Add New Item</h2>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          className={`border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            isNameInvalid && nameTouched
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
          placeholder="e.g. apples 🍎"
        />
        {isNameInvalid && nameTouched && (
          <p className="text-xs text-red-500">
            Name is required and must be at least 2 characters.
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-1">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="99"
          value={quantity}
          required
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isFormInvalid}
        className="w-full mt-2 py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
      >
        Add Item
      </button>
    </form>
  );
}