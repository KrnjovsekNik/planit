import React, { useState } from "react";
import { pridobiPrijavo, pridobiProfilnoSliko } from "../api/userApi"; 
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export default function Login() {
  const [username, setIme] = useState("");
  const [password, setGeslo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Uporabnik = {
        username,
        password,
      };
      Uporabnik.password = CryptoJS.SHA256(Uporabnik.password).toString(CryptoJS.enc.Base64);
      console.log(Uporabnik.password);
      const data = await pridobiPrijavo(Uporabnik);

      if(data.success == true)
      {
        const profileImageResult = await pridobiProfilnoSliko(Uporabnik.username);
        if (profileImageResult.success) {
          sessionStorage.setItem('profile_image', profileImageResult.image);
        } else {
          console.log("No profile image found for user:", Uporabnik.username);
        }

        toast.info(data.message);
        window.location.href = "/home";
      }if(data.success == false){
        toast.error(data.message);
      }

      setIme("");
      setGeslo("");
    } catch (err) {
      console.error("Napaka pri prijavi uporabnika:", err);
      alert("Napaka pri prijavi uporabnika. Poskusite znova.");
    }
  };
  
  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100">
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
