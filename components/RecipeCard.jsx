import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { LikeButton } from "../components/LikeButton";

export const RecipeCard = ({ recipe, recipes }) => {
  const [imgPage, setImgPage] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imgPage === recipe.photos.length - 1) {
      setImgPage(0);
      return;
    }

    setImgPage((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imgPage === 0) {
      setImgPage(recipe.photos.length - 1);
      return;
    }

    setImgPage((prev) => prev - 1);
  };

  console.log("recipe", recipe);

  return (
    <div className="flex flex-col w-full md:max-w-sm">
      <div id="image-slider" className="relative">
        <Image
          src={(recipe?.photos || [])[imgPage || 0]?.url || ""}
          width={400}
          height={600}
          alt="recipe"
        />
        <button
          className="absolute top-[40%] left-0 p-4 bg-black rounded-md bg-opacity-90 text-slate-200 m-4"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          className="absolute top-[40%] right-0 p-4 bg-black rounded-md bg-opacity-90 text-slate-50 m-4"
          onClick={handleNext}
        >
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
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center p-2">
        <div>
          <h3 className="font-medium">{recipe.title}</h3>
          <p className="text-sm text-slate-500">
            By {recipe.user.name} • {recipe.prepatarionTimeMinutes} min
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`recipe/update/${recipe.idReciepe}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
          <LikeButton recipe={recipe} />
        </div>
      </div>
    </div>
  );
};
