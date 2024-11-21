import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

function Statistika() {
  const lineChartData = {
    labels: ["Januar", "Februar", "Marec", "April", "Maj", "Junij"],
    datasets: [
      {
        label: "Obisk spletne strani",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#007BFF",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
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
        backgroundColor: "#28A745",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Izdelki A", "Izdelki B", "Izdelki C"],
    datasets: [
      {
        label: "Prodajni deleži",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Statistika</h1>
      <div style={styles.grid}>
        {/* Linijski graf */}
        <div style={styles.chartContainer}>
          <h2 style={styles.chartTitle}>Opravljene naloge po mescih</h2>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/* Stolpični graf */}
        <div style={styles.chartContainer}>
          <h2 style={styles.chartTitle}>Opravljene naloge po dnevih</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/* Krožni graf */}
        <div style={styles.chartContainer}>
          <h2 style={styles.chartTitle}>Delež nalog v projektu</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  chartContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "400px", // Za ohranjanje razmerja grafov
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Statistika;
