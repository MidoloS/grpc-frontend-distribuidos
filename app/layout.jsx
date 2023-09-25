"use client";

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getCookie } from "../helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const APP_LOGO = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30.408"
    height="30.39"
    viewBox="0 0 30.408 30.39"
  >
    <path
      id="sombrero-chef"
      d="M30.189,5.958c-.966-3.942-6.4-6.027-9.721-3.906a7.8,7.8,0,0,0-10.537,0C1.786-2.1-4.541,9.789,4.214,13.566a1.183,1.183,0,0,1,.854,1.078V24.695a5.7,5.7,0,0,0,5.7,5.7h8.865a5.7,5.7,0,0,0,5.7-5.7V14.644a1.183,1.183,0,0,1,.854-1.078,6.354,6.354,0,0,0,4-7.609ZM22.8,24.695a3.166,3.166,0,0,1-3.166,3.166H10.767a3.278,3.278,0,0,1-3.166-3.8H22.8Zm2.533-13.516A3.688,3.688,0,0,0,22.8,14.644v6.884H7.6V14.644a3.688,3.688,0,0,0-2.533-3.465A3.834,3.834,0,0,1,2.661,6.584c.742-2.66,4.723-3.773,6.564-1.9a1.274,1.274,0,0,0,1.954-.177c1.579-2.634,6.453-2.634,8.032,0a1.275,1.275,0,0,0,1.954.177,4.012,4.012,0,0,1,3.673-.812h0a3.816,3.816,0,0,1,.493,7.306Z"
      transform="translate(0.007 -0.004)"
      fill="#020617"
    />
  </svg>
);

export default function RootLayout({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdCookie = getCookie("userId");

    setUserId(userIdCookie);
  }, []);

  const signedIn = !!userId;

  const handleSignOut = () => {
    document.cookie = `userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `userName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    window.location.href = "/signin";
  };

  const signedButtons = (
    <div className="flex gap-6 items-center">
      <Link
        href="/recipe/upload"
        className="bg-slate-950 text-slate-50 px-4 py-2 rounded-lg"
      >
        Subir receta
      </Link>
      <button onClick={handleSignOut}>Cerrar Sesion</button>
    </div>
  );

  const unsignedButtons = (
    <div className="flex gap-6 items-center">
      <Link href="/signin">Sign In</Link>
      <Link
        href="/signup"
        className="bg-slate-950 text-slate-50 px-4 py-2 rounded-lg"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <html lang="en">
      <body>
        <header className="border-b ">
          <div className="container mx-auto flex justify-between p-6 items-center">
            <div>{APP_LOGO}</div>
            {signedIn ? signedButtons : unsignedButtons}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
