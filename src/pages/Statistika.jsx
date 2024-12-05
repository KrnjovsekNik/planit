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
        borderColor: "#FF5733", 
        backgroundColor: "rgba(255, 87, 51, 0.2)", 
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
        backgroundColor: "#FFC300", 
      },
    ],
  };
  
  const doughnutChartData = {
    labels: ["Izdelki A", "Izdelki B", "Izdelki C"],
    datasets: [
      {
        label: "Prodajni deleži",
        data: [300, 50, 100],
        backgroundColor: ["#DAF7A6", "#FF5733", "#C70039"], 
      },
    ],
  };

  

  
  const pieChartData = {
    labels: ["Storitev 1", "Storitev 2", "Storitev 3"],
    datasets: [
      {
        label: "Delež storitev",
        data: [50, 30, 20],
        backgroundColor: ["#FF5733", "#FFC300", "#DAF7A6"],
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

        <div className="row-span-2 col-span-1 bg-white p-4 rounded-lg shadow-lg h-[820px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Obisk spletne strani</h2>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Prodaja</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Prodajni deleži</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>


        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-600 text-center mb-4">Delež storitev</h2>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

      </div>
    </div>

    </div>
  );
}

export default Statistika;
