import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import NovProjektModal from "./NovProjektModal";
import { pridobiProjekte } from "../api/projectApi"; // Uvoz API funkcije

function MojiProjekti() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [projekti, setProjekti] = useState([]);

  // Fetchanje projektov ob nalaganju komponente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pridobiProjekte();
        setProjekti(data);
      } catch (err) {
        console.error("Napaka pri pridobivanju projektov:", err);
      }
    };
    fetchData();
  }, []);

  // Funkcija za osvežitev seznamov projektov
  const osveziProjekte = async () => {
    try {
      const data = await pridobiProjekte();
      setProjekti(data);
    } catch (err) {
      console.error("Napaka pri osvežitvi projektov:", err);
    }
  };

  const barve = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];

  const getRandomColor = (index) => barve[index % barve.length];

  const omejiDolzino = (udelezenci) => {
    const udelezenciString = Array.isArray(udelezenci) ? udelezenci.join(", ") : "";
    return udelezenciString.length > 15 ? udelezenciString.slice(0, 30) + "..." : udelezenciString;
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    osveziProjekte(); // Osveži projekte po zaprtju modalnega okna
  };

  return (
    <div>
      {/* Glava */}
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Moji projekti</h2>
        <button
          className="flex items-center space-x-2 px-4 bg-white border border-gray-500 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm"
          onClick={handleOpenModal}
        >
          <FiPlus className="text-lg" />
          <span>Nov projekt</span>
        </button>
      </div>

      {/* Seznam */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600 border-b border-gray-300">
          <div>Ime projekta</div>
          <div>Udeleženci</div>
          <div>Rok</div>
        </div>

        {/* Seznam elementov */}
        <ul>
          {projekti.map((projekt, index) => (
            <li
              key={projekt._id || index} // Uporaba MongoDB `_id` ali index kot rezervni ključ
              className={`grid cursor-pointer grid-cols-3 px-4 py-2 text-sm items-center border-b border-gray-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition`}
            >
              {/* Ime z barvnim kvadratom */}
              <div className="flex items-center space-x-3">
                <span
                  className={`w-8 h-8 flex-shrink-0 rounded-full ${getRandomColor(index)} flex items-center justify-center text-white font-bold`}
                >
                  {projekt.ime ? projekt.ime[0].toUpperCase() : "-"}
                </span>
                <span>{projekt.ime || "   /   "}</span>
              </div>

              {/* Udeleženci */}
              <div>{omejiDolzino(projekt.udelezenci)}</div>

              {/* Rok */}
              <div>{projekt.rok ? new Date(projekt.rok).toLocaleDateString() : "-"}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modalno okno */}
      {isModalOpen && <NovProjektModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}

export default MojiProjekti;
