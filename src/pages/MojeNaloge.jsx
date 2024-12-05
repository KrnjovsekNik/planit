import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaCheckDouble } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { IoInformationOutline } from "react-icons/io5";
import { dodajNalogo, posodobiStanjeNaloge, pridobiNaloge } from "../api/nalogeApi";
import { useNavigate } from "react-router-dom";

function MojeNaloge() {

  const [modalOpen, setModalOpen] = useState(false)
  const my_username = 'martin'

  const [stevilonalog, setSteviloNalog] = useState(0) //to je samo za to da se v realnem casu prikazuje nima veze z stevilom nalog

  const [naloge, setNaloge] = useState([]);

  const [ime, setIme] = useState("");
  const [rok, setRok] = useState("");
  const [opis, setOpis] = useState("");
  const [stanje, setStanje] = useState("");
  const [id_projekt, setIdProjekt] = useState('')
  const [ime_projekta, setImeProjekta] = useState('')
  const navigate = useNavigate()

  /*{ ime, lastnik, rok, opis, stanje, id_projekt, ime_projekta }*/
  const handleSubmit = async (e) => {
    try {
      const novaNaloga = {
        ime : 'vtekunaloga',
        lastnik: my_username,
        rok : "2024-12-15",
        opis: 'ooooo',
        stanje: 'vteku',
        id_projekt: 'projekt32',
        ime_projekta: 'projekt32'
      };

      await dodajNalogo(novaNaloga);
      setIme("");
      setRok("");
      setOpis("");
      setStanje("");
      setIdProjekt('')
      setImeProjekta('')
      setSteviloNalog(stevilonalog+1)
      /*onClose();*/
    } catch (err) {
      console.error("Napaka pri dodajanju naloge:", err);
      alert("Napaka pri dodajanju naloge. Poskusite znova.");
    }
  };

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pridobiNaloge(my_username);
        setNaloge(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [stevilonalog]);



  const filters = [
    {ime:'vsi'},{ime: 'nedokončano'}, {ime:'vteku'}, {ime:'končano'}
  ]

  const [filter, setFilter] = useState('vsi');
  const reactConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 }, // Višina konfeti
      colors: ["#ff4", "#ff6f61", "#6b5b95", "#88b04b", "000000", "#3498db", "#f1c40f", "#e74c3c", "#9b59b6", "#1abc9c" ]
    });
  };


  const toggleStanje = async (_id) => {
    try {
      const response = await posodobiStanjeNaloge(_id); 
  
      if (response) {
        setNaloge((prejsnjeNaloge) =>
          prejsnjeNaloge.map((naloga) => naloga._id === _id ? { ...naloga, stanje: "končano" } : naloga)
        );
          reactConfetti();
      }
    } catch (error) {
      console.error("Napaka pri posodabljanju naloge:", error.message);
      alert("Napaka pri posodabljanju naloge. Poskusite znova.");
    }
  };
  

  /*{ ime, lastnik, rok, opis, stanje, id_projekt, ime_projekta }*/
  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Moje naloge</h2>
        <button onClick={() => setModalOpen(true)} className="flex items-center space-x-2 px-4 bg-white border border-gray-500 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm">
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
            <div key={index} className={`${naloga.stanje === 'končano' ? 'bg-green-200' : (naloga.stanje === 'nedokončano' ? 'bg-blue-100' : 'bg-white')}  border-blue-800 border cursor-pointer inline rounded-sm p-4 flex items-center space-x-4 transform shadow-md transition-transform hover:shadow-xl ${(filter !== 'vsi' && filter !== naloga.stanje) ? 'hidden': ''}`}>
              {
                naloga.stanje === 'končano' ? 
                <FaCheckDouble /> :
                <input
                  onClick={() => toggleStanje(naloga._id)}
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600"
                /> 
              }
              <div>
                <div className="text-lg font-semibold">
                  {naloga.ime}
                </div>
                <div className="text-sm">
                  Projekt: {naloga.ime_projekta}
                </div>

              </div>
              <div onClick={() => navigate(`${naloga._id}`)} className="absolute right-3 bg-white rounded-full border-[2px] border-black hover:bg-gray-200">
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
