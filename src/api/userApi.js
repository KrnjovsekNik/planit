import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Dodaj projekt
export const dodajUserja = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  return response.data;
};

// Pridobi uporabnika
export const pridobiUserja = async (username) => {
  //console.log(username);
  const params = {username: username};
  const response = await axios.post(API_URL + "/getuser", params);
  //console.log(response.data);
  return response.data;
};

export const pridobiPrijavo = async (user) => {
  try{
    const response = await axios.post(API_URL + "/login", user);
    console.log(user.password);
    if(response.data.success){
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('_id', response.data._id);
      return {success: true, message: "Uspesno prijavljeni"};
    }else{
      return {success: false, message: response.data.message};
    }
  }catch (err) {
    console.error("Error:", err);
    return { success: false, message: "Napaka pri prijavi." };
  }
};


export const dodajPrijatelja = async (username, friend) => {
  try {
    const response = await axios.post('http://localhost:5000/api/addFriend', {
      username,
      friend,
    });

    return {
      success: true,
      message: response.data?.message || "Prijatelj uspešno dodan.",
      data: response.data,
    };
  } catch (error) {
    console.error("Napaka pri dodajanju prijatelja:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Napaka pri dodajanju prijatelja.",
      error: error.response?.data || error.message, 
    };
  }
};

export const posodobiProfilnoSliko = async (username, image) => {
  try {
    const response = await axios.post(API_URL + "/setprofileimage", {
      username,
      image,
    });

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || "Profilna slika uspešno posodobljena.",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Napaka pri posodabljanju profilne slike.",
      };
    }
  } catch (error) {
    console.error("Napaka pri posodabljanju profilne slike:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Napaka pri posodabljanju profilne slike.",
    };
  }
};

// Pridobi profilno sliko
export const pridobiProfilnoSliko = async (username) => {
  try {
    const response = await axios.post(API_URL + "/getprofileimage", {
      username,
    });

    if (response.data.success) {
      // Shrani profilno sliko v sessionStorage
      sessionStorage.setItem('profile_image', response.data.image);
      return {
        success: true,
        image: response.data.image,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Profilna slika ni najdena.",
      };
    }
  } catch (error) {
    console.error("Napaka pri pridobivanju profilne slike:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Napaka pri pridobivanju profilne slike.",
    };
  }
};

