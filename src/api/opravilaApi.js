import axios from 'axios';

const API_URL = 'http://localhost:5000/api/opravila';

// dodaj opravilo
export const dodajOpravilo = async (opravilo) => {
  const response = await axios.post(API_URL, opravilo);
  return response.data;
};

// pridobi vsa opravila
export const pridobiOpravila = async (id) => {
  const response = await axios.get(API_URL, {
    params : {
        id_naloge : id
    }
  });
  return response.data;
};

export const posodobiOpravilo = async (stanje) => {
  const response = await axios.get(`${API_URL}/${stanje}`);
  return response.data;
};

export const posodobiStanjeOpravila = async (id, stanje) => {
  const response = await axios.put(`${API_URL}/posodobi/${id}/${stanje}`);
  return response.data;
};

export const posodobiPrioritetoOpravila = async (id, prioriteta) => {
  const response = await axios.put(`${API_URL}/posodobi/prioriteta/${id}/${prioriteta}`);
  return response.data;
};

export const izbrisiOpravilo = async (id) => {
  const response = await axios.put(`${API_URL}/delete/${id}`);
  return response.data;
};


