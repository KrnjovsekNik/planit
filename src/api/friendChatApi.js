import axios from 'axios';

const API_URL = 'http://localhost:5000/api/friendchats';

// dodaj projekt

export const dodajFriendChat = async (novFriendChat) => {
  const response = await axios.post(API_URL, novFriendChat);
  return response.data;
};


// pridobi vse projekte
export const pridobiFriendChat = async (name1, name2) => {
  const response = await axios.get(API_URL, {
    params : {
        udelezenca : [name1, name2]
    }
  });
  return response.data;
};



