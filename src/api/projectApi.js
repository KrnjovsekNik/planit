import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// dodaj projekt
export const dodajProjekt = async (projekt) => {
  const response = await axios.post(API_URL, projekt);
  return response.data;
};

// pridobi vse projekte po imenu
export const pridobiProjekte = async (username) => {
  const response = await axios.get(`${API_URL}/${username}`);
  return response.data;
};

// pridobi 
export const pridobiProjekt = async (id) => {
  const response = await axios.get(`${API_URL}/dobi/${id}`);
  return response.data;
};

export const dodajVprojekt = async (ime, id) => {
  const response = await axios.put(`${API_URL}/dodaj/${ime}/${id}`);
  return response.data;
};

export const pridobiProjektIdPoImenu = async (ime) => {
  try {
    const response = await axios.get(`${API_URL}/dobiIdPoImenu/${ime}`);
    return response.data;
  } catch (error) {
    console.error("Napaka pri pridobivanju ID-ja projekta", error);
    throw error;
  }
};
