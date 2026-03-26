"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
      ingredient
    )}`
  );
  const data = await response.json();
  // API returns { meals: [...] } or { meals: null }
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  async function loadMealIdeas() {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4 border rounded-md bg-white">
      <h2 className="text-xl font-semibold mb-2">
        Meal Ideas {ingredient ? `for "${ingredient}"` : ""}
      </h2>
      {!ingredient && (
        <p className="text-sm text-gray-600">
          Select an item from the shopping list to see meal ideas.
        </p>
      )}
      {ingredient && meals.length === 0 && (
        <p className="text-sm text-gray-600">No meal ideas found.</p>
      )}
      {ingredient && meals.length > 0 && (
        <ul className="list-disc list-inside space-y-1">
          {meals.map((meal) => (
            <li key={meal.idMeal}>{meal.strMeal}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
