import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { pridobiProjekte } from "../api/projectApi.js";
import { pridobiProjektneNaloge } from "../api/nalogeApi.js";
import Naloge from "./MojeNaloge";
import Projekti from "./MojiProjekti";
import Koledar from "./Koledar";

function Homepage() {
  const navigate = useNavigate();
  const [projektiDelezi, setProjektiDelezi] = useState([]);
  const [napaka, setNapaka] = useState("");

  useEffect(() => {
    pridobiProjekte(sessionStorage.getItem("username"))
      .then((projekti) => {
        if (!projekti || projekti.length === 0) {
          console.warn("Ni podatkov o projektih.");
          return;
        }

        const projektNalogePromises = projekti.map((projekt) =>
          pridobiProjektneNaloge(projekt._id)
            .then((naloge) => ({
              projektIme: projekt.ime,
              naloge: naloge.length,
            }))
            .catch((err) => {
              console.error(`Napaka pri nalogah projekta ${projekt.ime}:`, err);
              return { projektIme: projekt.ime, naloge: 0 };
            })
        );

        Promise.all(projektNalogePromises).then((projektDelezData) => {
          setProjektiDelezi(projektDelezData);
        });
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju projektov za deleže:", err);
        setNapaka("Napaka pri pridobivanju deležev projektov.");
      });
  }, []);

  const doughnutChartData = {
    labels: projektiDelezi.map((projekt) => projekt.projektIme),
    datasets: [
      {
        label: "Deleži nalog",
        data: projektiDelezi.map((projekt) => projekt.naloge),
        backgroundColor: ["#DAF7A6", "#FF5733", "#C70039", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const goToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="homepage-container p-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        {/* Statistika */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-full relative">
          <h3 className="text-xl font-semibold mb-4">Statistika</h3>
          <div className="h-[300px] flex items-center justify-center">
            {projektiDelezi.length > 0 ? (
              <Doughnut 
                data={doughnutChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  layout: {
                    padding: 20
                  }
                }} 
              />
            ) : (
              <p className="text-gray-500">Ni podatkov za statistiko</p>
            )}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
            onClick={() => goToPage("statistika")}
          >
            Več
          </button>
        </div>

        {/* Seznam nalog */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Seznam nalog</h3>
          <div 
            className="max-h-[300px] overflow-y-auto pr-2"
            style={{ 
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: '#888 #f1f1f1'
            }}
          >
            <Naloge />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
            onClick={() => goToPage("naloge")}
          >
            Več
          </button>
        </div>

        {/* Seznam projektov */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Seznam projektov</h3>
          <div 
            className="max-h-[300px] overflow-y-auto pr-2"
            style={{ 
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: '#888 #f1f1f1'
            }}
          >
            <Projekti />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
            onClick={() => goToPage("projekti")}
          >
            Več
          </button>
        </div>

        {/* Koledar */}
        {/*
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Koledar</h3>
          <div 
            className="max-h-[300px] overflow-y-auto pr-2"
            style={{ 
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: '#888 #f1f1f1'
            }}
          >
            <Koledar />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
            onClick={() => goToPage("koledar")}
          >
            Več
          </button>
        </div>*/}
      </div>

      {napaka && <div className="text-red-500 mt-4">{napaka}</div>}
    </div>
  );
}

export default Homepage;