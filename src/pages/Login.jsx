import React, { useState } from "react";
import { pridobiUserja } from "../api/userApi"; // Uvoz API funkcije za dodajanje projektov

export default function Login() {
  const [username, setIme] = useState("");
  const [password, setGeslo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Priprava podatkov
      const Uporabnik = {
        username,
        password,
      };
      // Klic API za preverjanje prijave
      const data = await pridobiUserja(Uporabnik);
      if(data && data.length > 0)
      {
        sessionStorage.setItem('username', data[0].username);
        sessionStorage.setItem('_id', data[0]._id);
        window.location.href = "/home";
      }

      // Po uspešnem dodajanju počisti polja in zapri modalno okno
      setIme("");
      setGeslo("");
    } catch (err) {
      console.error("Napaka pri prijavi uporabnika:", err);
      alert("Napaka pri prijavi uporabnika. Poskusite znova.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* forma za login */}
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Prijava</h2>
        <form onSubmit={handleSubmit}>
          {/* mejl */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Uporabnisko ime
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setIme(e.target.value)}
              placeholder="Vnesite uporabnisko ime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
                    {/* geslo */}
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
                    {/* gumb za prijavo */}
                    <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Prijava
          </button>
        </form>
        {/* link do registracije */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Nimate računa?{' '}
            <a
              href="/register"
              className="text-indigo-500 hover:underline"
            >
              Registrirajte se
            </a>
          </p>
        </div>
      </div>
      </div>
  );
}
