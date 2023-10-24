import { useState, useEffect } from "react";
import { getCookie } from "../helpers";

const getRecipeBook = async (userId) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
    <soapenv:Header/>
    <soapenv:Body>
        <web:getRecipeBooks>
            <web:name>${userId}</web:name>
        </web:getRecipeBooks>
    </soapenv:Body>
</soapenv:Envelope>`,
  });

  const xml = await res.text();

  console.log({ xml });

  return xml;
};

export const RecipeBookSelect = ({
  recipeBooks,
  setRecipeBooks,
  setSelectedBook,
}) => {
  useEffect(() => {
    getRecipeBook(getCookie("userId")).then((bks) => {
      const parseString = require("xml2js").parseString;
      parseString(bks, function (err, result) {
        console.log("result xml better", result);
        const wea =
          result["soap11env:Envelope"]["soap11env:Body"][0][
            "tns:getRecipeBooksResponse"
          ][0]["tns:getRecipeBooksResult"][0];

        const json = JSON.parse(wea);

        console.log({ json });

        const formatted = json.map(([id, userId, title, createdAt]) => ({
          id,
          userId,
          title,
          createdAt,
        }));

        setRecipeBooks([{ id: -1, title: "Elegir recetario" }, ...formatted]);
      });
    });
  }, []);

  const options = recipeBooks.map((book) => (
    <option key={book.id} value={book.id}>
      {book.title}
    </option>
  ));

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="recipeBook">Recetario</label>
      <select
        name="recipeBook"
        id="recipeBook"
        className="border border-slate-300 rounded-md p-2"
        onChange={(e) => {
          console.log({ e });
          setSelectedBook(e.target.value);
        }}
      >
        {options}
      </select>
    </div>
  );
};
