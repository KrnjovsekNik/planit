import React, { useState } from "react";
import { dodajUserja } from "../api/userApi";

export default function Register() {
  const [username, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setGeslo] = useState("");
  const [potrdiGeslo, setPotrdiGeslo] = useState("");
  const [prijatelji] = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Priprava podatkov
      const novUporabnik = {
        username,
        email,
        prijatelji,
        password,
      };

      console.log(novUporabnik);
      // Klic API za dodajanje projekta
      if(password !== potrdiGeslo){
        alert("Gesla se ne ujemata!");
      }else{
        await dodajUserja(novUporabnik);
        window.location.href = "/login";
      }

      // Po uspešnem dodajanju počisti polja in zapri modalno okno
      setIme("");
      setEmail("");
      setGeslo("");
    } catch (err) {
      console.error("Napaka pri dodajanju uporabnika:", err);
      alert("Napaka pri dodajanju uporabnika. Poskusite znova.");
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100">
      {/* registracija */}
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registracija</h2>
        <form onSubmit={handleSubmit}>
          {/* vnos za ime */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ime
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setIme(e.target.value)}
              placeholder="Vnesite ime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* vnos za mejl */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vnesite email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* vnos za geslo */}
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
              onChange={(e) => setGeslo(e.target.value)}
              placeholder="Vnesite geslo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* potrditev za geslo */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Potrdi geslo
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) => setPotrdiGeslo(e.target.value)}
              placeholder="Ponovno vnesite geslo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* gumb za registracijo */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Registracija
          </button>
        </form>
        {/* link do prijave */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Že imate račun?{' '}
            <a
              href="/login"
              className="text-indigo-500 hover:underline"
            >
              Prijavite se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}