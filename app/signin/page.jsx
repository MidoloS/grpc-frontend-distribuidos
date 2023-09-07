"use client";

const handleSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());

  console.log("data", data);

  console.log("body", JSON.stringify(data));

  const response = await fetch("https://localhost:7055/api/User/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();

  if (user.id === -1) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  document.cookie = `userId=${user.id}; path=/`;
  document.cookie = `userName=${user.userName}; path=/`;
  window.location.href = "/";
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
          name="userName"
          placeholder="username"
        />
        <input
          type="password"
          className="border border-slate-300 p-2 rounded-md text-slate-600 w-full max-w-md"
          name="password"
          placeholder="••••••••••••"
        />
        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer w-full max-w-md"
        />
      </form>
    </main>
  );
}
