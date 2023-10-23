"use client";

import { useEffect, useState } from "react";
import { ImageSlider } from "../../../components/ImageSlider";

import { FollowButton } from "../../../components/FollowButton";
import { LikeButton } from "../../../components/LikeButton";
import ComentariosReceta from '../../../components/ComentariosReceta';
import ComentarReceta from '../../../components/ComentarReceta';
import CalificarReceta from '../../../components/CalificarReceta';
import DenunciarReceta from '../../../components/DenunciarReceta'
import { getCookie } from "../../../helpers";

import Link from "next/link";


export default function Home() {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const currentUrl = window.location.href;
    const id = currentUrl.split("/")[4];

    console.log("hola", id);
    console.log({ id });

    fetch(`https://localhost:7055/api/Recipes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRecipe(res.recipe);
      });
  }, []);

  console.log({ recipe });

  if (!recipe?.idReciepe) {
    return null;
  }

  return (
    <main className="container mx-auto p-8">
      <div className="flex flex-col w-full md:flex-row">
        <div>
          <ImageSlider photos={recipe?.photos} />
        </div>
        <div className="flex flex-col p-4 gap-2 w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{recipe?.title}</h1>
              <p className="text-sm text-slate-500 ">
                <Link
                  className="hover:underline"
                  href={`/user/${recipe.user?.id}`}
                >
                  By {recipe.user.name}
                </Link>{" "}
                • {recipe.prepatarionTimeMinutes} min
              </p>
            </div>
            <div className="w-12 h-12 border border-slate-300 rounded-md flex items-center justify-center">
              <LikeButton recipe={recipe} />
            </div>
          </div>
          <p className="text-slate-800">{recipe?.description}</p>
          <p className="text-slate-800">Popularidad: {recipe?.popularity}</p>
          <p className="text-slate-800">Calificación Promedio: {recipe?.averageRanking}</p>
        </div>
      </div>
      <DenunciarReceta recipeId={recipe.idReciepe} recipeUserId = {recipe.user.id} userId={Number(getCookie("userId"))} />
      <CalificarReceta recipeId={recipe.idReciepe} recipeUserId = {recipe.user.id} userId={Number(getCookie("userId"))} />
      <ComentarReceta recipeId={recipe.idReciepe} userId={Number(getCookie("userId"))} />
      <ComentariosReceta recipeId={recipe.idReciepe} />
    </main>
  );
}
