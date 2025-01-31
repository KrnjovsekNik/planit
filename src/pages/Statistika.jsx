
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

import { pridobiSporocila } from "../api/chatApi.js";
import { pridobiUporabnike } from "../api/userApi.js";

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
  const [sporocilaMesecno, setSporocilaMesecno] = useState([]);
  const [prijateljstvaPorazdelitev, setPrijateljstvaPorazdelitev] = useState([]);
  const [nalogeRoki, setNalogeRoki] = useState({ danes: 0, taTeden: 0, naslednjiMesec: 0 });
  const [napaka, setNapaka] = useState(""); 

  useEffect(() => {
    const username = sessionStorage.getItem("username");

    if (!username) {
      setNapaka("Uporabniško ime ni na voljo. Prosimo, prijavite se.");
      return;
    }

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

    pridobiNaloge(username)
      .then((naloge) => {
        if (!naloge || naloge.length === 0) {
          console.warn("Ni podatkov o nalogah.");
          return;
        }
        console.log("Prejete naloge:", naloge);
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

      pridobiSporocila(username)
    .then((sporocila) => {
      console.log("Prejeta sporočila:", sporocila); 
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

    pridobiUporabnike()
    .then((uporabniki) => {
      console.log("Prejeti uporabniki:", uporabniki); 
      
      if (uporabniki && uporabniki.length > 0) {
        const prijateljstva = {
          "0": 0,
          "1-5": 0,
          "6-10": 0,
          "11+": 0
        };
        
        uporabniki.forEach((uporabnik) => {
          const steviloPrijateljev = uporabnik.prijatelji ? uporabnik.prijatelji.length : 0;
          if (steviloPrijateljev === 0) prijateljstva["0"]++;
          else if (steviloPrijateljev <= 5) prijateljstva["1-5"]++;
          else if (steviloPrijateljev <= 10) prijateljstva["6-10"]++;
          else prijateljstva["11+"]++;
        });
        
        setPrijateljstvaPorazdelitev(prijateljstva);
      }
    })
    .catch((err) => {
      console.error("Napaka pri pridobivanju uporabnikov:", err);
      setNapaka("Napaka pri pridobivanju podatkov o uporabnikih.");
    });

    
    pridobiNaloge(username)
  .then((naloge) => {
    if (!naloge || naloge.length === 0) {
      console.warn("Ni podatkov o nalogah za roke.");
      return;
    }
    const danes = new Date();
    const zacetekTedna = new Date(danes);
    zacetekTedna.setDate(danes.getDate() - danes.getDay()); // Start of current week
    const konecTedna = new Date(zacetekTedna);
    konecTedna.setDate(zacetekTedna.getDate() + 6); // End of current week

    const zacetekNaslednegaMeseca = new Date(danes.getFullYear(), danes.getMonth() + 1, 1);
    const konecNaslednegaMeseca = new Date(danes.getFullYear(), danes.getMonth() + 2, 0);

    const roki = { danes: 0, taTeden: 0, naslednjiMesec: 0 };
   
    naloge.forEach((naloga) => {
      const rokDatum = new Date(naloga.rok);
      if (rokDatum.toDateString() === danes.toDateString()) {
        roki.danes++;
      } else if (rokDatum >= zacetekTedna && rokDatum <= konecTedna) {
        roki.taTeden++;
      } else if (rokDatum >= zacetekNaslednegaMeseca && rokDatum <= konecNaslednegaMeseca) {
        roki.naslednjiMesec++;
      }
    });
    setNalogeRoki(roki);
  })
  .catch((err) => {
    console.error("Napaka pri pridobivanju rokov nalog:", err);
    setNapaka("Napaka pri pridobivanju rokov nalog.");
  });
  }, []);

  

  
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

  
  const friendshipChartData = {
    labels: Object.keys(prijateljstvaPorazdelitev),
    datasets: [{
      label: "Število uporabnikov",
      data: Object.values(prijateljstvaPorazdelitev),
      backgroundColor: [
        "#FF9999", "#66B2FF", "#99FF99", "#FFCC99"
      ],
    }]
  };

  
  const deadlineChartData = {
    labels: ["Danes", "Ta teden", "Naslednji mesec"],
    datasets: [{
      label: "Število nalog",
      data: [nalogeRoki.danes, nalogeRoki.taTeden, nalogeRoki.naslednjiMesec],
      backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    }]
  };

  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-700">Statistika</h2>
        {napaka && <p className="text-red-500">{napaka}</p>}
      </div>
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="grid grid-cols-3 gap-6">
          {/* Existing charts... */}
          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Število projektov po mesecih</h2>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Število nalog po stanju</h2>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Delež nalog v projektih</h2>
            <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Število sporočil po mesecih</h2>
            <Line data={messageChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Porazdelitev prijateljstev</h2>
            <Doughnut data={friendshipChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg h-[500px] flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Naloge glede na rok</h2>
            <Bar data={deadlineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistika;
