import Image from "next/image";
import { useState } from "react";

const LIKE_SVG = (
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
  return (
    <div className="flex flex-col w-full md:max-w-sm">
      <div id="image-slider" className="relative">
        <Image src={recipe.photos[imgPage].url} width={400} height={600} />
        <button
          className="absolute top-[40%] left-0 p-4 bg-slate-950 bg-opacity-90 text-slate-200 m-4"
          onClick={handlePrev}
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          className="absolute top-[40%] right-0 p-4 bg-slate-950 bg-opacity-90 text-slate-50 m-4"
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
          <h3>{recipe.title}</h3>
          <p className="text-sm text-slate-500">
            By Lucho • {recipe.prepatarionTimeMinutes} min
          </p>
        </div>
        <div>
          <button>{LIKE_SVG}</button>
        </div>
      </div>
    </div>
  );
};
