"use client";

import { useEffect, useState } from "react";
import { Select } from "./Select";

export const getIngredients = async () => {
  const response = await fetch("https://localhost:7055/api/ingredients");
  const data = await response.json();

  console.log("ingredients", data.ingredients);

  return data.ingredients;
};

export const IngredientSelect = ({ required, defaultValue }) => {
  const [options, setOptions] = useState([]); // [{ label: "Ingredientes", value: null }

  useEffect(() => {
    getIngredients().then((ingredients) => {
      console.log("ingredients2", ingredients);

      const a = ingredients.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient.id,
      }));

      console.log("a", a);

      setOptions(a);
    });
  }, []);

  console.log({ options }, "ingOptions");

  return (
    <Select
      required={required}
      options={[{ label: "Ingredientes", value: -1 }, ...options]}
      multile={true}
      selectKey="ingredient-select"
      name="ingredients"
      defaultValue={defaultValue}
    />
  );
};
