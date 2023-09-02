"use client";

import { useEffect, useState } from "react";
import { Select } from "./Select";

export const getIngredients = async () => {
  return fetch("https://localhost:7055/api/ingredients")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.ingredients;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const IngredientSelect = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((ingredients) => setIngredients(ingredients));
  }, []);

  const options = ingredients.map((ingredient) => ({
    label: ingredient.name,
    value: ingredient.id,
  }));

  console.log({ options });

  return <Select options={options} />;
};
