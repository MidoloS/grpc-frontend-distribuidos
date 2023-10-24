import Link from "next/link";

import { LikeButton } from "../components/LikeButton";
import { ImageSlider } from "../components/ImageSlider";
import { getCookie } from "../helpers";

export const RecipeCard = ({ recipe, recipes }) => {
  const isAuthor = recipe.user?.id === Number(getCookie("userId"));

  const allValidPhotos = recipe?.photos?.every((photo) => photo.url);

  if (!allValidPhotos) {
    return null;
  }

  return (
    <div className="flex flex-col w-fit md:max-w-sm">
      <ImageSlider photos={recipe?.photos} />
      <div className="flex justify-between items-center p-2">
        <div>
          <Link
            href={`/recipe/${recipe?.idReciepe}`}
            className="font-medium hover:underline"
          >
            {recipe.title}
          </Link>
          <p className="text-sm text-slate-500 ">
            <Link className="hover:underline" href={`user/${recipe.user?.id}`}>
              By {recipe.user.name}
            </Link>{" "}
            • {recipe.prepatarionTimeMinutes} min
          </p>
        </div>
        <div className="flex gap-2">
          {isAuthor && (
            <Link href={`recipe/update/${recipe.idReciepe}`}>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          )}
          <LikeButton recipe={recipe} />
        </div>
      </div>
    </div>
  );
};
