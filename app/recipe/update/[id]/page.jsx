"use client";

import { useState } from "react";
import { CategoriesSelect } from "../../../../components/CategoriesSelect";
import { IngredientSelect } from "../../../../components/IngredientSelect";
import { RangeTime } from "../../../../components/RangeTime";
import { getCookie } from "../../../../helpers";

const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    e.stopPropagation();

    var currentUrl = window.location.href;
    const id = currentUrl.split("/")[5];

    console.log(1);

    const formData = new FormData(e.target);

    console.log(2);

    const data = Object.fromEntries(formData.entries());

    console.log(3);

    const images = data.photosUrls
      .split(",")
      .map((url) => ({ url: url.trim(), id: -1 }));

    console.log(4);

    const recipe = {
      title: data.title,
      description: data.description,
      photos: images,
      ingredients: [{ id: Number(data?.ingredients), Name: "" }],
      idCategory: Number(data?.category),
      userId: Number(getCookie("userId")),
      preparationTimeMinutes: Number(data?.prepTime),
      stepts: [],
    };

    console.log(5);

    const res = await fetch(`https://localhost:7055/api/Recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(6, res.status);

    if (res.status === 400) {
      alert("Error al subir la receta, faltan datos");
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    alert("Error al subir la receta, faltan datos");
  }
};

export default function Home() {
  const [recipe, setRecipe] = useState({});

  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-lg">Subir receta</h1>
      <form
        action=""
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
          <CategoriesSelect required={true} />
          <IngredientSelect required={true} />
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
