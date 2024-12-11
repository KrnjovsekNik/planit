import axios from 'axios';

const API_URL = 'http://localhost:5000/api/groupchats';

// dodaj projekt

export const dodajGroupChat = async (novGroupChat) => {
  const response = await axios.post(API_URL, novGroupChat);
  return response.data;
};


// pridobi vse projekte
export const pridobiGroupChat = async (id_projekta) => {
  const response = await axios.get(API_URL, {
    params : {
        id_skupina : id_projekta
    }
  });
  return response.data;
};



