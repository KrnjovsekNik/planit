import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { pridobiProjekte } from "../api/projectApi.js";
import { pridobiProjektneNaloge, pridobiNaloge } from "../api/nalogeApi.js";
import { pridobiSporocila } from "../api/chatApi.js";
import Naloge from "./MojeNaloge";
import Projekti from "./MojiProjekti";
import MyCalendar from "./Koledar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


console.log(sessionStorage.getItem("email"));
function Homepage() {
  const navigate = useNavigate();
  const [projektiDelezi, setProjektiDelezi] = useState([]);
  const [sporocilaMesecno, setSporocilaMesecno] = useState([]);
  const [nalogeStanja, setNalogeStanja] = useState({ vToku: 0, dokončano: 0 });
  const [napaka, setNapaka] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");

    // Fetch projects data
    pridobiProjekte(username)
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

    pridobiSporocila(username)
      .then((sporocila) => {
        const mesecnaSporocila = Array(12).fill(0);
        if (sporocila && sporocila.length > 0) {
          sporocila.forEach((sporocilo) => {
            const datum = new Date(sporocilo.createdAt);
            mesecnaSporocila[datum.getMonth()]++;
          });
        }
        setSporocilaMesecno(mesecnaSporocila);
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju sporočil:", err);
        setNapaka("Napaka pri pridobivanju sporočil.");
      });
          
    pridobiNaloge(username)
      .then((naloge) => {
        if (!naloge || naloge.length === 0) {
          console.warn("Ni podatkov o nalogah.");
          return;
        }
        const stanje = { vToku: 0, dokončano: 0 };
        naloge.forEach((naloga) => {
          if (naloga.stanje === "vteku") stanje.vToku++;
          else if (naloga.stanje === "končano") stanje.dokončano++;
        });
        setNalogeStanja(stanje);
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju nalog:", err);
        setNapaka("Napaka pri pridobivanju nalog.");
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

  const messageChartData = {
    labels: [
      "Januar", "Februar", "Marec", "April", "Maj", "Junij",
      "Julij", "Avgust", "September", "Oktober", "November", "December"
    ],
    datasets: [{
      label: "Število sporočil",
      data: sporocilaMesecno,
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      tension: 0.4,
    }]
  };

  const taskStatusChartData = {
    labels: ["V teku", "Dokončano"],
    datasets: [
      {
        label: "Število nalog",
        data: [nalogeStanja.vToku, nalogeStanja.dokončano],
        backgroundColor: ["#FFC300", "#28A745"],
      },
    ],
  };

  const goToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="homepage-container p-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Top row with existing charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Statistika</h3>
            <div className="h-[300px] flex items-center justify-center">
              {projektiDelezi.length > 0 ? (
                <Doughnut
                  data={doughnutChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: 20,
                    },
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

          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Seznam projektov</h3>
            <div
              className="max-h-[300px] overflow-y-auto pr-2"
              style={{
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
                scrollbarColor: "#888 #f1f1f1",
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
        </div>

        {/* Middle section with tasks */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Seznam nalog</h3>
          <div
            className="max-h-[500px] overflow-y-auto pr-2"
            style={{
              overscrollBehavior: "contain",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1",
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

        {/* Calendar section with adjusted height and new button */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Koledar</h3>
          <div className="h-[600px] overflow-hidden">
            <div className="w-full h-full">
              <MyCalendar />
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
            onClick={() => goToPage("koledar")}
          >
            Več
          </button>
        </div>

        {/* Bottom row with new charts and buttons */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Število sporočil po mesecih</h3>
            <div className="h-[300px]">
              <Line
                data={messageChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
              onClick={() => goToPage("statistika")}
            >
              Več
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Število nalog po stanju</h3>
            <div className="h-[300px]">
              <Bar
                data={taskStatusChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-full absolute bottom-4 right-4"
              onClick={() => goToPage("statistika")}
            >
              Več
            </button>
          </div>
        </div>
      </div>

      {napaka && <div className="text-red-500 mt-4">{napaka}</div>}
    </div>
  );
}

export default Homepage;