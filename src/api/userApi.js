import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Dodaj projekt
export const dodajUserja = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Pridobi vse projekte
export const pridobiUserja = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
