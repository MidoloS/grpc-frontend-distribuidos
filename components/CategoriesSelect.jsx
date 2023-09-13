"use client";

import { useEffect, useState } from "react";
import { Select } from "./Select";

export const getCategories = async () => {
  const response = await fetch("https://localhost:7055/api/categories");
  const data = await response.json();

  console.log({ data });

  return data.categorys;
};

export const CategoriesSelect = ({ required }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      const a = categories.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      console.log({ a });

      setOptions(a);
    });
  }, []);

  console.log({ options });

  return (
    <Select
      options={[{ label: "Categoria", value: null }, ...options]}
      selectKey="category-select"
      name="category"
      required={required}
    />
  );
};
