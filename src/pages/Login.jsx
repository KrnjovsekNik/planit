import React, { useRef } from "react";
import { pridobiPrijavo, pridobiUserja } from "../api/userApi";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //tukaj se ime in geslo nastavita na vrednosti v tekstovnih poljih ob klicu funkcije
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const Uporabnik = {
        username,
        //geslo je hashano
        password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
      };
      //klic za preverjanje prijave
      const data = await pridobiPrijavo(Uporabnik);

      if (data.success === true) {
        //ce je prijava uspesna pridobimo se ostale pomembne podatke
        const user = await pridobiUserja(Uporabnik.username);
        if (user.length > 0) {
          //nastavimo pomembne vrednosti v sejo
          sessionStorage.setItem("profile_image", user[0].image);
          sessionStorage.setItem("email", user[0].email);
        } else {
          console.log("No profile image found for user:", Uporabnik.username);
        }
        toast.info(data.message);
        //preusmeritev na domaco stran
        window.location.href = "/home";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Napaka pri prijavi uporabnika:", err);
      alert("Napaka pri prijavi uporabnika. Poskusite znova.");
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
      <h3 className="text-sm text-center text-gray-600">Planit</h3>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Prijava</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Uporabniško ime
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Vnesite uporabniško ime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Geslo
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Vnesite geslo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Prijava
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Nimate računa?{" "}
            <a href="/register" className="text-indigo-500 hover:underline">
              Registrirajte se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
