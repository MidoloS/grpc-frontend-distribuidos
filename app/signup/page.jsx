"use client";

const handleSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());

  console.log({ data });

  const response = await fetch("https://localhost:7055/api/Users/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  console.log({ res });

  //   create session cookie if res is { idUser: number, username: string }
  const { idUser, username } = res;

  if (idUser && username) {
    document.cookie = `user=${idUser}; path=/`;
    document.cookie = `username=${username}; path=/`;
    window.location.href = "/";
  }
};

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <form
        action=""
        className="flex flex-col  items-center gap-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="title"
          placeholder="Nombre completo"
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="title"
          placeholder="Usuario"
        />
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="title"
          placeholder="email@example.com"
        />
        <input
          type="password"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="password"
          placeholder="••••••••••••"
        />
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer w-full max-w-md"
        />
      </form>
    </main>
  );
}
