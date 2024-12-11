import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pridobiNalogo } from "../api/nalogeApi";
import { FaArrowDown, FaCheckCircle, FaClock, FaExclamation, FaPauseCircle, FaProjectDiagram, FaRunning, FaUser } from "react-icons/fa";
import { MdOutlineDoneOutline, MdOutlinePending } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { TbBellRinging } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { izbrisiOpravilo, posodobiPrioritetoOpravila, posodobiStanjeOpravila, pridobiOpravila } from "../api/opravilaApi";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import DodajOpraviloModal from "./DodajOpraviloModal";

function MojaNaloga() {
    const [opraviloModal, setOpraviloModal] = useState(false)

    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [activeDropdownIndex2, setActiveDropdownIndex2] = useState(null);

    const { id } = useParams();
    const [naloga, setNaloga] = useState();

    const [opravila, setOpravila] = useState();

    const fetchData = async () => {
        try {
            const response = await pridobiNalogo(id);
            setNaloga(response);
        } catch (error) {
            toast.error('Napaka pri pridobivanju nalog');
        }
    };

    const fetchOpravila = async () => {
        try {
            const response = await pridobiOpravila(id)
            setOpravila(response)
        } catch (error) {
           toast.error('Napaka pri pridobivanju opravil') 
        }
    }


    const [onclickIndexStanje, setOnClickIndexStanje] = useState(null); 

    const handleToggleStanje = (index) => {
      setOnClickIndexStanje(onclickIndexStanje === index ? null : index);
    };

    const handlePrioritetaChange = async (taskIndex, newPrioriteta) => {
        try {
            const opraviloId = opravila[taskIndex]._id;
            await posodobiPrioritetoOpravila(opraviloId, newPrioriteta);
            const updatedOpravila = opravila.map((task, index) =>
              index === taskIndex ? { ...task, prioriteta: newPrioriteta } : task
            );
            setOpravila(updatedOpravila);
            setActiveDropdownIndex(null);
          } catch (error) {
            console.error("Error updating task status:", error.message);
          }
    };

    const deleteOpravilo = async (id) => {
        try {
          const response = await izbrisiOpravilo(id);
          const updatedOpravila = opravila.filter((opravilo) => opravilo._id !== id);
          setOpravila(updatedOpravila);
          toast.success(`Opravilo uspešno izbrisano.`)
        } catch (error) {
          toast.error('Napaka pri brisanju opravila.')
        }
      };


    const handleStanjeChange = async (taskIndex, newStanje) => {
        try {
          const opraviloId = opravila[taskIndex]._id;
          await posodobiStanjeOpravila(opraviloId, newStanje);
          const updatedOpravila = opravila.map((task, index) =>
            index === taskIndex ? { ...task, stanje: newStanje } : task
          );
          setOpravila(updatedOpravila);
          setActiveDropdownIndex2(null);
        } catch (error) {
          console.error("Error updating task status:", error.message);
        }
      };

    const prioritetaDropdown = (taskIndex) => {
        const prioritete = ["nujno", "pomembno", "srednjepomembno", "nepomembno"];
        const besede = ["Nujno", "Pomembno", "Srednje pomembno", "Nepomembno"];
        const ikone = [
            <FaExclamation className="mr-1 text-red-600" />,
            <TbBellRinging className="mr-1 text-yellow-800" />,
            <FaPauseCircle className="mr-1 text-blue-600" />,
            <FaArrowDown className="mr-1 text-gray-400" />,
        ];
        const currentPrioriteta = opravila[taskIndex].prioriteta;
        const filteredPrioritete = prioritete.filter((prioriteta) => prioriteta !== currentPrioriteta);
        const filteredBesede = besede.filter((_, index) => prioritete[index] !== currentPrioriteta);
        const filteredIkone = ikone.filter((_, index) => prioritete[index] !== currentPrioriteta);

        return (
            <ul className="absolute top-[43px] left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg z-10">
            {filteredPrioritete.map((prioriteta, index) => (
                <li
                    key={prioriteta}
                    onClick={() => handlePrioritetaChange(taskIndex, prioriteta)} //tukaj bos pozneje posodobil prioriteto
                    className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                >
                    {filteredIkone[index]} {filteredBesede[index]}
                </li>
            ))}
        </ul>
        );
    };
    const stanjeDropdown = (taskIndex) => {
        const stanja = ["končano", "vteku", "nedokončano"];
        const besede = ["Končano", "V teku", "Nedokončano"];
        const ikone = [
            <MdOutlineDoneOutline className="mr-1 text-green-700" />,
            <FaRunning className="mr-1 text-blue-600" />,
            <MdOutlinePending className="mr-1 text-yellow-700" />,
        ];
        const currentStanje = opravila[taskIndex].stanje;
        const filteredStanja = stanja.filter((stanje) => stanje !== currentStanje);
        const filteredBesede = besede.filter((_, index) => stanja[index] !== currentStanje);
        const filteredIkone = ikone.filter((_, index) => stanja[index] !== currentStanje);

        return (
            <ul className="absolute top-[43px] left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg z-10">
            {filteredStanja.map((stanje, index) => (
                <li
                    key={stanje}
                    onClick={() => handleStanjeChange(taskIndex, stanje)} //tukaj bos pozneje posodobil stanje
                    className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                >
                    {filteredIkone[index]} {filteredBesede[index]}
                </li>
            ))}
        </ul>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchOpravila();
    }, [opraviloModal])

    const getRandomColor = (index) => {
        const colors = ["bg-red-500", "bg-gray-500", "bg-blue-500", "bg-green-500", 'bg-pink-600', 'bg-violet-600'];
        return colors[index % colors.length];
    };

    return (
        <div>
            {/* drugi del */}
            <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Moje naloge {naloga ? ('>>' + naloga.ime) : '...'}</h2>
            </div>

            {/*PODATKI O NALOGI */}

            <div className="w-full mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                {naloga ? (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Podrobnosti o nalogi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <FaCheckCircle className="text-green-600 text-2xl" />
                                <span>
                                    <strong>Stanje:</strong>{" "}
                                    <span
                                        className={`${
                                            naloga.stanje === "končano"
                                                ? "text-green-600"
                                                : naloga.stanje === "vteku"
                                                ? "text-blue-600"
                                                : "text-yellow-600"
                                        } font-semibold`}
                                    >
                                        {naloga.stanje === "končano"
                                            ? "Končano"
                                            : naloga.stanje === "vteku"
                                            ? "V teku"
                                            : "Nedokončano"}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaClock className="text-indigo-600 text-2xl" />
                                <span>
                                    <strong>Rok:</strong> {naloga.rok}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaProjectDiagram className="text-purple-600 text-2xl" />
                                <span>
                                    <strong>Projekt:</strong> {naloga.ime_projekta}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaUser className="text-pink-600 text-2xl" />
                                <span>
                                    <strong>Lastnik:</strong> {naloga.lastnik}
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-4">
                            <strong>Opis:</strong> {naloga.opis}
                        </p>
                        <div className='w-[100%] flex justify-end px-[5px] py-[1px]'>
                            <button onClick={() => setOpraviloModal(true)} className="flex items-center space-x-2 px-4 bg-white border border-gray-500 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm">
                                <FiPlus className="text-lg" />
                                <span>Novo opravilo</span>
                            </button>
                        </div>
                    </div>
                    
                ) : (
                    <div className="text-gray-500 text-center py-6">Nalagam podatke o nalogi...</div>
                )}
            </div>


        

            {/* prvi del */}
            <div onClick={() => {setActiveDropdownIndex(null); setActiveDropdownIndex2(null)}} className="grid grid-cols-5 bg-gray-200 px-6 py-4 text-left text-sm font-medium text-gray-600 border-b border-gray-300">
                <div className="w-[50px]">OPRAVILA</div>
                <div>Opis</div>
                <div className="flex items-center justify-center">Stanje</div>
                <div className="flex items-center justify-center">Prioriteta</div>
                <div className="px-4">Izbriši</div>
            </div>
            <ul>
                { opravila ?  opravila.map((opravilo, index) => (
                    <li
                        key={index}
                        className={`grid cursor-pointer grid-cols-5 text-sm items-center border border-gray-300 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition shadow-sm`}
                    >
                        <div className="flex items-center space-x-3 px-4 py-2 w-[50px]">
                            <span
                                className={`w-8 h-8 flex-shrink-0 rounded-full ${getRandomColor(index)} flex items-center justify-center text-white font-bold`}
                            >
                                {index + 1}
                            </span>
                        </div>
                        <div className="px-4 py-2">
                            <p>{opravilo.opis}</p>
                        </div>


                        <div
                            onClick={() =>
                                setActiveDropdownIndex2(activeDropdownIndex2 === index ? null : index)
                            }
                            className="px-4 py-2 h-full flex items-center justify-center relative hover:border hover:border-gray-400"
                        >
                            <p>
                                {opravilo.stanje === "končano" ? (
                                    <span className="inline-flex items-center">
                                    <MdOutlineDoneOutline className="mr-1 text-green-700" /> Končano
                                    </span>
                                ) : opravilo.stanje === "vteku" ? (
                                    <span className="inline-flex items-center">
                                        <FaRunning className="mr-1 text-blue-600" /> V teku
                                    </span>
                                ) :
                                    <span className="inline-flex items-center">
                                        <MdOutlinePending className="mr-1 text-yellow-700" /> Nedokončano
                                    </span>
                                }
                            </p>
                            <span>
                                {activeDropdownIndex2 === index ? (
                                    <IoIosArrowDown className="text-gray-500" />
                                ) : (
                                    <IoIosArrowForward className="text-gray-500" />
                                )}
                            </span>
                            {activeDropdownIndex2 === index && stanjeDropdown(index)}
                        </div>


                        <div
                            onClick={() =>
                                setActiveDropdownIndex(activeDropdownIndex === index ? null : index)
                            }
                            className="px-4 py-2 h-full flex items-center justify-center relative hover:border hover:border-gray-400"
                        >
                            <p>
                                {opravilo.prioriteta === "nujno" ? (
                                    <span className="inline-flex items-center">
                                        <FaExclamation className="mr-1 text-red-600" /> Nujno
                                    </span>
                                ) : opravilo.prioriteta === "pomembno" ? (
                                    <span className="inline-flex items-center">
                                        <TbBellRinging className="mr-1 text-yellow-800" /> Pomembno
                                    </span>
                                ) : opravilo.prioriteta === "srednjepomembno" ? (
                                    <span className="inline-flex items-center">
                                        <FaPauseCircle className="mr-1 text-blue-600" /> Srednje pomembno
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center">
                                        <FaArrowDown className="mr-1 text-gray-400" /> Nepomembno
                                    </span>
                                )}
                            </p>
                            <span>
                                {activeDropdownIndex === index ? (
                                    <IoIosArrowDown className="text-gray-500" />
                                ) : (
                                    <IoIosArrowForward className="text-gray-500" />
                                )}
                            </span>
                            {activeDropdownIndex === index && prioritetaDropdown(index)}
                        </div>
                        <div onClick={() => deleteOpravilo(opravilo._id)} className="px-4 hover:text-red-500 hover:font-bold cursor-pointer">
                            <FaRegTrashAlt />
                        </div>
                    </li>
                )) : 'nalaganje opravil ...'}
                <div className="h-[200px] w-full" onClick={() => {setActiveDropdownIndex(null); setActiveDropdownIndex2(null)}}>

                </div>
            </ul>
            {opraviloModal && <DodajOpraviloModal isOpen={opraviloModal} setOpen={setOpraviloModal} id_naloge={id} />}
        </div>
    );
}

export default MojaNaloga;
