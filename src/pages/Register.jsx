import React, { useState } from "react";
import { dodajUserja } from "../api/userApi";
import CryptoJS from "crypto-js";

export default function Register() {
  //spremenljivke
  const [username, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setGeslo] = useState("");
  const [potrdiGeslo, setPotrdiGeslo] = useState("");
  const [prijatelji] = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //forma za novega uporabnika
      const novUporabnik = {
        username,
        email,
        prijatelji,
        password,
      };

      if(password !== potrdiGeslo){
        alert("Gesla se ne ujemata!");
      }else{
        //tukaj hashamo geslo, zato da se ne shrani dobesedno na bazi
        novUporabnik.password = CryptoJS.SHA256(novUporabnik.password).toString(CryptoJS.enc.Base64);
        //klic funkcije za registracijo
        await dodajUserja(novUporabnik);
        //preusmeritev na prijavo
        window.location.href = "/login";
      }

      setIme("");
      setEmail("");
      setGeslo("");
    } catch (err) {
      console.error("Napaka pri dodajanju uporabnika:", err);
      alert("Napaka pri dodajanju uporabnika. Poskusite znova.");
    }
  };

  return (
    //html za aplikacijo
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
      <h3 className="text-sm text-center text-gray-600">Planit</h3>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registracija</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Registracija
          </button>
        </form>
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