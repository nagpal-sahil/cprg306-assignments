"use client";

import React from "react";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || name.length < 2) {
      alert("Please enter a name with at least 2 characters.");
      return;
    }

    const item = {
      name,
      quantity,
      category,
    };

    console.log(item);
    alert(`Added Item:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  const isInvalid = name.trim().length < 2;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 m-4 bg-white text-black max-w-sm w-full rounded-lg shadow-md"
    >
      {/* Name Field */}
      <div className="mb-4">
        <label className="block font-bold mb-1">Item Name</label>
        <input
          type="text"
          placeholder="Item name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            nameTouched && !name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {nameTouched && !name && (
          <p className="text-red-500 text-sm mt-1">Name is required.</p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        {/* Quantity Field */}
        <div className="mb-4 flex-1">
          <label className="block font-bold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            max="99"
            required
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Field */}
        <div className="mb-4 flex-1">
          <label className="block font-bold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen Foods</option>
            <option value="canned">Canned Goods</option>
            <option value="dry">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isInvalid}
        className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
      >
        Submit Item
      </button>
    </form>
  );
}