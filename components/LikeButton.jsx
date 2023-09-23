import { useEffect, useState } from "react";
import { getCookie } from "../helpers";
import { getFavRecipes } from "../app/page";

const INACTIVE_LIKE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const ACTIVE_LIKE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#f5064f"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

export const LikeButton = ({ recipe }) => {
  const [liked, setLiked] = useState(false);

  if (!recipe?.idReciepe) {
    return null;
  }

  useEffect(() => {
    console.log("uwu");
    const userId = getCookie("userId") || -1;
    (async () => {
      console.log(userId, "userId");
      const likesRecipes = await getFavRecipes(userId);
      const isLiked = likesRecipes.some(
        (like) => like.idReciepe === recipe?.idReciepe
      );
      console.log({ isLiked, likesRecipes });
      setLiked(isLiked);
    })();
  }, [recipe]);

  const handleClick = () => {
    console.log("llego", recipe, recipe?.idReciepe);

    if (!recipe?.idReciepe) {
      return;
    }
    if (liked) {
      fetch(
        `https://localhost:7055/api/Recipes/favorites/` + recipe.idReciepe,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: getCookie("userId"),
        }
      );
    } else {
      fetch(
        `https://localhost:7055/api/Recipes/favorites/` + recipe.idReciepe,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: getCookie("userId"),
        }
      );
    }

    setLiked(!liked);
  };

  const icon = liked ? ACTIVE_LIKE : INACTIVE_LIKE;

  return (
    <button className="flex items-center justify-center" onClick={handleClick}>
      {icon}
    </button>
  );
};
