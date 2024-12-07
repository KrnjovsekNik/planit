import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dodajVprojekt, pridobiProjekt } from "../api/projectApi";
import { FaClock, FaInfo, FaRunning, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { pridobiProjektneNaloge } from "../api/nalogeApi";
import { MdOutlineDoneOutline, MdOutlinePending } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import DodajUserjeModal from "./DodajUserjeModal";
import { pridobiUserja } from "../api/userApi";
import { toast } from "react-toastify";
import Loading from "./Loading";

function MojProjekt() {
    const username = 'martin'
    const [modalOpen, setModalOpen] = useState(false);
    const [dodanoP, setDodanoP] = useState(0)

    const [udel, setUdel] = useState([])

    const handleCloseModal = () => {
        setModalOpen(false)
        setDodanoP(dodanoP + 1)
    }

    const [prijatelji, setPrijatelji] = useState(null)
    

    const { id } = useParams()
    const navigate = useNavigate()

    const [projekt, setProjekt] = useState();

    const [naloge, setNaloge] = useState([])
    
    const [nalozilo, setNalozilo] = useState(0);

    const [toggleNedokoncano, setToggleNedokoncano] = useState(false)
    const [toggleVteku, setToggleVteku] = useState(false)
    const [toggleKoncano, setToggleKoncano] = useState(false)

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await pridobiProjekt(id);
            setProjekt(response);
        } catch (error) {
            toast.error('Napaka pri pridobivanju projekta');
        } finally {
          setLoading(false)
        }
    };

    const fetchData2 = async () => {
        setLoading2(true)
        try {
            const response = await pridobiProjektneNaloge(id)
            setNaloge(response);
            setNalozilo(nalozilo+1)
        } catch (error) {
            toast.error('Napaka pri pridobivanju projektnih nalog');
        } finally {
          setLoading2(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    useEffect(() => {
        fetchData()
    }, [dodanoP])

    useEffect(() => {
      fetchData2()
  }, [projekt, prijatelji])

    useEffect(() => {
      setUdel(projekt ? projekt.udelezenci : [])
    }, [projekt])

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
          const data = await pridobiUserja(username);
          const prijateljiSeznam = data[0].prijatelji;
          const filtriraniPrijatelji = prijateljiSeznam.filter(
            (prijatelj) => !projekt?.udelezenci.includes(prijatelj)
          );
      
          setPrijatelji(filtriraniPrijatelji);
        } catch (error) {
          toast.error('Napaka pri pridobivanju prijateljev:', error.message);
        }
      };
  
    useEffect(() => {
      seznamPrijateljev()
    }, [projekt])

    const dodaj_k_projektu = async () => {
        try {
            const uspešnoDodani = await Promise.all(
                izbraniPrijatelji.map(async (prijatelj) => {
                    await dodajVprojekt(prijatelj, id); 
                    return prijatelj; 
                })
            );
            setIzbraniPrijatelji((prev) =>
                prev.filter((prijatelj) => !uspešnoDodani.includes(prijatelj))
            );
    
        } catch (error) {
            toast.error('Napaka pri dodajanju prijateljev:', error.message);
        }
    };
    
    


    return (
        <div>
            {/* drugi del */}
            <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Moji projekti {projekt ? ('>>' + projekt.ime) : '...'}</h2>
            </div>

            {/*PODATKI O projektu */}
            <div className={`w-full mx-auto mt-6 p-6 bg-white rounded-lg border-b-2 border-gray-500 ${loading ? 'items-center justify-center flex': ''}`}>
                {loading ? <Loading /> : (projekt ? (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Podrobnosti o projektu</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <FaClock className="text-indigo-600 text-2xl" />
                                <span>
                                    <strong>Rok:</strong> {projekt.rok}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-4">
                                <strong>Opis:</strong> {projekt.opis}
                            </p>
                        </div>
                        <div>
                            <strong className="text-lg font-semibold text-gray-800">Udeleženci:</strong>
                            <div className="flex items-center flex-wrap space-x-2 mt-2">
                                {udel.map((udelezenec, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <img
                                            className="w-[38px] h-[38px] rounded-full border-2 border-blue-500"
                                            src="http://localhost:3000/images/demo.jpg"
                                            alt={udelezenec}
                                        />
                                        <span className="text-gray-800">{udelezenec}</span>
                                    </div>
                                ))}
                                <div onClick={() => setModalOpen(true)} className="w-[38px] h-[38px] bg-gray-300 text-gray-600 hover:bg-gray-400 border border-gray-500 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200">
                                    <AiOutlinePlus className="text-4xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="items-center justify-center flex"><Loading /></div>
                ))}
            </div>

            <div className='w-[100%] flex justify-end p-[5px]'>
                <button className="flex items-center space-x-2 px-4 bg-white border border-gray-500 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm">
                    <FiPlus className="text-lg" />
                    <span>Nova naloga</span>
                </button>
            </div>

            <div className="grid grid-cols-3 px-[20px]">
                
                <span className="flex items-center mt-[10px] cursor-pointer" onClick={() => setToggleNedokoncano(toggleNedokoncano ? false : true)}>
                    <MdOutlinePending className="mr-1 text-yellow-600" /> Nedokončano 
                                {toggleNedokoncano ? (
                                    <IoIosArrowDown className="text-gray-700 mt-[3px]" />
                                ) : (
                                    <IoIosArrowForward className="text-gray-700 mt-[3px]" />
                                )}
                </span>
                <span className="flex items-center mt-[10px] cursor-pointer" onClick={() => setToggleVteku(toggleVteku ? false : true)}>
                    <FaRunning className="mr-1 text-blue-600" /> V teku 
                                {toggleVteku ? (
                                    <IoIosArrowDown className="text-gray-700 mt-[3px]" />
                                ) : (
                                    <IoIosArrowForward className="text-gray-700 mt-[3px]" />
                                )}
                </span>
                <span className="flex items-center mt-[10px] cursor-pointer" onClick={() => setToggleKoncano(toggleKoncano ? false : true)}>
                    <MdOutlineDoneOutline className="mr-1 text-green-600" /> Končano 
                                {toggleKoncano ? (
                                    <IoIosArrowDown className="text-gray-700 mt-[3px]" />
                                ) : (
                                    <IoIosArrowForward className="text-gray-700 mt-[3px]" />
                                )}
                </span>
            </div>
            {loading2 ? 
            <div className='w-full flex items-center justify-center h-[100px]'>
                <Loading />
            </div> : (
            <div className="grid grid-cols-3 px-[20px]">
                <div>
                {toggleNedokoncano && 
                    naloge.map((naloga, index) => (
                        naloga.stanje === 'nedokončano' && 
                        <div key={index} class="bg-white w-[80%] my-[10px] rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-lg transition-all duration-200">
                        <h3 class="text-lg font-semibold text-gray-800">{naloga.ime}</h3>
                        <p class="text-gray-600 mt-2 line-clamp-2">
                          {naloga.lastnik}
                        </p>
                        <div class="flex items-center justify-between mt-4">
                          <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-600">
                            Nedokončano
                          </span>
                          
                          <span class="text-gray-500 text-sm"><strong><FaClock className="text-indigo-600" />{naloga.rok}</strong></span>
                        </div>
                        <div class="mt-4 flex items-center justify-end space-x-2">
                          <button onClick={() => navigate(`/moje-naloge/${naloga._id}`)} class="py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            <FaInfo />                          
                          </button>
                          <button class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))    
                }
                </div>

                <div>
                {toggleVteku && 
                    naloge.map((naloga, index) => (
                        naloga.stanje === 'vteku' && 
                        <div key={index} class="bg-white w-[80%] my-[10px] rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-lg transition-all duration-200">
                        <h3 class="text-lg font-semibold text-gray-800">{naloga.ime}</h3>
                        <p class="text-gray-600 mt-2 line-clamp-2">
                          {naloga.lastnik}
                        </p>
                        <div class="flex items-center justify-between mt-4">
                          <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                            V teku
                          </span>
                          
                          <span class="text-gray-500 text-sm"><strong><FaClock className="text-indigo-600" />{naloga.rok}</strong></span>
                        </div>
                        <div class="mt-4 flex items-center justify-end space-x-2">
                          <button onClick={() => navigate(`/moje-naloge/${naloga._id}`)} class="py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            <FaInfo />                          
                          </button>
                          <button class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))    
                }
                </div>

                <div>
                {toggleKoncano && 
                    naloge.map((naloga, index) => (
                        naloga.stanje === 'končano' && 
                        <div key={index} class="bg-white w-[80%] my-[10px] rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-lg transition-all duration-200">
                            <h3 class="text-lg font-semibold text-gray-800">{naloga.ime}</h3>
                            <p class="text-gray-600 mt-2 line-clamp-2">
                                {naloga.lastnik}
                            </p>
                        <div class="flex items-center justify-between mt-4">
                          <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                            Končano
                          </span>
                          
                          <span class="text-gray-500 text-sm"><strong><FaClock className="text-indigo-600" />{naloga.rok}</strong></span>
                        </div>
                        <div class="mt-4 flex items-center justify-end space-x-2">
                          <button onClick={() => navigate(`/moje-naloge/${naloga._id}`)} class="py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                            <FaInfo />                          
                          </button>
                          <button class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:underline">
                            <FaTrash />                          
                          </button>
                        </div>
                      </div>
                    ))    
                }
                </div>
            </div>)
            }
            {modalOpen && <DodajUserjeModal isOpen={modalOpen} onClose={handleCloseModal}  prijatelji={prijatelji} izbraniPrijatelji={izbraniPrijatelji} izberiPrijatelja={izberiPrijatelja} odstraniPrijatelja={odstraniPrijatelja} dodaj_k_projektu={dodaj_k_projektu} />}
        </div>
    );
}

export default MojProjekt;
