import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaCheckDouble } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { IoInformationOutline } from "react-icons/io5";

function MojeNaloge() {

  const [modalOpen, setModalOpen] = useState(false)

  const [naloge, setNaloge] = useState([
    { ime: 'Naloga1', projekt: 'Projekt1', stanje: 'nedokoncano' },
    { ime: 'Naloga2', projekt: 'Projekt2', stanje: 'vteku' },
    { ime: 'Naloga3', projekt: 'Projekt3', stanje: 'nedokoncano' },
    { ime: 'Naloga4', projekt: 'Projekt4', stanje: 'končano' },
    { ime: 'Naloga5', projekt: 'Projekt5', stanje: 'vteku' },
    { ime: 'Naloga6', projekt: 'Projekt6', stanje: 'vteku' },
  ]);

  const filters = [
    {ime:'vsi'},{ime: 'nedokoncano'}, {ime:'vteku'}, {ime:'končano'}
  ]

  const [filter, setFilter] = useState('vsi');
  const reactConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, // Višina konfeti
      colors: ["#ff4", "#ff6f61", "#6b5b95", "#88b04b", "000000", "#3498db", "#f1c40f", "#e74c3c", "#9b59b6", "#1abc9c" ]
    });
  };

  // Funkcija za posodabljanje stanja
  const toggleStanje = (index) => {
    const updatedNaloge = [...naloge]; // Kopiramo naloge
    updatedNaloge[index].stanje = 
      updatedNaloge[index].stanje = 'končano'; // Posodobimo stanje
    setNaloge(updatedNaloge); // Posodobimo state
    reactConfetti();
  };


  const displayNalogaModal = (index) => {

  }

  
  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Moje naloge</h2>
        <button className="flex items-center space-x-2 px-4 bg-white border border-gray-500 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm">
          <FiPlus className="text-lg" />
          <span>Nova naloga</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 bg-white p-1 rounded-lg shadow-md mt-2">
        {filters.map((f, index) => (
          <div
            key={index}
            onClick={() => setFilter(f.ime)}
            className={`cursor-pointer ml-3 px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${f.ime === filter ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {f.ime}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 p-4 bg-white flex">
        {
          naloge.map((naloga, index) => (
            <div key={index} className={`${naloga.stanje == 'končano' ? 'bg-green-300' : (naloga.stanje == 'nedokoncano' ? 'bg-blue-300' : 'bg-blue-100')} border cursor-pointer inline rounded-md p-4 flex items-center space-x-4 shadow-md transform transition-transform hover:scale-105 ${(filter !== 'vsi' && filter !== naloga.stanje) ? 'hidden': ''}`}>
              {
                naloga.stanje == 'končano' ? 
                <FaCheckDouble /> :
                <input
                  onClick={() => toggleStanje(index)}
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600"
                /> 
              }
              <div>
                <div className="text-lg font-semibold">
                  {naloga.ime}
                </div>
                <div className="text-sm">
                  Projekt: {naloga.projekt}
                </div>

              </div>
              <div onClick={displayNalogaModal(index)} className="absolute right-3 bg-white rounded-full border-[2px] border-black hover:bg-gray-200">
                <IoInformationOutline size={20} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MojeNaloge;
