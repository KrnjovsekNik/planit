import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// dodaj projekt
export const dodajProjekt = async (projekt) => {
  const response = await axios.post(API_URL, projekt);
  return response.data;
};

// pridobi vse projekte
export const pridobiProjekte = async (username) => {
  const response = await axios.get(`${API_URL}/${username}`);
  return response.data;
};

export const pridobiProjekt = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const dodajVprojekt = async (ime, id) => {
  const response = await axios.put(`${API_URL}/dodaj/${ime}/${id}`);
  return response.data;
};
