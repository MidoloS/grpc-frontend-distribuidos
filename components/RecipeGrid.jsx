import Image from "next/image";

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

export const RecipeGrid = ({ recipes = [] }) => {
  console.log("recipes123", recipes);

  if (!recipes.length) {
    return <div className="text-center">No recipes found</div>;
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {recipes.map((recipe) => (
        <div className="flex flex-col w-full md:max-w-sm">
          <Image src={recipe.photos[0].url} width={400} height={600} />
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
      ))}
    </div>
  );
};
