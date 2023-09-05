"use client";

import { RecipeGrid } from "@/components/RecipeGrid";
import { CategoriesSelect } from "@/components/CategoriesSelect";
import { IngredientSelect } from "@/components/IngredientSelect";
import { useEffect, useState } from "react";
import { RangeTime } from "@/components/RangeTime";

const getAllRecipes = async ({
  title = ".",
  prepTime = 120,
  category = 0,
} = {}) => {
  console.log(1, prepTime);
  const response = await fetch(
    `https://localhost:7055/api/Recipes?title=${title}&prepTime=${prepTime}&categoryId=${category}`,
    {
      method: "GET",
    }
  );
  console.log(2);

  const data = await response.json();

  console.log("recipe res", data);

  return data.recipies;
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then((data) => {
      console.log({ data });
      setRecipes(data);
    });
  }, []);

  console.log("recipes", recipes);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log({ formData });
    const title = formData.get("title") || ".";
    const category = formData.get("category") || 0;
    const ingredients = formData.getAll("ingredients");
    const prepTime = formData.getAll("prepTime") || 120;

    console.log({ title, category, ingredients });

    const recipes = await getAllRecipes({
      title,
      category,
      prepTime,
    });

    console.log({ recipes });

    setRecipes(recipes);
  };

  return (
    <main className="container mx-auto p-8">
      <form
        action=""
        className="flex flex-col gap-4"
        method="GET"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4">
          <input
            type="text"
            className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
            name="title"
            placeholder="Titulo"
          />
          <input
            type="submit"
            value="Buscar"
            className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer"
          />
        </div>

        <div className="flex gap-4">
          <CategoriesSelect />
          <IngredientSelect />
        </div>
        <RangeTime />

        <RecipeGrid recipes={recipes} />
      </form>
    </main>
  );
}
