"use client";

import { useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const RecipeGrid = ({ recipes = [] }) => {
  if (!recipes.length) {
    return <div className="text-center">No recipes found</div>;
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={recipe} key={index} />
      ))}
    </div>
  );
};
