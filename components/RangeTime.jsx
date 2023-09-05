"use client";

import { useState } from "react";

export const RangeTime = () => {
  const [minutes, setMinutes] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;

    setMinutes(value);
  };

  // color slate

  return (
    <div className="flex items-center max-w-xs">
      <input
        type="range"
        name="prepTime"
        id="prepTime"
        min="0"
        max="120"
        step={10}
        value={minutes}
        onChange={handleChange}
        className="w-full bg-slate-950 cursor-pointer accent-slate-950"
      />
      <span className="flex w-[65px] text-slate-600 text-sm ml-4">
        {minutes} min
      </span>
    </div>
  );
};
