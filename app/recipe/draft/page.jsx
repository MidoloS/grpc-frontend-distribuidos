"use client";

import { use, useEffect, useState } from "react";

import { getCookie } from "../../../helpers";
import Link from "next/link";

const getDrafts = async (userId) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
    <soapenv:Header/>
    <soapenv:Body>
        <web:getMassive>
            <web:name>${userId}</web:name>
        </web:getMassive>
    </soapenv:Body>
</soapenv:Envelope>`,
  });

  const xml = await res.text();

  return xml;
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  console.log({ recipes });

  useEffect(() => {
    getDrafts(getCookie("userId")).then((xml) => {
      const parseString = require("xml2js").parseString;
      parseString(xml, function (err, result) {
        console.log("result xml better", result);
        const wea =
          result["soap11env:Envelope"]["soap11env:Body"][0][
            "tns:getMassiveResponse"
          ][0]["tns:getMassiveResult"][0];

        const json = JSON.parse(wea);

        const formatted = json.map(
          ([
            id,
            title,
            description,
            preparation_time_minutes,
            id_user,
            id_category,
          ]) => ({
            id,
            title,
            description,
            preparation_time_minutes,
            id_user,
            id_category,
          })
        );

        setRecipes(formatted);
      });
    });
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-2xl text-center mb-10">Drafts</h1>
      <div className="flex flex-col gap-4">
        {recipes.map((recipe) => (
          <div className="flex justify-between items-center border border-slate-300 px-4 py-2">
            <div>
              <h1 className="font-semibold">{recipe.title}</h1>
              <p className="text-slate-700">{recipe.description}</p>
            </div>
            <div>
              <Link href={`/recipe/update/${recipe.id}`}>
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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
