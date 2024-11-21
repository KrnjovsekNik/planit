import React from "react";
import { useNavigate } from "react-router-dom";

function MojiProjekti() {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/new-project");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Moji Projekti</h1>
      </header>
      <main style={styles.main}>
        <ul style={styles.projectList}>
          <li style={styles.projectItem}>Projekt 1</li>
          <li style={styles.projectItem}>Projekt 2</li>
          <li style={styles.projectItem}>Projekt 3</li>
        </ul>
      </main>
      <button onClick={handleNewProject} style={styles.floatingButton}>
        +
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
  projectList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
    maxWidth: "600px",
  },
  projectItem: {
    backgroundColor: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "18px",
    color: "#333",
    transition: "transform 0.2s",
  },
  projectItemHover: {
    transform: "scale(1.02)",
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "24px",
    border: "none",
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s",
  },
};

export default MojiProjekti;
