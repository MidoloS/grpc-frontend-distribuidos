"use client";
import Papa from "papaparse";

import { useEffect, useRef } from "react";
import { getCookie, getDraftRecipes, sendDraft } from "../../../../helpers";

const parseMe = (file) => {
  console.log("file", file);
  return Papa.parse(file, {
    complete: function (results) {
      console.log("Data", results.data);
      const formattedMessage = results.data.map(
        ([title, description, category, prepatarionTimeMinutes]) => ({
          title,
          description,
          category,
          prepatarionTimeMinutes,
          userId: getCookie("userId"),
        })
      );
      console.log({ formattedMessage });
      sendDraft(formattedMessage);
      alert("Recetas cargadas");
    },
  });
};

export default function Home() {
  const inputRef = useRef(null);

  useEffect(() => {
    getDraftRecipes().then((data) => {
      console.log("data", data);
    });
  }, []);

  return (
    <main className="flex flex-col container mx-auto p-8 justify-center items-center">
      <h1 className="font-medium text-2xl text-center mb-10">Carga masiva</h1>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click para subir</span> o
              arrastrar archivo
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Solo soporta CSV
            </p>
          </div>
          <input
            ref={inputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={() => parseMe(inputRef.current.files[0])}
          />
        </label>
      </div>
      <a
        className="text-slate-500 text-sm underline mt-4"
        href="/recipes.csv"
        download
      >
        Descargar ejemplo
      </a>
    </main>
  );
}
