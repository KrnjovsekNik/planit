import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Dodaj projekt
export const dodajUserja = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  return response.data;
};

// Pridobi vse projekte
export const pridobiUserja = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  return response.data;
};
