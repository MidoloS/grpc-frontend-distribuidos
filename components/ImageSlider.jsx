"use client";

import Image from "next/image";
import { useState } from "react";

export const ImageSlider = ({ photos = [{}] }) => {
  const [imgPage, setImgPage] = useState(0);
  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imgPage === photos.length - 1) {
      setImgPage(0);
      return;
    }

    setImgPage((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imgPage === 0) {
      setImgPage(photos.length - 1);
      return;
    }

    setImgPage((prev) => prev - 1);
  };
  return (
    <div id="image-slider" className="relative w-fit">
      <Image
        src={photos[imgPage || 0]?.url || "/"}
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
  );
};
