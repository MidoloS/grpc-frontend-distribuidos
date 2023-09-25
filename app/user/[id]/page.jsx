"use client";

import { useState } from "react";
import { useEffect } from "react";
import { RecipeGrid } from "../../../components/RecipeGrid";
import { FollowButton } from "../../../components/FollowButton";

export default function Home() {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    var currentUrl = window.location.href;

    const id = currentUrl.split("/")[4];
    console.log("currentUrl", currentUrl);
    console.log({ id });
    fetch("https://localhost:7055/api/User/" + id)
      .then((res) => res.json())
      .then((res) => setUser(res));
    fetch("https://localhost:7055/myRecipes/" + id)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setRecipes(res?.recipes || []);
      });
  }, []);

  console.log({ user });

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between mb-10 items-center">
        <div>
          <h1 className="font-medium text-2xl">Perfil de {user?.name}</h1>
        </div>
        <div>
          <FollowButton user={user} />
        </div>
      </div>

      <h2 className="text-slate-950 font-medium text-lg mb-3">Recetas</h2>
      <RecipeGrid recipes={recipes} />
    </main>
  );
}
