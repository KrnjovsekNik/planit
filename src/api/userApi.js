import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Dodaj projekt
export const dodajUserja = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Pridobi vse projekte
export const pridobiUserja = async (name) => {
  const response = await axios.get(API_URL, {
    params : {
      name
    }
  });
  console.log(response.data)
  return response.data;
};


export const dodajPrijatelja = async (username, friend) => {
  try {
    const response = await axios.post('http://localhost:5000/api/addFriend', {
      username,
      friend,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Napaka pri dodajanju prijatelja."
    );
  }
};