"use client";

import { RecipeGrid } from "../components/RecipeGrid";
import { CategoriesSelect } from "../components/CategoriesSelect";
import { IngredientSelect } from "../components/IngredientSelect";
import { useEffect, useState } from "react";
import { RangeTime } from "../components/RangeTime";
import { getCookie } from "../helpers";

const getAllRecipes = async ({
  title = ".",
  prepTime = 120,
  category = 0,
  ingredientId = 0,
} = {}) => {
  console.log(1, prepTime);
  const response = await fetch(
    `https://localhost:7055/api/Recipes?title=${title}&prepTime=${prepTime}&categoryId=${category}&ingredientId=${ingredientId}`,
    {
      method: "GET",
    }
  );
  console.log(2);

  const data = await response.json();

  console.log("recipe res", data);

  return data.recipies;
};

export const getFavRecipes = async (userId) => {
  const response = await fetch(
    `https://localhost:7055/api/Recipes/favorites/${userId}`
  );

  const data = await response.json();

  console.log("recipe res", data);

  return data.recipies;
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdCookie = getCookie("userId");
    setUserId(userIdCookie);

    console.log({ userIdCookie });

    if (!userIdCookie) {
      window.location.href = "/signin";
    }

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
      ingredientId: ingredients[0],
    });

    console.log({ recipes });

    setRecipes(recipes);
  };

  const activeClass =
    "bg-slate-950 text-slate-50 px-4 py-2 font-semibold rounded-md";
  const inactiveClass = "bg-slate-50 text-slate-950 rounded-md";

  return (
    <main className="container mx-auto p-8">
      <form
        action=""
        className="flex flex-col gap-4"
        method="GET"
        onSubmit={handleSubmit}
      >
        <h1 className="font-medium text-lg">
          Bienvenido/a {getCookie("userName")}!
        </h1>
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
      </form>

      <div className="flex gap-4 py-4">
        <button
          className={activeTab === "all" ? activeClass : inactiveClass}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("all click");
            setActiveTab("all");
            getAllRecipes().then((data) => {
              console.log({ data });
              setRecipes(data);
            });
          }}
        >
          Todos
        </button>
        <button
          className={activeTab === "fav" ? activeClass : inactiveClass}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("fav click");
            setActiveTab("fav");
            getFavRecipes(userId).then((data) => {
              console.log({ data });
              setRecipes(data);
            });
          }}
        >
          Favoritos
        </button>
      </div>
      <RecipeGrid recipes={recipes} />
    </main>
  );
}
