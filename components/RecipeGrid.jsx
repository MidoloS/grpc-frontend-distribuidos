"use client";

import { RecipeCard } from "./RecipeCard";

export const RecipeGrid = ({ recipes = [] }) => {
  if (!recipes.length) {
    return <div className="text-center">No recipes found</div>;
  }

  return (
    <div className="flex gap-4 flex-col md:grid lg:grid-cols-4 md:grid-cols-3">
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={recipe} key={index} />
      ))}
    </div>
  );
};
