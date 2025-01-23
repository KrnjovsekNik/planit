import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { posodobiProfilnoSliko } from '../api/userApi';

export default function Profile() {
  const [name] = useState(sessionStorage.getItem('username'));
  const [email] = useState(sessionStorage.getItem('email'));
  const [profileImage, setProfileImage] = useState(sessionStorage.getItem('profile_image'));
  const [isEditing, setIsEditing] = useState(false);

  //funkcija za spreminjanje slike
  const handleImageUpload = async (event) => {
    //tukaj se odpre okno za izbiro datoteke
    const file = event.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxWidthOrHeight: 100,
        useWebWorker: true,
      };
      //tukaj kompresiramo sliko na 100x100 pikslov da jo zmanjsamo
      const compressedFile = await imageCompression(file, options);

      //tukaj formatiramo sliko, zato da jo lahko pošljemo na cloud imgbb
      const formData = new FormData();
      formData.append("image", compressedFile);
      //izvedemo klic na imgbb
      const response = await fetch("https://api.imgbb.com/1/upload?key=06f327be83ef1c4f9fc93dbb8990b68", {
        method: "POST",
        body: formData,
      });
      //imgbb nam vrne link do shranjene slike.
      const data = await response.json();
      if (data.success) {
        const uploadedImageUrl = data.data.url;

        const username = sessionStorage.getItem('username');
        //posodobimo profilno sliko na nasi bazi
        const apiResponse = await posodobiProfilnoSliko(username, uploadedImageUrl);

        if (apiResponse.success) {
          sessionStorage.setItem('profile_image', uploadedImageUrl);
          //ce to uspe se nastavimo profilno sliko v seji
          setProfileImage(uploadedImageUrl);
          alert("Image successfully uploaded and saved!");
        } else {
          alert(`Failed to save image to database: ${apiResponse.message}`);
        }
      } else {
        alert(`Failed to upload image to ImgBB: ${data.error.message}`);
      }
    } catch (error) {
      console.error("Error uploading the image: ", error);
      alert("Image upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-2xl">
        <div className="flex items-center mb-8">
          <div className="relative group">
            <img
              src={profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className={`w-28 h-28 rounded-full shadow-md cursor-pointer transition-transform duration-300 ${
                isEditing ? "group-hover:scale-110 group-hover:shadow-lg" : ""
              }`}
              onClick={() => isEditing && document.getElementById("imageUpload").click()}
            />
            {isEditing && (
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
          </div>
          <div className="ml-6 flex-grow">
            <div className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p className="text-sm font-medium text-gray-500">Uporabniško ime</p>
              <p className="text-lg font-bold text-gray-800">{name}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-gray-100 p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-500">Uporabniški e-naslov</p>
          <p className="text-lg text-gray-800">{email}</p>
        </div>

        <div className="mb-6 bg-gray-100 p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-500">Geslo</p>
          <p className="text-lg text-gray-800">******</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 transition"
          >
            {isEditing ? "Shrani" : "Spremeni"}
          </button>
        </div>
      </div>
    </div>
  );
}
