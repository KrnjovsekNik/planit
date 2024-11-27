import React from "react";
import { Line, Bar, Doughnut, Radar, PolarArea, Pie, Bubble, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

function Statistika() {
  const lineChartData = {
    labels: ["Januar", "Februar", "Marec", "April", "Maj", "Junij"],
    datasets: [
      {
        label: "Obisk spletne strani",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#FF5733", // Živo oranžna
        backgroundColor: "rgba(255, 87, 51, 0.2)", // Prosojna oranžna
        tension: 0.4,
      },
    ],
  };
  
  const barChartData = {
    labels: ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
    datasets: [
      {
        label: "Prodaja",
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: "#FFC300", // Živo rumena
      },
    ],
  };
  
  const doughnutChartData = {
    labels: ["Izdelki A", "Izdelki B", "Izdelki C"],
    datasets: [
      {
        label: "Prodajni deleži",
        data: [300, 50, 100],
        backgroundColor: ["#DAF7A6", "#FF5733", "#C70039"], // Živo zelena, oranžna, rdeča
      },
    ],
  };
  
  const radarChartData = {
    labels: ["Kakovost", "Cena", "Dostopnost", "Podpora", "Funkcije"],
    datasets: [
      {
        label: "Ocene",
        data: [4, 3, 5, 4, 4],
        backgroundColor: "rgba(0, 123, 255, 0.5)", // Svetlo modra
        borderColor: "#007BFF", // Živo modra
        borderWidth: 1,
      },
    ],
  };
  
  const polarAreaChartData = {
    labels: ["Se ni zacelo", "V teku", "Koncano"],
    datasets: [
      {
        label: "Stanje",
        data: [200, 150, 100],
        backgroundColor: ["#FF5733", "#C70039", "#900C3F"], // Rdeči odtenki
      },
    ],
  };
  
  const pieChartData = {
    labels: ["Storitev 1", "Storitev 2", "Storitev 3"],
    datasets: [
      {
        label: "Delež storitev",
        data: [50, 30, 20],
        backgroundColor: ["#FF5733", "#FFC300", "#DAF7A6"], // Žive barve
      },
    ],
  };
  
  const bubbleChartData = {
    datasets: [
      {
        label: "Uporabniki",
        data: [{ x: 10, y: 20, r: 15 }, { x: 15, y: 10, r: 10 }, { x: 20, y: 30, r: 20 }],
        backgroundColor: "#FFC300", // Živo rumena
      },
    ],
  };
  
  const scatterChartData = {
    datasets: [
      {
        label: "Različni podatki",
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 15, y: -5 },
        ],
        backgroundColor: "#C70039", // Živo rdeča
      },
    ],
  }; 

  
  return (
    <div>
      <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10">
          <h2 className='text-lg font-semibold text-gray-700'>Statistika</h2>
      </div>
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="grid grid-cols-3 gap-6">
        {/* Levi graf čez dve vrstici */}
        <div className="row-span-2 col-span-1 bg-white p-4 rounded-lg shadow-lg h-[820px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Obisk spletne strani</h2>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/* Desni grafi (prva vrstica) */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Prodaja</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Prodajni deleži</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/* Desni grafi (druga vrstica) */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Ocene izdelkov</h2>
          <Radar data={radarChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Stanje nalog</h2>
          <PolarArea data={polarAreaChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/* Zadnji grafi */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Delež storitev</h2>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Uporabniki</h2>
          <Bubble data={bubbleChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Različni podatki</h2>
          <Scatter data={scatterChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>

    </div>
  );
}

export default Statistika;
