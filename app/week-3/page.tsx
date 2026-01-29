import React from "react";
import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 ml-4">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}