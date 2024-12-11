import React, { useState } from "react";
import { dodajProjekt } from "../api/projectApi"; 
import { pridobiUserja } from "../api/userApi";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loading from "./Loading";

function NovProjektModal({ isOpen, onClose }) {
  const name = sessionStorage.getItem("username");

  const [ime, setIme] = useState("");
  const [opis, setOpis] = useState("");
  const [rok, setRok] = useState("");
  const [prijatelji, setPrijatelji] = useState(null)

  const [loading, setLoading] = useState(false)

  const [izbraniPrijatelji, setIzbraniPrijatelji] = useState([])

  const odstraniPrijatelja = (fr) => {
    setPrijatelji((prev) => [...prev, fr]);
    setIzbraniPrijatelji((prev) =>prev.filter((prijatelj) => prijatelj !== fr));
  }

  const izberiPrijatelja = (fr) => {
    setIzbraniPrijatelji((prev) => [...prev, fr])
    setPrijatelji((prev) =>prev.filter((prijatelj) => prijatelj !== fr));
  }

  const seznamPrijateljev = async () => {
    try {
      const data = await pridobiUserja(name);
      setPrijatelji(data[0].prijatelji);
    } catch (error) {
      toast.error('Napaka pri pridobitvi lastnik podatkov.')
    }
  }

  useEffect(() => {
    seznamPrijateljev()
  }, [])

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const novProjekt = {
        ime,
        opis,
        rok,
        udelezenci: [...izbraniPrijatelji, name] 
      };
      await dodajProjekt(novProjekt);
      setIme("");
      setOpis("");
      setRok("");
      setIzbraniPrijatelji("");
      toast.success(`Projekt ${ime} uspešno dodan`)
    } catch (err) {
      toast.error("Napaka pri dodajanju projekta.");
    } finally {
      setLoading(false)
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Dodaj nov projekt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

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

          <div>
            <div className="block text-gray-700 font-medium">
              Izberi udeležence
            </div>
            <div className="flex flex-wrap gap-2 min-h-[45px] border border-gray-400 rounded-lg w-full">
              {izbraniPrijatelji.map((prijatelj, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded px-3 ml-[2px] py-1 my-1"
                >
                  <span>{prijatelj}</span>
                  <FaXmark
                    onClick={() => odstraniPrijatelja(prijatelj)}
                    className="cursor-pointer text-gray-800"
                  />
                </div>
              ))}
            </div>
            <div className="flex w-full gap-3 mt-[5px]">
            {
              prijatelji
                ? prijatelji.map((prijatelj, index) => (
                    <div onClick={() => izberiPrijatelja(prijatelj)} key={index} className="h-[30px] border hover:bg-gray-400 border-gray-400 bg-gray-200 text-black rounded px-2 cursor-pointer">
                      {prijatelj}  {/*<FaXmark /> */}
                    </div>
                  ))
                : ''
            }
            </div>
          </div>

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
              {loading ? <Loading /> : 'Dodaj projekt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovProjektModal;
