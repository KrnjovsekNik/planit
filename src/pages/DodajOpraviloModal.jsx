import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { dodajOpravilo } from "../api/opravilaApi";

function DodajOpraviloModal({ isOpen, setOpen, id_naloge }) {
  const [stanje, setStanje] = useState("vteku"); // Default value
  const [prioriteta, setPrioriteta] = useState("srednjepomembno"); // Default value
  const [opis, setOpis] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        await dodajOpravilo(id_naloge, opis, stanje, prioriteta)
        toast.success("Opravilo dodano uspešno!");
    } catch (error) {
        toast.error('Neuspešno dodano opravilo. Poskusi znova.')
    } finally {
        setLoading(false)
        setOpen(false)
        setPrioriteta('srednjepomembno')
        setStanje('vteku')
    }

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Dodaj novo opravilo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-gray-700 font-medium mb-1">Opis</label>
            <textarea
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
            </textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stanje</label>
            <select
              value={stanje}
              onChange={(e) => setStanje(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="vteku">V teku</option>
              <option value="končano">Končano</option>
              <option value="nedokončano">Nedokončano</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Prioriteta
            </label>
            <select
              value={prioriteta}
              onChange={(e) => setPrioriteta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="nujno">Nujno</option>
              <option value="pomembno">Pomembno</option>
              <option value="srednjepomembno">Srednje pomembno</option>
              <option value="nepomembno">Nepomembno</option>
            </select>
          </div>
          {
            loading ? <Loading /> : 
          <button
                type="submit"
                className="w-full bg-gray-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Dodaj Opravilo
          </button>    
        }
        </form>


      </div>
    </div>
  );
}

export default DodajOpraviloModal;
