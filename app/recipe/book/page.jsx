"use client";

import { use, useEffect, useState } from "react";

import { getCookie } from "../../../helpers";
import Link from "next/link";

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

const deleteRecipeBook = async (id) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
    <soapenv:Header/>
    <soapenv:Body>
        <web:deleteRecipeBook>
            <web:name>${id}</web:name>
        </web:deleteRecipeBook>
    </soapenv:Body>
</soapenv:Envelope>`,
  });

  const xml = await res.text();

  return xml;
};

const createRecipeBook = async (title, userId) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
    <soapenv:Header/>
    <soapenv:Body>
        <web:createRecipeBook>
            <web:name>${JSON.stringify({
              title,
              userId,
            })}</web:name>
        </web:createRecipeBook>
    </soapenv:Body>
</soapenv:Envelope>`,
  });

  const xml = await res.text();

  return xml;
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  console.log({ books });

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

        setBooks(formatted);
      });
    });
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="font-medium text-2xl text-center mb-10">Recetarios</h1>
      <div className="mb-4">
        <h2 className="font-medium">Crear nuevo recetario</h2>
        <div className="flex gap-4">
          <input
            type="text"
            className="px-4 py-2 border border-slate-200 rounded-md"
            placeholder="Nombre recetario"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-slate-950 px-4 py-2 text-white rounded-md text-sm font-medium"
            onClick={() => {
              createRecipeBook(title, getCookie("userId"));
              setBooks([
                ...books,
                {
                  id: books.length + 1,
                  userId: getCookie("userId"),
                  title,
                  createdAt: new Date().toISOString(),
                },
              ]);
            }}
          >
            Crear
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <div
            className="flex justify-between items-center border border-slate-300 px-4 py-2"
            key={book.id}
          >
            <div>
              <Link href={`/recipe/book/${book.id}`}>
                <h1 className="font-semibold hover:underline">{book.title}</h1>
              </Link>
              <p className="text-slate-700">{book.description}</p>
            </div>
            <div
              onClick={() => {
                deleteRecipeBook(book.id);
                setBooks(books.filter((b) => b.id !== book.id));
              }}
              className="cursor-pointer"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
