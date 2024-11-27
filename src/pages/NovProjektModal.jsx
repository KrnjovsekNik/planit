import React, { useState } from "react";
import { dodajProjekt } from "../api/projectApi"; // Uvoz API funkcije za dodajanje projektov

function NovProjektModal({ isOpen, onClose }) {
  const [ime, setIme] = useState("");
  const [opis, setOpis] = useState("");
  const [rok, setRok] = useState("");
  const [udelezenci, setUdelezenci] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Priprava podatkov
      const novProjekt = {
        ime,
        opis,
        rok,
        udelezenci: udelezenci.split(",").map((udelezenec) => udelezenec.trim()), // Razdeli niz udeležencev v polje
      };

      // Klic API za dodajanje projekta
      await dodajProjekt(novProjekt);

      // Po uspešnem dodajanju počisti polja in zapri modalno okno
      setIme("");
      setOpis("");
      setRok("");
      setUdelezenci("");
      onClose();
    } catch (err) {
      console.error("Napaka pri dodajanju projekta:", err);
      alert("Napaka pri dodajanju projekta. Poskusite znova.");
    }
  };

  // Modalno okno ni prikazano, če `isOpen` ni true
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Dodaj nov projekt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vnos za ime projekta */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ime projekta
            </label>
            <input
              type="text"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Vnesite ime projekta"
              required
            />
          </div>

          {/* Vnos za opis */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Opis</label>
            <textarea
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dodajte opis projekta"
              rows="4"
              required
            />
          </div>

          {/* Vnos za rok */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rok</label>
            <input
              type="date"
              value={rok}
              onChange={(e) => setRok(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Vnos za udeležence */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Udeleženci
            </label>
            <input
              type="text"
              value={udelezenci}
              onChange={(e) => setUdelezenci(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Vnesite imena, ločena z vejicami (npr. Janez, Miha, Ana)"
            />
          </div>

          {/* Gumbi za oddajo in preklic */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Prekliči
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Dodaj projekt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovProjektModal;
