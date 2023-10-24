"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const getRecipeBooksItems = async (recipeBookId) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
        <soapenv:Header/>
        <soapenv:Body>
            <web:getRecipeBooksItems>
                <web:name>${recipeBookId}</web:name>
            </web:getRecipeBooksItems>
        </soapenv:Body>
    </soapenv:Envelope>`,
  });

  const xml = await res.text();
  return xml;
};

export default function Home() {
  const [recipeBooks, setRecipeBooks] = useState([]);
  useEffect(() => {
    const currentUrl = window.location.href;
    const id = currentUrl.split("/")[5];
    console.log({ id });
    getRecipeBooksItems(id).then((bks) => {
      const parseString = require("xml2js").parseString;
      parseString(bks, function (err, result) {
        console.log("result xml better", result);
        const wea =
          result["soap11env:Envelope"]["soap11env:Body"][0][
            "tns:getRecipeBooksItemsResponse"
          ][0]["tns:getRecipeBooksItemsResult"][0];

        const json = JSON.parse(wea);

        console.log({ json });

        const formatted = json.map(([id, title, desc, prepTime]) => ({
          id,
          title,
          desc,
          prepTime,
        }));

        console.log({ formatted });

        setRecipeBooks(formatted);
      });
    });
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-2xl text-center mb-10">
        Recetas del Recetario
      </h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        {recipeBooks.map((recipe) => (
          <div>
            <Link href={`/recipe/${recipe.id}`}>
              <h1 className="hover:underline">{recipe.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
