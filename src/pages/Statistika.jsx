import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
import { pridobiProjekte, pridobiProjekt } from "../api/projectApi.js";
import {
  pridobiNaloge,
  pridobiProjektneNaloge,
} from "../api/nalogeApi.js";

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

function Statistika() {
  const [projektiMesecno, setProjektiMesecno] = useState([]);
  const [nalogeStanja, setNalogeStanja] = useState({ vToku: 0, dokončano: 0 });
  const [projektiDelezi, setProjektiDelezi] = useState([]);
  const [napaka, setNapaka] = useState(""); // Shrani napake

  useEffect(() => {
    const username = sessionStorage.getItem("username");

    if (!username) {
      setNapaka("Uporabniško ime ni na voljo. Prosimo, prijavite se.");
      return;
    }

    // Število projektov po mesecih
    pridobiProjekte(username)
      .then((projekti) => {
        if (!projekti || projekti.length === 0) {
          console.warn("Ni podatkov o projektih.");
          return;
        }
        console.log("Prejeti projekti:", projekti);
        const mesecniProjekti = Array(12).fill(0);
        projekti.forEach((projekt) => {
          const rok = new Date(projekt.rok);
          mesecniProjekti[rok.getMonth()]++;
        });
        setProjektiMesecno(mesecniProjekti);
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju projektov:", err);
        setNapaka("Napaka pri pridobivanju projektov.");
      });

    // Število nalog po stanju
    pridobiNaloge(username)
      .then((naloge) => {
        if (!naloge || naloge.length === 0) {
          console.warn("Ni podatkov o nalogah.");
          return;
        }
        console.log("Prejete naloge:", naloge);
        const stanje = { vToku: 0, dokončano: 0 };
        naloge.forEach((naloga) => {
          if (naloga.stanje === "v teku") stanje.vToku++;
          else if (naloga.stanje === "končano") stanje.dokončano++;
        });
        setNalogeStanja(stanje);
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju nalog:", err);
        setNapaka("Napaka pri pridobivanju nalog.");
      });

    // Deleži nalog v projektih
    pridobiProjekte(username)
      .then((projekti) => {
        if (!projekti || projekti.length === 0) {
          console.warn("Ni podatkov o projektih za izračun deležev.");
          return;
        }
        console.log("Projekti za deleže:", projekti);
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
          console.log("Deleži nalog v projektih:", projektDelezData);
          setProjektiDelezi(projektDelezData);
        });
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju projektov za deleže:", err);
        setNapaka("Napaka pri pridobivanju deležev projektov.");
      });
  }, []);

  // Podatki za graf: Število projektov po mesecih
  const lineChartData = {
    labels: [
      "Januar",
      "Februar",
      "Marec",
      "April",
      "Maj",
      "Junij",
      "Julij",
      "Avgust",
      "September",
      "Oktober",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Število projektov",
        data: projektiMesecno,
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Podatki za graf: Število nalog po stanju
  const barChartData = {
    labels: ["V teku", "Dokončano"],
    datasets: [
      {
        label: "Število nalog",
        data: [nalogeStanja.vToku, nalogeStanja.dokončano],
        backgroundColor: ["#FFC300", "#28A745"],
      },
    ],
  };

  // Podatki za graf: Deleži nalog v projektih
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

  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-700">Statistika</h2>
        {napaka && <p className="text-red-500">{napaka}</p>}
      </div>
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="grid grid-cols-3 gap-6">
          {/* Linijski graf */}
          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Število projektov po mesecih</h2>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          {/* Stolpični graf */}
          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Število nalog po stanju</h2>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          {/* Tortni graf */}
          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Delež nalog v projektih</h2>
            <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistika;
