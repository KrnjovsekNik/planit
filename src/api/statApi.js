import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Pridobi vse projekte trenutnega uporabnika
export const pridobiProjekte = async (username) => {
  const response = await axios.get(`${API_URL}/projects`, {
    params: { uporabnik: username },
  });
  return response.data;
};

// Pridobi vse naloge trenutnega uporabnika
export const pridobiNaloge = async (username) => {
  const response = await axios.get(`${API_URL}/nalogas`, {
    params: { uporabnik: username },
  });
  return response.data;
};

// Pridobi naloge za določen projekt
export const pridobiProjektneNaloge = async (projektId) => {
  const response = await axios.get(`${API_URL}/nalogas/${projektId}`);
  return response.data;
};
