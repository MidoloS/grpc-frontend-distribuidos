import { useState } from "react";
import { RecipeBookSelect } from "./RecipeBookSelect";

const addItemToRecipeBook = async (recipeBookId, recipeId) => {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
        <soapenv:Header/>
        <soapenv:Body>
            <web:createRecipeBookItem>
                <web:name>${JSON.stringify({
                  recipeBookId,
                  recipeId,
                })}</web:name>
            </web:createRecipeBookItem>
        </soapenv:Body>
        </soapenv:Envelope>`,
  });
};

export const ModalCreateBookItem = ({ recipeId }) => {
  const [open, setOpen] = useState(false);
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(-1);
  return (
    <>
      <button
        className="border border-slate-300 rounded-md px-4 py-3 font-medium"
        onClick={() => {
          setOpen(true);
        }}
      >
        Agregar a recetario
      </button>
      {open && (
        <div className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-sm">
          <dialog
            open={open}
            className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-sm flex flex-col gap-4 bg-white rounded-md border border-slate-300 p-8"
          >
            <h1 className="font-medium">Agregar a recetario</h1>
            <RecipeBookSelect
              recipeBooks={recipeBooks}
              setRecipeBooks={setRecipeBooks}
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
            <div className="flex gap-4">
              <button
                className="border border-slate-300 text-slate-950 font-medium rounded-md px-4 py-2 text-sm"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-slate-950 text-white rounded-md px-4 py-2 text-sm"
                onClick={() => {
                  console.log({ selectedBook, recipeId });
                  setOpen(false);
                  addItemToRecipeBook(selectedBook, recipeId);
                }}
              >
                Agregar
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};
