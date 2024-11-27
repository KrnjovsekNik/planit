import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// Dodaj projekt
export const dodajProjekt = async (projekt) => {
  const response = await axios.post(API_URL, projekt);
  return response.data;
};

// Pridobi vse projekte
export const pridobiProjekte = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
