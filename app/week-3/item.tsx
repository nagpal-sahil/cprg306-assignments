import React from "react";

interface ItemProps {
    name: string;
    quantity: number;
    category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
    return (
    <li className="p-4 bg-slate-800 rounded-md">
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <p className="text-sm text-slate-400">Quantity: {quantity} <span className="text-xs font-bold text-white">Category: </span> <span className="italic text-orange-300">{category}</span></p>
    </li>
    );
}