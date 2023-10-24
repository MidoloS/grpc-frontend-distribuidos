"use client";

import { useEffect, useState } from "react";
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

    // { photo1: "...", photo2: "...", photo3: "...", photo4: "...", photo5: "..." }
    const { photo1, photo2, photo3, photo4, photo5 } = data;

    const photos = [photo1, photo2, photo3, photo4, photo5].filter(
      (photo) => photo
    );

    if (photos.length === 0) {
      alert("Error al subir la receta, faltan fotos");
      return;
    }

    const formattedPhotos = photos.map((photo) => ({ url: photo, id: -1 }));

    const recipe = {
      title: data.title,
      description: data.description,
      photos: formattedPhotos,
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
  const [recipe, setRecipe] = useState({
    ingredients: [{}],
    photos: [{}],
    category: {},
  });
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    const id = currentUrl.split("/")[5];

    fetch(`https://localhost:7055/api/Recipes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipe(res.recipe);
        setPhoto1(res.recipe.photos[0]?.url);
        setPhoto2(res.recipe.photos[1]?.url);
        setPhoto3(res.recipe.photos[2]?.url);
        setPhoto4(res.recipe.photos[3]?.url);
        setPhoto5(res.recipe.photos[4]?.url);
      });
  }, []);

  console.log({ recipe });

  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-2xl text-center mb-10">
        Actualizar Receta
      </h1>
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
          value={recipe?.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md h-52"
          name="description"
          placeholder="Descripcion"
          value={recipe?.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md "
          name="photo1"
          placeholder="URL Foto 1 (solo images.unsplash.com)"
          value={photo1}
          onChange={(e) => setPhoto1(e.target.value)}
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md "
          name="photo2"
          placeholder="URL Foto 2 (solo images.unsplash.com)"
          value={photo2}
          onChange={(e) => setPhoto2(e.target.value)}
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md "
          name="photo3"
          placeholder="URL Foto 3 (solo images.unsplash.com)"
          value={photo3}
          onChange={(e) => setPhoto3(e.target.value)}
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md "
          name="photo4"
          placeholder="URL Foto 4 (solo images.unsplash.com)"
          value={photo4}
          onChange={(e) => setPhoto4(e.target.value)}
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md "
          name="photo5"
          placeholder="URL Foto 5 (solo images.unsplash.com)"
          value={photo5}
          onChange={(e) => setPhoto5(e.target.value)}
        />

        <div className="flex gap-4">
          <CategoriesSelect
            required={true}
            defaultValue={recipe?.category?.id}
          />
          <IngredientSelect
            required={true}
            defaultValue={recipe?.ingredients[0]?.id}
          />
        </div>
        <RangeTime defaultValue={recipe?.prepatarionTimeMinutes} />
        <input
          type="submit"
          value="Actualizar"
          className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer w-full max-w-md"
        />
      </form>
    </main>
  );
}
