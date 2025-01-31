import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaCheckDouble } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { IoInformationOutline } from "react-icons/io5";
import { dodajNalogo, posodobiStanjeNaloge, pridobiNaloge } from "../api/nalogeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaClock, FaInfo, FaTrash } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import Loading from "./Loading";

function MojeNaloge() {

  const [nalogeLoading, setNalogeLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const my_username = sessionStorage.getItem("username");

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
  const handleSubmit = async (e) => {  //to bos potem, vkljuci na stran MojProjekt.jsx, samo tam bos lahko dodal nalogo zase ali za koga drugega
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
      setNalogeLoading(true)
      try {
        const data = await pridobiNaloge(my_username);
        setNaloge(data);
      } catch (error) {
        toast.error('Napaka pri pridobivanju nalog.');
      } finally {
        setNalogeLoading(false)
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
      toast.success('Naloga uspešno označena kot končana!')
    } catch (error) {
      toast.error("Napaka pri posodabljanju stanja naloge.");
    }
  };
  

  /*{ ime, lastnik, rok, opis, stanje, id_projekt, ime_projekta }*/
  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Moje naloge</h2>
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
      <div className={`grid grid-cols-3 gap-4 p-4 bg-white flex ${nalogeLoading ? 'flex items-center justify-center h-[100px] w-[270%]' : ''}`}>
                { nalogeLoading ? <Loading /> : 
                    (naloge && naloge.map((naloga, index) => ( 
                        <div key={index} className={`bg-white w-[80%] my-[10px] rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-lg transition-all duration-200 ${(filter !== 'vsi' && filter !== naloga.stanje) ? 'hidden' : ''}`}>
                        <h3 className="text-lg font-semibold text-gray-800">{naloga.ime}</h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {naloga.lastnik}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${naloga.stanje === 'končano' ? 'bg-green-200 text-green-600' : (naloga.stanje === 'vteku' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600')}`}>
                            {naloga.stanje === 'vteku' ? 'V teku' : naloga.stanje}
                          </span>
                          
                          <span className="text-gray-500 text-sm"><strong><FaClock className="text-indigo-600" />{naloga.rok}</strong></span>
                        </div>
                        <div className="mt-4 flex items-center justify-end space-x-2">
                          {naloga.stanje !== 'končano' && 
                          <button onClick={() => toggleStanje(naloga._id)} className="font-bold pr-[5px] text-[23px] text-sm font-medium text-green-600 hover:text-green-800 hover:underline">
                              <LuBadgeCheck />                          
                          </button>
                          }
                          <button onClick={() => navigate(`/moje-naloge/${naloga._id}`)} className="py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            <FaInfo />                          
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )))   
                }
      </div>
    </div>
  );
}

export default MojeNaloge;
