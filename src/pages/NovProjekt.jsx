import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NovProjekt() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Projekt "${projectName}" je bil ustvarjen!`);
    setProjectName("");
    setDescription("");
    navigate("/moji-projekti"); // Vrne uporabnika nazaj na stran s projekti.
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Ustvari nov projekt</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ime projekta</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={styles.input}
              placeholder="Vnesite ime projekta"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Opis</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              placeholder="Dodajte kratek opis"
              rows="5"
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Ustvari projekt
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default NovProjekt;
