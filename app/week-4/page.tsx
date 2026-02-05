"use client";

import React, { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const isTooShort = name.trim().length > 0 && name.trim().length < 2;
  const isEmpty = name.trim().length === 0;
  const isInvalid = isEmpty || isTooShort;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isInvalid) return;

    const item = { name, quantity, category };
    console.log(item);
    alert(`Added Item: ${name}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 m-4 bg-white text-black max-w-sm w-full rounded-lg shadow-md border border-gray-200"
    >
      {/* Name Field */}
      <div className="mb-4">
        <label className="block font-bold mb-1">Item Name</label>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameTouched) setNameTouched(false); 
          }}
          onFocus={() => setNameTouched(false)}
          onBlur={() => setNameTouched(true)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            nameTouched && isInvalid 
              ? "border-red-500 focus:ring-red-200" 
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        
        {/* Error Messaging */}
        {nameTouched && (
          <div className="h-5"> {/* Fixed height prevents layout shift */}
            {isEmpty && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
            {isTooShort && <p className="text-red-500 text-sm mt-1">Name must be at least 2 characters.</p>}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <div className="mb-4 flex-1">
          <label className="block font-bold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 flex-1">
          <label className="block font-bold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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

      <button
        type="submit"
        disabled={isInvalid}
        className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
      >
        Submit Item
      </button>
    </form>
  );
}