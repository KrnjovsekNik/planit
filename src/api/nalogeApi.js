import axios from 'axios';

const API_URL = 'http://localhost:5000/api/naloge';

// dodaj nalogo
export const dodajNalogo = async (naloga) => {
  const response = await axios.post(API_URL, naloga);
  return response.data;
};

// pridobi vse naloge
export const pridobiNaloge = async (lastnik) => {
  const response = await axios.get(API_URL, {
    params : {
        lastnik
    }
  });
  return response.data;
};

export const pridobiNalogo = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const pridobiProjektneNaloge = async (id) => {
  const response = await axios.get(`${API_URL}/projekt/${id}`)
  return response.data;
};

export const posodobiStanjeNaloge = async (_id) => {
  const response = await axios.put(`${API_URL}/stanje/${_id}`)
  return response.data;
};


