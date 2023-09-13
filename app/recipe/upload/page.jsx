"use client";

import { CategoriesSelect } from "../../../components/CategoriesSelect";
import { IngredientSelect } from "../../../components/IngredientSelect";
import { getCookie } from "../../../helpers";
import { RangeTime } from "../../../components/RangeTime";

const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const images = data.photosUrls
      .split(",")
      .map((url) => ({ url: url.trim(), id: -1 }));

    const recipe = {
      title: data.title,
      description: data.description,
      photos: images,
      ingredients: [{ id: Number(data.ingredients), Name: "" }],
      idCategory: Number(data.category),
      userId: Number(getCookie("userId")),
      preparationTimeMinutes: Number(data.prepTime),
      stepts: [],
    };

    const response = await fetch("https://localhost:7055/api/Recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log({ response });

    if (response.status !== 200) {
      alert("Error al subir la receta, faltan datos");
      return;
    }

    window.location.href = "/";
  } catch (error) {
    alert("Error al subir la receta, faltan datos");
  }
};

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-lg">Subir receta</h1>
      <form
        action="/api/Recipes"
        className="flex flex-col  items-center gap-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="title"
          placeholder="Titulo"
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md h-52"
          name="description"
          placeholder="Descripcion"
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md h-52"
          name="photosUrls"
          placeholder="URLs de fotos (separdas por comas)"
        />
        <div className="flex gap-4">
          <CategoriesSelect />
          <IngredientSelect />
        </div>
        <RangeTime />
        <input
          type="submit"
          value="Subir"
          className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer w-full max-w-md"
        />
      </form>
    </main>
  );
}
